import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import {
	firstTick,
	determineCommands,
	addNewBattleLogs,
	commandsDetermined,
	nextTick,
	awaitUserInput
} from '../../Redux/actions';

import commandDetails from '../../Constants/commandDetails';
import getNextCommand from '../../Constants/scriptHelpers/getNextCommand';


const GameLogic = () => {
	const settings = useSelector((state) => state.settings);
	const battleInfo = useSelector((state) => state.battleInfo);
	const dispatch = useDispatch();

	useEffect(()=>{
		if (battleInfo.status === 'NEW_TICK') {
			dispatch(determineCommands());
		} else if (battleInfo.status === 'DETERMINING_COMMANDS') {
			let battleLogEntriesToAdd = [];
			let commandsToExecute = [];
			console.log('time to find commands');
			battleInfo.objectsToRender.forEach((bot, index)=>{
				const nextCommandResults = getNextCommand(battleInfo.objectsToRender, index, battleInfo.levelInfo);
				// console.log({nextCommandResults});
				let initiative =
				(100000 * (50-commandDetails[nextCommandResults.command.name].speed)) +
				(1000 * (bot.attributes.Initiative)) +
				battleInfo.rotatingTieBreak.findIndex((value) => value === index)
				;
				let newCommand = {
					botIndex: index,
					command: nextCommandResults.command,
					// commandSpeed: commandDetails[nextCommandResults.command.name].speed,
					// botInitiative: bot.attributes.Initiative,
					// tieBreaker: battleInfo.rotatingTieBreak.findIndex((value) => value === index),
					initiative: initiative
				}
				battleLogEntriesToAdd = [...battleLogEntriesToAdd, ...nextCommandResults.battleLogEntries];
				commandsToExecute.push(newCommand);
			})
			// dispatch(addNewBattleLogs(battleLogEntriesToAdd));
			commandsToExecute.sort(function(a, b){return b.initiative - a.initiative});
			// console.log({commandsToExecute});
			dispatch(commandsDetermined(commandsToExecute, battleLogEntriesToAdd))
		}else if (battleInfo.status === 'FIRST_TICK') {
			dispatch(firstTick());
		} else if (battleInfo.status === 'EXECUTING_COMMANDS') {
			// test if commands to execute are completed (i.e. array length is 0, if so, cleanup)
			// if command to execute, verify it is still executable
			// if it is not, then invalid it.
			// if it is, execute it, switch status to a COMMAND_IN_PROGRESS, and pop the command from the list to be executed
		} else if (battleInfo.status === 'TICK_COMPLETE') {
			settings.autoTick ? dispatch(nextTick()) : dispatch(awaitUserInput());
		}

		// when tick is done, test auto.  If auto, dispatch next tick, else dispatch tick complete
	},[battleInfo.status])

	return null
}

export default GameLogic;