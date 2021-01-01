import { generateScanResults, illuminateScannedCells } from '../../helperFunctions';

function scanCommand (dispatch, battleInfo, completeCommand, playSFX, speed, setCellColors) {
	let newBattleInfo = {...battleInfo};
	let battleLogsToAdd = [];
	let executingBot = newBattleInfo.objectsToRender[battleInfo.commandsToExecute[0].botIndex];
	battleLogsToAdd.push({type: 'execution', content: `${executingBot.name} EXECUTES ${battleInfo.commandsToExecute[0].command.name.toUpperCase()}`});
	
	let scanResults = generateScanResults(battleInfo.commandsToExecute[0].botIndex, executingBot.attributes.ScanDistance, battleInfo.levelInfo.height, battleInfo.levelInfo.width, battleInfo.objectsToRender);
	console.log({scanResults});

	illuminateScannedCells(scanResults,speed, setCellColors);
	setTimeout(()=>{
		// potential memory leak
		setCellColors({});
	},speed*1000)


	executingBot.attributes.CurrentCapacitor -= executingBot.attributes.ScanCost;

	executingBot.stance = null;
	executingBot.switches[5] = false;
	// executingBot.scanDisplayResults = [];
	// executingBot.scanHostileResults = [];
	// executingBot.scanFriendResults = [];
	// executingBot.scanWallResults = [];
	// executingBot.scanCornerResults = [];
	executingBot.aimResults = [];
	executingBot.consecutiveAims = 0;
	executingBot.previousCommand = battleInfo.commandsToExecute[0].command.name;
	newBattleInfo.battleLog = [...newBattleInfo.battleLog, ...battleLogsToAdd];
	// dispatch(completeCommand(newBattleInfo));
	if (speed !== 0.1) {
		setTimeout(()=>{dispatch(completeCommand(newBattleInfo));},speed*1000);
	} else {
		dispatch(completeCommand(newBattleInfo));
	}


}
export default scanCommand