import { pathToAdjacentCell, pathToCell, movesAlongPath  } from '../../helperFunctions';

function moveCommand (dispatch, battleInfo, completeCommand, playSFX, speed) {
	let newBattleInfo = {...battleInfo};
	let battleLogsToAdd = [];
	let executingBot = newBattleInfo.objectsToRender[battleInfo.commandsToExecute[0].botIndex];
	battleLogsToAdd.push({type: 'execution', content: `${executingBot.name} EXECUTES ${battleInfo.commandsToExecute[0].command.name.toUpperCase()}`});
	battleLogsToAdd.push({type: 'attribute-change', content: `${executingBot.name}'S CAPACITOR DECREASES FROM ${executingBot.attributes.CurrentCapacitor} TO ${executingBot.attributes.CurrentCapacitor-executingBot.attributes.MovementCost}`});
	let pathToTakePreCollisions = [];

	if (battleInfo.commandsToExecute[0].command.instructions.targetting) {
		let targetType = battleInfo.commandsToExecute[0].command.instructions.targetType;
		let targetTypeString = `scan${targetType.charAt(0).toUpperCase() + targetType.slice(1)}Results`;
		let scanData = executingBot[targetTypeString];
		let target = scanData[battleInfo.commandsToExecute[0].command.instructions.targetNumber-1];
		if (battleInfo.commandsToExecute[0].command.instructions.intent === 'adjacent') {
			pathToTakePreCollisions = (pathToAdjacentCell(executingBot.location, target.location));
		} else if (battleInfo.commandsToExecute[0].command.instructions.intent === 'collision') {
			pathToTakePreCollisions = (pathToCell(executingBot.location, target.location))
		} else {
			console.log("error obtaining instructions' intent in move execution")
		}
	} else {
		pathToTakePreCollisions = battleInfo.commandsToExecute[0].command.instructions.directions;
	}

	console.log({pathToTakePreCollisions});
	let collision = null;
	let exceedingMaximumMovementDistance = false;
	let pathToTravel = [];
	while (!collision || !exceedingMaximumMovementDistance || pathToTravel.length !== pathToTakePreCollisions.length) {
		
	}




	executingBot.attributes.CurrentCapacitor -= executingBot.attributes.MovementCost;
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
	// dispatch(completeCommand(newBattleInfo));
	if (speed !== 0.1) {
		setTimeout(()=>{dispatch(completeCommand(newBattleInfo));},speed*1000);
	} else {
		dispatch(completeCommand(newBattleInfo));
	}
}
 export default moveCommand