import commandDetails from '../../commandDetails';

function repairCommand (dispatch, battleInfo, completeCommand, playSFX, speed) {
	let newBattleInfo = {...battleInfo};
	let battleLogsToAdd = [];
	let executingBot = newBattleInfo.objectsToRender[battleInfo.commandsToExecute[0].botIndex];
	battleLogsToAdd.push({type: 'execution', content: `${executingBot.name} EXECUTES ${battleInfo.commandsToExecute[0].command.name.toUpperCase()}`});
	battleLogsToAdd.push({type: 'attribute-change', content: `${executingBot.name}'S CAPACITOR DECREASES FROM ${executingBot.attributes.CurrentCapacitor} TO ${executingBot.attributes.CurrentCapacitor-commandDetails.repairCommand.cost}`});
	if (executingBot.attributes.CurrentDurability + 1 > executingBot.attributes.Durability) {
		battleLogsToAdd.push({type: 'attribute-change', content: `${executingBot.name}'S DURABILITY INCREASES FROM ${executingBot.attributes.CurrentDurability} TO ${executingBot.attributes.Durability}`});
		executingBot.attributes.CurrentDurability = executingBot.attributes.Durability;
	} else {
		battleLogsToAdd.push({type: 'attribute-change', content: `${executingBot.name}'S DURABILITY INCREASES FROM ${executingBot.attributes.CurrentDurability} TO ${executingBot.attributes.CurrentDurability+1}`});
		executingBot.attributes.CurrentDurability += 1;
	}
	executingBot.attributes.CurrentCapacitor -= commandDetails.repairCommand.cost;

	executingBot.stance = null;
	executingBot.switches[5] = false;
	executingBot.scanDisplayResults = [];
	executingBot.scanHostileResults = [];
	executingBot.scanFriendResults = [];
	executingBot.scanWallResults = [];
	executingBot.scanCornerResults = [];
	executingBot.aimResults = [];
	executingBot.consecutiveAims = 0;
	executingBot.previousCommand = battleInfo.commandsToExecute[0].command;
	newBattleInfo.battleLog = [...newBattleInfo.battleLog, ...battleLogsToAdd];
	if (speed !== 0.1) {
		setTimeout(()=>{dispatch(completeCommand(newBattleInfo));},speed*1000);
	} else {
		dispatch(completeCommand(newBattleInfo));
	}
}
export default repairCommand