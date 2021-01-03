import { weaponStats } from '../../equipment';

function counterCommand (dispatch, battleInfo, completeCommand, playSFX, speed) {
	let newBattleInfo = {...battleInfo};
	let battleLogsToAdd = [];
	let executingBot = newBattleInfo.objectsToRender[battleInfo.commandsToExecute[0].botIndex];
	battleLogsToAdd.push({type: 'execution', content: `${executingBot.name} EXECUTES ${battleInfo.commandsToExecute[0].command.name.toUpperCase()}`});
	executingBot.stance = 'COUNTER';
	let commandCost = (weaponStats[executingBot.equipment[battleInfo.commandsToExecute[0].command.instructions.weapon]].attackCost + executingBot.attributes.attackCostModifier);
	battleLogsToAdd.push({type: 'attribute-change', content: `${executingBot.name}'S CAPACITOR DECREASES FROM ${executingBot.attributes.CurrentCapacitor} TO ${executingBot.attributes.CurrentCapacitor-commandCost}`});
	executingBot.attributes.CurrentCapacitor -= commandCost;

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
export default counterCommand