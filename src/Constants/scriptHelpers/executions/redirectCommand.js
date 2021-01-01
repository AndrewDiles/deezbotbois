import commandDetails from '../../commandDetails';

function redirectCommand (dispatch, battleInfo, completeCommand, playSFX, speed) {
	let newBattleInfo = {...battleInfo};
	let battleLogsToAdd = [];
	let executingBot = newBattleInfo.objectsToRender[battleInfo.commandsToExecute[0].botIndex];
	battleLogsToAdd.push({type: 'execution', content: `${executingBot.name} EXECUTES ${battleInfo.commandsToExecute[0].command.name.toUpperCase()}`});
	executingBot.stance = 'REDIRECT';
	executingBot.attributes.CurrentCapacitor -= commandDetails.redirectCommand.cost;

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
	// dispatch(completeCommand(newBattleInfo));
	if (speed !== 0.1) {
		setTimeout(()=>{dispatch(completeCommand(newBattleInfo));},speed*1000);
	} else {
		dispatch(completeCommand(newBattleInfo));
	}
}
export default redirectCommand