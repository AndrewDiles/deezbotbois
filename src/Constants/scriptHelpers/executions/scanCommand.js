import { generateScanResults, illuminateScannedCells, filterScanResults, verifyCellIsOnCorner } from '../../helperFunctions';

function scanCommand (dispatch, battleInfo, completeCommand, playSFX, speed, setCellColors) {
	let newBattleInfo = {...battleInfo};
	let battleLogsToAdd = [];
	let executingBot = newBattleInfo.objectsToRender[battleInfo.commandsToExecute[0].botIndex];
	battleLogsToAdd.push({type: 'execution', content: `${executingBot.name} EXECUTES ${battleInfo.commandsToExecute[0].command.name.toUpperCase()}`});
	
	let scanResults = generateScanResults(battleInfo.commandsToExecute[0].botIndex, executingBot.attributes.ScanDistance, battleInfo.levelInfo.height, battleInfo.levelInfo.width, battleInfo.objectsToRender);
	console.log({scanResults});

	illuminateScannedCells(scanResults,speed, setCellColors);
	setTimeout(()=>{
		// potential memory leak?
		setCellColors({});
	},speed*1000)
	executingBot.scanDisplayResults = filterScanResults(scanResults);
	executingBot.scanHostileResults = [];
	executingBot.scanFriendResults = [];
	executingBot.scanWallResults = [];
	executingBot.scanCornerResults = [];
	if (executingBot.scanDisplayResults.length > 0) {
		executingBot.scanDisplayResults.forEach((scannedObject)=>{
			scannedObject.location = {col:scannedObject.col, row: scannedObject.row};
			if (scannedObject.cellIs === 'hostile') {
				executingBot.scanHostileResults.push(scannedObject);
			} else if (scannedObject.cellIs === 'friendly') {
				executingBot.scanFriendResults.push(scannedObject);
			} else if (scannedObject.cellIs === 'wall') {
				if (verifyCellIsOnCorner({row: scannedObject.row, col: scannedObject.col}, battleInfo.levelInfo.height, battleInfo.levelInfo.width)) {
					executingBot.scanCornerResults.push(scannedObject);
				} else {
					executingBot.scanWallResults.push(scannedObject);
				}
			} else {
				console.log('error, unknown scan type:', scannedObject.cellIs);
			}
		})
	}
	//	samples of scanned objects in .scanDisplayResults (.location added in forEach loop)
	//	{row: 10, col: 10, cellIs: "hostile", distance: 1}
	//	{row: 10, col: 12, cellIs: "wall", distance: 1}
	executingBot.attributes.CurrentCapacitor -= executingBot.attributes.ScanCost;

	executingBot.stance = null;
	executingBot.switches[5] = false;
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