function waitCommand (dispatch, battleInfo, replaceBattleInfo) {
	let newBattleInfo = {...battleInfo};
	let battleLogsToAdd = [];
	let executingBot = newBattleInfo.objectsToRender[battleInfo.commandsToExecute[0].botIndex];
	battleLogsToAdd.push({type: 'execution', content: `${executingBot.name} EXECUTES ${battleInfo.commandsToExecute[0].command.name.toUpperCase()}`});
	executingBot.switches[5] = false;
	executingBot.scanDisplayResults = [];
	executingBot.scanHostileResults = [];
	executingBot.scanFriendResults = [];
	executingBot.scanWallResults = [];
	executingBot.scanCornerResults = [];
	executingBot.aimResults = [];
	executingBot.consecutiveAims = 0;
	executingBot.previousCommand = battleInfo.commandsToExecute[0].command.name;
	newBattleInfo.battleLog = [...newBattleInfo.battleLog, ...battleLogsToAdd];
	dispatch(replaceBattleInfo(newBattleInfo));
}
export default waitCommand