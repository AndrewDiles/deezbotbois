import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import {
	addNewBattleLogs,
	executionInProgress,
	executionComplete,
	completeCommand,
	setArmXAngle,
	playSFX,
} from '../../Redux/actions';
import aimAndAttackCommand from '../../Constants/scriptHelpers/executions/aimAndAttackCommand';
import aimCommand from '../../Constants/scriptHelpers/executions/aimCommand';
import chargeCommand from '../../Constants/scriptHelpers/executions/chargeCommand';
import counterCommand from '../../Constants/scriptHelpers/executions/counterCommand';
import elevenAttackCommand from '../../Constants/scriptHelpers/executions/elevenAttackCommand';
import guardCommand from '../../Constants/scriptHelpers/executions/guardCommand';
import meleeAttackCommand from '../../Constants/scriptHelpers/executions/meleeAttackCommand';
import moveCommand from '../../Constants/scriptHelpers/executions/moveCommand';
import ramCommand from '../../Constants/scriptHelpers/executions/ramCommand';
import rangedAttackCommand from '../../Constants/scriptHelpers/executions/rangedAttackCommand';
import rechargeCommand from '../../Constants/scriptHelpers/executions/rechargeCommand';
import redirectCommand from '../../Constants/scriptHelpers/executions/redirectCommand';
import repairCommand from '../../Constants/scriptHelpers/executions/repairCommand';
import scanCommand from '../../Constants/scriptHelpers/executions/scanCommand';
import switchCommand from '../../Constants/scriptHelpers/executions/switchCommand';
import waitCommand from '../../Constants/scriptHelpers/executions/waitCommand';

const Executions = ({ setCellColors, setCellClicked }) => {
	const settings = useSelector((state) => state.settings);
	const battleInfo = useSelector((state) => state.battleInfo);
	const dispatch = useDispatch();

	const rows = battleInfo.levelInfo.height;
	const columns = battleInfo.levelInfo.width;
	const cellSize = settings.cellSize;

	useEffect(()=>{
		if (battleInfo.status === 'CALLING_EXECUTION') {
			setCellClicked(battleInfo.objectsToRender[battleInfo.commandsToExecute[0].botIndex].location);
			dispatch(executionInProgress());
			switch(battleInfo.commandsToExecute[0].command.name) {
				case 'aimAndAttackCommand' : {
					aimAndAttackCommand(dispatch, battleInfo, completeCommand, playSFX, settings.executionSpeed);
					break;
				}
				case 'aimCommand' : {
					aimCommand(dispatch, battleInfo, completeCommand, playSFX, settings.executionSpeed, settings.cellSize, setArmXAngle);
					break;
				}
				case 'chargeCommand' : {
					chargeCommand(dispatch, battleInfo, completeCommand, playSFX, settings.executionSpeed);
					break;
				}
				case 'counterCommand' : {
					counterCommand(dispatch, battleInfo, completeCommand, playSFX, settings.executionSpeed);
					break;
				}
				case 'elevenAttackCommand' : {
					elevenAttackCommand(dispatch, battleInfo, completeCommand, playSFX, settings.executionSpeed);
					break;
				}
				case 'guardCommand' : {
					guardCommand(dispatch, battleInfo, completeCommand, playSFX, settings.executionSpeed);
					break;
				}
				case 'meleeAttackCommand' : {
					meleeAttackCommand(dispatch, battleInfo, completeCommand, playSFX, settings.executionSpeed);
					break;
				}
				case 'moveCommand' : {
					moveCommand(dispatch, battleInfo, completeCommand, playSFX, settings.executionSpeed, settings.cellSize, setCellColors);
					break;
				}
				case 'ramCommand' : {
					ramCommand(dispatch, battleInfo, completeCommand, playSFX, settings.executionSpeed);
					break;
				}
				case 'rangedAttackCommand' : {
					rangedAttackCommand(dispatch, battleInfo, completeCommand, playSFX, settings.executionSpeed);
					break;
				}
				case 'rechargeCommand' : {
					rechargeCommand(dispatch, battleInfo, completeCommand, playSFX, settings.executionSpeed);
					break;
				}
				case 'redirectCommand' : {
					redirectCommand(dispatch, battleInfo, completeCommand, playSFX, settings.executionSpeed);
					break;
				}
				case 'repairCommand' : {
					repairCommand(dispatch, battleInfo, completeCommand, playSFX, settings.executionSpeed);
					break;
				}
				case 'scanCommand' : {
					scanCommand(dispatch, battleInfo, completeCommand, playSFX, settings.executionSpeed, setCellColors);
					break;
				}
				case 'switchCommand' : {
					switchCommand(dispatch, battleInfo, completeCommand, playSFX, settings.executionSpeed, playSFX, settings.executionSpeed);
					break;
				}
				case 'waitCommand' : {
					waitCommand(dispatch, battleInfo, completeCommand, playSFX, settings.executionSpeed, playSFX, settings.executionSpeed);
					break;
				}
				default: {
					console.log(`unfound command name: ${battleInfo.commandsToExecute[0].command.name} Execution.js`);
					dispatch(executionComplete());
				}
			}
		}
	},[battleInfo.status])

	return null
}

export default Executions;