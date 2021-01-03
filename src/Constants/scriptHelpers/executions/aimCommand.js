import { verifyCellIsOnCorner } from '../../helperFunctions';
import { weaponStats } from '../../equipment';

function aimCommand (dispatch, battleInfo, completeCommand, playSFX, speed, cellSize, setArmXAngle) {
	let newBattleInfo = {...battleInfo};
	let battleLogsToAdd = [];
	let executingBot = newBattleInfo.objectsToRender[battleInfo.commandsToExecute[0].botIndex];
	battleLogsToAdd.push({type: 'execution', content: `${executingBot.name} EXECUTES ${battleInfo.commandsToExecute[0].command.name.toUpperCase()}`});
	let commandCost = (weaponStats[executingBot.equipment[battleInfo.commandsToExecute[0].command.instructions.weapon]].aimCost + executingBot.attributes.aimCostModifier);
	battleLogsToAdd.push({type: 'attribute-change', content: `${executingBot.name}'S CAPACITOR DECREASES FROM ${executingBot.attributes.CurrentCapacitor} TO ${executingBot.attributes.CurrentCapacitor-commandCost}`});
	executingBot.attributes.CurrentCapacitor -= commandCost;
	let armXAngle = `${battleInfo.commandsToExecute[0].command.instructions.weapon}Angle`;
	let newAngle = null;
	if (battleInfo.commandsToExecute[0].command.instructions.rotating) {
		newAngle = executingBot[armXAngle] + battleInfo.commandsToExecute[0].command.instructions.rotation;
	} else {
		console.log('just setting value to:', battleInfo.commandsToExecute[0].command.instructions.rangedDirection);
		newAngle = battleInfo.commandsToExecute[0].command.instructions.rangedDirection;
	}
	dispatch(setArmXAngle(battleInfo.commandsToExecute[0].botIndex, armXAngle, newAngle));
	
	// problem with botCellPlacement below is that placerX is using transform and so z-index is not working as intended
	// const botCellPlacement = document.getElementById(`col${executingBot.location.col} row${executingBot.location.row}`);
	const botCellPlacement = document.getElementById(`placer${battleInfo.commandsToExecute[0].botIndex}`);
	const aimBar = document.createElement("div");

	if (speed > 0.1) {
		aimBar.style.height = `${cellSize/5}px`;
		// may have to set width to something small to avoid displacement of other objects?
		// not the case - plus it doesn't extend outside the top and left grid barriers due to overflow: none
		aimBar.style.width = `${((battleInfo.levelInfo.height + battleInfo.levelInfo.width)/1.5)*cellSize}px`;
		aimBar.style.position = 'relative';
		aimBar.style.top = `-${6*cellSize/10}px`;
		aimBar.style.left = `${(9*cellSize/20)}px`;
		aimBar.style.zIndex = '5';
		aimBar.style.display = 'flex';
		aimBar.style.flexDirection = 'row';
		// aimBar.style.backgroundColor = 'purple';
		aimBar.style.transformOrigin = `${(cellSize/10)}px`;
		aimBar.style.transform = `rotate(${executingBot[armXAngle]}deg)`;

		botCellPlacement.appendChild(aimBar);

		function addAimDot () {
			const aimDot = document.createElement("div"); 
			aimDot.style.background = 'red';
			aimDot.style.height = `${cellSize/10}px`;
			aimDot.style.width = `${cellSize/10}px`;
			aimDot.style.margin = `${cellSize/20}px`;
			aimDot.style.position = 'relative';
			aimDot.style.zIndex = '5';
			aimDot.style.borderRadius = '50%';
			aimBar.appendChild(aimDot);
		}
		const dotSize = (Math.sqrt(2*(cellSize*cellSize)))/7;
		const firstDotCoordinates = {x:cellSize*(executingBot.location.col-.5), y:cellSize*(executingBot.location.row-.5)}
		const deltaX = dotSize*Math.cos(newAngle * Math.PI / 180);
		const deltaY = -dotSize*Math.sin(newAngle * Math.PI / 180);
		for(let i = 0; i<15; i++) {
			addAimDot();
		}
	}

	executingBot.stance = null;
	executingBot.switches[5] = false;
	executingBot.aimResults = [];
	executingBot.consecutiveAims = 0;
	executingBot.previousCommand = battleInfo.commandsToExecute[0].command.name;
	newBattleInfo.battleLog = [...newBattleInfo.battleLog, ...battleLogsToAdd];
	// dispatch(completeCommand(newBattleInfo));
	if (speed !== 0.1) {
		setTimeout(()=>{
			// botCellPlacement.removeChild(aimBar);
			dispatch(completeCommand(newBattleInfo));
		},speed*1000);
	} else {
		dispatch(completeCommand(newBattleInfo));
	}
}
export default aimCommand