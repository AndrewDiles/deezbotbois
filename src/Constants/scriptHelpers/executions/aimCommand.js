import { generateAimBar, generateAimDot, generateAimX, generateTargetCircle, findLocationOfDot, verifyCellIsInBounds, findObjectOnCell, testSameCell } from '../../helperFunctions';
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
		newAngle = battleInfo.commandsToExecute[0].command.instructions.rangedDirection;
	}
	dispatch(setArmXAngle(battleInfo.commandsToExecute[0].botIndex, armXAngle, newAngle));
	
	// problem with botCellPlacement below is that placerX is using transform and so z-index is not working as intended
	// const botCellPlacement = document.getElementById(`col${executingBot.location.col} row${executingBot.location.row}`);

	const battleFieldHypotenuse = Math.sqrt(Math.pow(cellSize*battleInfo.levelInfo.height,2) + Math.pow(cellSize*battleInfo.levelInfo.width,2));
	
	let collision = null;
	const firstDotCoordinates = {x:cellSize*(executingBot.location.col-.5), y:cellSize*(executingBot.location.row-.5)}
	const dotSize = (Math.sqrt(2*(cellSize*cellSize)))/7;
	const deltaX = dotSize*Math.cos(newAngle * Math.PI / 180);
	const deltaY = dotSize*Math.sin(newAngle * Math.PI / 180);

	if (speed > 0.1) {
		// includes animations and timeouts
		const botCellPlacement = document.getElementById(`placer${battleInfo.commandsToExecute[0].botIndex}`);
		const aimBar = generateAimBar(cellSize, battleFieldHypotenuse, executingBot[armXAngle]);
		botCellPlacement.appendChild(aimBar);
		// units below: [time/dot] = [time allocated] / [distance] * [dot/distance]
		// 50% of the execution time is allocated to generation of dots, hence 0.5 multiplier
		const rateOfDotAnimation = (speed*0.5)/(battleFieldHypotenuse/dotSize);
		let previousDotLocation = {...findLocationOfDot(firstDotCoordinates.x, firstDotCoordinates.y, cellSize)}
		let i = 0;
		function nextDot () {
			if (!collision) {
				let newDotLocation = findLocationOfDot(firstDotCoordinates.x+i*deltaX, firstDotCoordinates.y+i*deltaY, cellSize);
				// verifyCellIsInBounds, findObjectOnCell, testSameCell
				if (testSameCell(previousDotLocation, newDotLocation)) {
					aimBar.appendChild(generateAimDot(cellSize));
					i++;
					setTimeout(nextDot,rateOfDotAnimation);
				} else {
					if (verifyCellIsInBounds(newDotLocation, battleInfo.levelInfo.height, battleInfo.levelInfo.width)) {
						let possibleResult = findObjectOnCell(newDotLocation, battleInfo.objectsToRender);
						if (possibleResult) {
							aimBar.appendChild(generateAimX(cellSize));
							collision = {index: possibleResult.index, type: possibleResult.type, team: possibleResult.team };
							console.log({collision});
							const targetCellPlacement = document.getElementById(`placer${possibleResult.index}`);
							const targetCircle = generateTargetCircle(cellSize);
							targetCellPlacement.appendChild(targetCircle);
							executingBot.stance = null;
							executingBot.switches[5] = false;
							executingBot.aimResults = [collision];
							executingBot.consecutiveAims ++;
							executingBot.previousCommand = battleInfo.commandsToExecute[0].command;
							newBattleInfo.battleLog = [...newBattleInfo.battleLog, ...battleLogsToAdd];
							setTimeout(()=>{
								botCellPlacement.removeChild(aimBar);
								targetCellPlacement.removeChild(targetCircle);
								dispatch(completeCommand(newBattleInfo));
							},((speed*1000)-(i*rateOfDotAnimation)));
						} else {
							aimBar.appendChild(generateAimDot(cellSize));
							i++;
							previousDotLocation = {...newDotLocation};
							setTimeout(nextDot,rateOfDotAnimation*1000)
						}
					} else {
						aimBar.appendChild(generateAimX(cellSize));
						// collision = {type: 'wall', location: newDotLocation}
						// console.log({collision});
						executingBot.stance = null;
						executingBot.switches[5] = false;
						executingBot.aimResults = [];
						executingBot.consecutiveAims ++;
						executingBot.previousCommand = battleInfo.commandsToExecute[0].command;
						newBattleInfo.battleLog = [...newBattleInfo.battleLog, ...battleLogsToAdd];
						setTimeout(()=>{
							botCellPlacement.removeChild(aimBar);
							dispatch(completeCommand(newBattleInfo));
						},((speed*1000)-(i*rateOfDotAnimation)));
					}
				}
			}
		}
		nextDot();
	} else {
		// does not include animations nor timeouts - runs as fast as possible
		let previousDotLocation = {...findLocationOfDot(firstDotCoordinates.x, firstDotCoordinates.y, cellSize)}
		let i = 0;
		function nextDot () {
			if (!collision) {
				let newDotLocation = findLocationOfDot(firstDotCoordinates.x+i*deltaX, firstDotCoordinates.y+i*deltaY, cellSize);
				if (testSameCell(previousDotLocation, newDotLocation)) {
					i++;
					nextDot();
				} else {
					if (verifyCellIsInBounds(newDotLocation, battleInfo.levelInfo.height, battleInfo.levelInfo.width)) {
						let possibleResult = findObjectOnCell(newDotLocation, battleInfo.objectsToRender);
						if (possibleResult) {
							collision = {index: possibleResult.index, type: possibleResult.type, team: possibleResult.team };
							console.log({collision});
							executingBot.stance = null;
							executingBot.switches[5] = false;
							executingBot.aimResults = [collision];
							executingBot.consecutiveAims ++;
							executingBot.previousCommand = battleInfo.commandsToExecute[0].command;
							newBattleInfo.battleLog = [...newBattleInfo.battleLog, ...battleLogsToAdd];
							dispatch(completeCommand(newBattleInfo))
						} else {
							i++;
							previousDotLocation = {...newDotLocation};
							nextDot();
						}
					} else {
						collision = {type: 'wall', location: newDotLocation}
						console.log({collision});
						executingBot.stance = null;
						executingBot.switches[5] = false;
						executingBot.aimResults = [];
						executingBot.consecutiveAims ++;
						executingBot.previousCommand = battleInfo.commandsToExecute[0].command;
						newBattleInfo.battleLog = [...newBattleInfo.battleLog, ...battleLogsToAdd];
						dispatch(completeCommand(newBattleInfo))
					}
				}
			}
		}
		nextDot();
	}
}
export default aimCommand