import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import {
	addNewBattleLogs,
	executionInProgress,
	executionComplete,
	// executionsComplete,
	replaceBattleInfo,
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

const Executions = ({ setCellColors, }) => {
	const settings = useSelector((state) => state.settings);
	const battleInfo = useSelector((state) => state.battleInfo);
	const dispatch = useDispatch();

	const rows = battleInfo.levelInfo.height;
	const columns = battleInfo.levelInfo.width;
	const cellSize = settings.cellSize;

	useEffect(()=>{
		if (battleInfo.status === 'CALLING_EXECUTION') {
			console.log('need to execute:', battleInfo.commandsToExecute[0]);
			dispatch(executionInProgress());

			// the above has .botIndex, and .command.name, .command.instructions
			switch(battleInfo.commandsToExecute[0].command.name) {
				case 'aimAndAttackCommand' : {
					aimAndAttackCommand(dispatch, battleInfo);
					break;
				}
				case 'aimCommand' : {
					aimCommand(dispatch, battleInfo);
					break;
				}
				case 'chargeCommand' : {
					chargeCommand(dispatch, battleInfo);
					break;
				}
				case 'counterCommand' : {
					counterCommand(dispatch, battleInfo);
					break;
				}
				case 'elevenAttackCommand' : {
					elevenAttackCommand(dispatch, battleInfo);
					break;
				}
				case 'meleeAttackCommand' : {
					meleeAttackCommand(dispatch, battleInfo);
					break;
				}
				case 'moveCommand' : {
					moveCommand(dispatch, battleInfo);
					break;
				}
				case 'ramCommand' : {
					ramCommand(dispatch, battleInfo);
					break;
				}
				case 'rangedAttackCommand' : {
					rangedAttackCommand(dispatch, battleInfo);
					break;
				}
				case 'rechargeCommand' : {
					rechargeCommand(dispatch, battleInfo);
					break;
				}
				case 'redirectCommand' : {
					redirectCommand(dispatch, battleInfo);
					break;
				}
				case 'repairCommand' : {
					repairCommand(dispatch, battleInfo);
					break;
				}
				case 'scanCommand' : {
					scanCommand(dispatch, battleInfo);
					break;
				}
				case 'switchCommand' : {
					switchCommand(dispatch, battleInfo);
					break;
				}
				case 'waitCommand' : {
					waitCommand(dispatch, battleInfo, replaceBattleInfo);
					break;
				}
				default: {
					console.log(`unfound command name: ${battleInfo.commandsToExecute[0].command.name} Execution.js`);
				}
			}


			

			dispatch(executionComplete());
			return
		}
	},[battleInfo.status])

	return null
}

export default Executions;