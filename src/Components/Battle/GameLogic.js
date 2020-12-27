import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import {
	firstTick,
	determineCommands,
	addNewBattleLogs,
	commandsDetermined,
	nextExecution,
	executionInProgress,
	executionComplete,
	executionsComplete,
	endOfCleanUp,
	nextTick,
	awaitUserInput
} from '../../Redux/actions';

import resolveDeterminingCommands from '../../Constants/scriptHelpers/resolveDeterminingCommands';
import getNextCommand from '../../Constants/scriptHelpers/getNextCommand';
import { areSameCommand } from '../../Constants/helperFunctions';

const GameLogic = () => {
	const settings = useSelector((state) => state.settings);
	const battleInfo = useSelector((state) => state.battleInfo);
	const dispatch = useDispatch();

	useEffect(()=>{
		if (battleInfo.status === 'EXECUTION_IN_PROGRESS' || battleInfo.status === 'AWAITING_USER_INPUT') {
			return
		} else if (battleInfo.status === 'EXECUTE_NEXT_COMMAND') {
			dispatch(executionInProgress());
			const reverifyCommandToExecute = getNextCommand(battleInfo.objectsToRender, battleInfo.commandsToExecute[0].botIndex, battleInfo.levelInfo);
			const isSameCommand = areSameCommand(battleInfo.commandsToExecute[0].command, reverifyCommandToExecute.command);
			// console.log({isSameCommand});
			if (!isSameCommand) {
				dispatch(addNewBattleLogs([{type: 'invalid', content: `${battleInfo.objectsToRender[battleInfo.commandsToExecute[0].botIndex].name}`}]));
				dispatch(executionComplete());
			} else {
				// TODO: Execution of Command, test records
				dispatch(addNewBattleLogs([{type: 'new-initiative', content: `- INITIATIVE: ${battleInfo.objectsToRender[battleInfo.commandsToExecute[0].botIndex].name} -`}]));
				dispatch(executionComplete());
			}
		} else if (battleInfo.status === 'EXECUTING_COMMANDS' || battleInfo.status === 'EXECUTE_NEXT_COMMAND') {
			if (battleInfo.commandsToExecute.length === 0) {
				dispatch(executionsComplete())
			} else {
				dispatch(nextExecution())
			}
		} else if (battleInfo.status === 'EXECUTION_COMPLETE') {
			if (battleInfo.commandsToExecute.length === 0) {
				dispatch(executionsComplete())
			} else {
				dispatch(nextExecution())
			}
		} else if (battleInfo.status === 'NEW_TICK') {
			dispatch(determineCommands());
		} else if (battleInfo.status === 'DETERMINING_COMMANDS') {
			const commandResults = resolveDeterminingCommands(battleInfo);
			dispatch(commandsDetermined(commandResults.commandsToExecute, commandResults.battleLogEntriesToAdd));
		} else if (battleInfo.status === 'CLEAN_UP') {
			// TODO: Test records, cycle tie breaks, add new scan info, regen attributes / burn / acid
			// more record testing, cycling tie breaks, adding scan info, regenerating stats etc


			// let newRecords = recordUpdater(battleInfo, null, null); //jfbdifdkn



			dispatch(endOfCleanUp());
		} else if (battleInfo.status === 'TICK_COMPLETE') {
			battleInfo.battleHasOutcome ? dispatch(awaitUserInput()) :
			settings.autoTick ? dispatch(nextTick()) : dispatch(awaitUserInput());
		} else if (battleInfo.status === 'FIRST_TICK') {
			// first tick needs to recalculate records and provide 1 cell scan results
			dispatch(firstTick());
		} else {
			console.log(`unknown battleInfo status: ${battleInfo.status}`);
		}
	},[battleInfo.status])

	return null
}

export default GameLogic;