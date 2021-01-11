import { pathToAdjacentCell, pathToCell, nextStepGenerator, movesAlongPath, collisionVerification, translationGenerator } from '../../helperFunctions';
import { handleCollision } from '../../combatFormulae';
import animateSparks from '../animateSparks';

function moveCommand (dispatch, battleInfo, completeCommand, playSFX, speed, cellSize, setCellColors) {
	let newBattleInfo = {...battleInfo};
	let battleLogsToAdd = [];
	let executingBot = newBattleInfo.objectsToRender[battleInfo.commandsToExecute[0].botIndex];
	battleLogsToAdd.push({type: 'execution', content: `${executingBot.name} EXECUTES ${battleInfo.commandsToExecute[0].command.name.toUpperCase()}`});
	battleLogsToAdd.push({type: 'attribute-change', content: `${executingBot.name}'S CAPACITOR DECREASES FROM ${executingBot.attributes.CurrentCapacitor} TO ${executingBot.attributes.CurrentCapacitor-executingBot.attributes.MovementCost}`});
	executingBot.attributes.CurrentCapacitor -= executingBot.attributes.MovementCost;
	
	if (executingBot.attributes.MovementDistance === 0) {
		// no movement to take place
		battleLogsToAdd.push({type: 'attribute-change', content: `${executingBot.name} HAS 0 MOVEMENT DISTANCE AND REMAINS ON CELL ROW: ${executingBot.location.row} COL: ${executingBot.location.col}`});
		newBattleInfo.battleLog = [...newBattleInfo.battleLog, ...battleLogsToAdd];
		if (speed === 0.1) {
			dispatch(completeCommand(newBattleInfo));
		} else {
			setTimeout(()=>{dispatch(completeCommand(newBattleInfo));},speed*1000);
		}
	}

	//obtain path to travel based on target or just use the path given
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
	// test if a collision occurs anywhere along path or if more MovementDistance is required that the executing bot possesses
	let collision = null;
	let exceedingMaximumMovementDistance = false;
	let pathToTravel = [];
	let futureFinishLocation = {...executingBot.location};
	let cellColorsObject = {};
	while (!collision && !exceedingMaximumMovementDistance && pathToTravel.length !== pathToTakePreCollisions.length) {
		if (movesAlongPath([...pathToTravel, pathToTakePreCollisions[pathToTravel.length]]) > executingBot.attributes.MovementDistance) {
			exceedingMaximumMovementDistance = true;
		} else {
			let locationOfNextStep = nextStepGenerator(futureFinishLocation, pathToTakePreCollisions[pathToTravel.length]);
			// console.log({locationOfNextStep});
			collision = collisionVerification(locationOfNextStep, battleInfo.objectsToRender, battleInfo.levelInfo.height, battleInfo.levelInfo.width, battleInfo.commandsToExecute[0].botIndex);
			// console.log({collision});
			if (!collision) {
				pathToTravel.push(pathToTakePreCollisions[pathToTravel.length]);
				futureFinishLocation = {...locationOfNextStep};
				cellColorsObject[`row${locationOfNextStep.row}col${locationOfNextStep.col}`] = 'rgba(0,255,0,0.5)';
			} else {
				collision.impactMove = pathToTakePreCollisions[pathToTravel.length];
				cellColorsObject[`row${locationOfNextStep.row}col${locationOfNextStep.col}`] = 'rgba(255,0,0,0.5)';
			}
		}
	}
	// console.log({collision});
	// console.log({exceedingMaximumMovementDistance});
	// console.log({pathToTravel});

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

	let totalMovesToMake = pathToTravel.length;
	if (collision) {
		totalMovesToMake ++;
	}

	if (totalMovesToMake === 0) {
		// no movement to take place
		// console.log('no moves to make');
		battleLogsToAdd.push({type: 'attribute-change', content: `${executingBot.name} WAS INSTRUCTED TO MOVE NO CELLS AND REMAINS ON CELL ROW: ${executingBot.location.row} COL: ${executingBot.location.col}`});
		newBattleInfo.battleLog = [...newBattleInfo.battleLog, ...battleLogsToAdd];
		if (speed === 0.1) {
			dispatch(completeCommand(newBattleInfo));
		} else {
			setTimeout(()=>{dispatch(completeCommand(newBattleInfo));},speed*1000);
		}
	} else {
		if (speed === 0.1) {
			// no animations / sfx
			const translationCalculation = translationGenerator(pathToTravel, cellSize, 0, 0);
			executingBot.location.row += translationCalculation.yDisplacement/cellSize;
			executingBot.location.col += translationCalculation.xDisplacement/cellSize;
			if (collision) {
				battleLogsToAdd.push({type: 'attribute-change', content: `COLISION! ${executingBot.name} ENDS ON CELL ROW: ${executingBot.location.row + translationCalculation.yDisplacement/cellSize} COL: ${executingBot.location.col + translationCalculation.xDisplacement/cellSize}`});
				let newRecordChanges = [...battleInfo.recordTracker.recordChanges];
				let collisionResult = handleCollision(battleInfo.objectsToRender, executingBot.index, collision.type === 'wall', collision.type === 'wall' ? null : collision.index, 1, 0);
				newRecordChanges.push(...collisionResult.newRecordsChangesToAdd);
				battleLogsToAdd.push({type: 'attribute-change', content: `${executingBot.name}'S DURABILITY DECREASES FROM ${executingBot.attributes.CurrentDurability} TO ${executingBot.attributes.CurrentDurability - collisionResult.impacterDamageTaken}`});
				executingBot.attributes.CurrentDurability -= collisionResult.impacterDamageTaken;
				if (collision.index) {
					battleLogsToAdd.push({type: 'attribute-change', content: `${battleInfo.objectsToRender[collision.index].name}'S DURABILITY DECREASES FROM ${battleInfo.objectsToRender[collision.index].attributes.CurrentDurability} TO ${battleInfo.objectsToRender[collision.index].attributes.CurrentDurability - collisionResult.recipientDamageTaken}`});
					battleInfo.objectsToRender[collision.index].attributes.CurrentDurability -= collisionResult.recipientDamageTaken;
				}
				battleLogsToAdd.push(...collisionResult.newBattleLogsToAdd);
				newBattleInfo.recordTracker.recordChanges = newRecordChanges;
				// console.log('new battle logs:', collisionResult.newBattleLogsToAdd);
			} else {
				battleLogsToAdd.push({type: 'attribute-change', content: `${executingBot.name} MOVES TO CELL ROW: ${executingBot.location.row} COL: ${executingBot.location.col}`});
			}
			newBattleInfo.battleLog = [...newBattleInfo.battleLog, ...battleLogsToAdd];
			dispatch(completeCommand(newBattleInfo));
		} else {
			// animations and sfx to be produced
			setCellColors(cellColorsObject);
			let timePerMove = 750*speed; // represents 75% of the executionSpeed, leaves 25% for damage indication
			// console.log('time per move before division', timePerMove);
			if (executingBot.attributes.MovementDistance > 0) {
				timePerMove /= executingBot.attributes.MovementDistance;
			}
			// console.log({timePerMove});
			const botToMoveId = `placer${battleInfo.commandsToExecute[0].botIndex}`;
			const botToMove = document.getElementById(botToMoveId);
			
			let xDisplacement = 0;
			let yDisplacement = 0;
			if (totalMovesToMake === 1) {
				if (collision) {
					const translationCalculation = translationGenerator([collision.impactMove], cellSize, xDisplacement, yDisplacement);
					const returnTranslationCalculation = translationGenerator([], cellSize, xDisplacement, yDisplacement);
					botToMove.style.transform = translationCalculation.transform;
					botToMove.style.transition = `transform ${timePerMove/1000}s ease-in`;
					setTimeout(()=>{
						const botToMove = document.getElementById(botToMoveId);
						if (botToMove) {
							botToMove.style.transition = `transform ${timePerMove/1000}s ease-out`;
							botToMove.style.transform = returnTranslationCalculation.transform;
							dispatch(playSFX('impact'));
							animateSparks(collision.type === 'wall' && collision.location, collision.index, collision.impactMove, cellSize, collision.type === 'wall' ? 6 : 10, speed*750);
						}
					},(0.6*timePerMove));
					let newRecordChanges = [...battleInfo.recordTracker.recordChanges];
					let collisionResult = handleCollision(battleInfo.objectsToRender, executingBot.index, collision.type === 'wall', collision.type === 'wall' ? null : collision.index, 1, 0);
					battleLogsToAdd.push({type: 'attribute-change', content: `COLISION! ${executingBot.name} ENDS ON CELL ROW: ${executingBot.location.row + translationCalculation.yDisplacement/cellSize} COL: ${executingBot.location.col + translationCalculation.xDisplacement/cellSize}`});
					newRecordChanges.push(...collisionResult.newRecordsChangesToAdd);
					battleLogsToAdd.push({type: 'attribute-change', content: `${executingBot.name}'S DURABILITY DECREASES FROM ${executingBot.attributes.CurrentDurability} TO ${executingBot.attributes.CurrentDurability - collisionResult.impacterDamageTaken}`});
					executingBot.attributes.CurrentDurability -= collisionResult.impacterDamageTaken;
					if (collision.index) {
						battleLogsToAdd.push({type: 'attribute-change', content: `${battleInfo.objectsToRender[collision.index].name}'S DURABILITY DECREASES FROM ${battleInfo.objectsToRender[collision.index].attributes.CurrentDurability} TO ${battleInfo.objectsToRender[collision.index].attributes.CurrentDurability - collisionResult.recipientDamageTaken}`});
						battleInfo.objectsToRender[collision.index].attributes.CurrentDurability -= collisionResult.recipientDamageTaken;
					}
					battleLogsToAdd.push(...collisionResult.newBattleLogsToAdd);
					newBattleInfo.recordTracker.recordChanges = newRecordChanges;
					newBattleInfo.battleLog = [...newBattleInfo.battleLog, ...battleLogsToAdd];
					setTimeout(()=>{
						const botToMove = document.getElementById(botToMoveId);
						if (botToMove) {
							botToMove.style.transition = '0s';
							botToMove.style.transform = 'translate(0px,0px)';
						}
						executingBot.location.row += returnTranslationCalculation.yDisplacement/cellSize;
						executingBot.location.col += returnTranslationCalculation.xDisplacement/cellSize;
						setCellColors({});
						dispatch(completeCommand(newBattleInfo));
					},((speed*1000)-timePerMove));
				} else {
					botToMove.style.transition = `transform ${timePerMove/1000}s ease-in-out`;
					const translationCalculation = translationGenerator([pathToTravel[0]], cellSize, xDisplacement, yDisplacement);
					// console.log('transform:', translationCalculation.transform);
					botToMove.style.transform = translationCalculation.transform;
					
					battleLogsToAdd.push({type: 'attribute-change', content: `${executingBot.name} MOVES TO CELL ROW: ${executingBot.location.row + translationCalculation.yDisplacement/cellSize} COL: ${executingBot.location.col + translationCalculation.xDisplacement/cellSize}`});
					newBattleInfo.battleLog = [...newBattleInfo.battleLog, ...battleLogsToAdd];
					setTimeout(()=>{
						const botToMove = document.getElementById(botToMoveId);
						if (botToMove) {
							botToMove.style.transition = '0s';
							botToMove.style.transform = 'translate(0px,0px)';
						}
						executingBot.location.row += translationCalculation.yDisplacement/cellSize;
						executingBot.location.col += translationCalculation.xDisplacement/cellSize;
						setCellColors({});
						dispatch(completeCommand(newBattleInfo));
					},((speed*1000)-timePerMove));
				}
			} else {
				let moveNumberToExecute = 0;
				botToMove.style.transition = `transform ${timePerMove/1000}s ease-in`;
				const translationCalculation = translationGenerator([pathToTravel[0]], cellSize, xDisplacement, yDisplacement);
				botToMove.style.transform = translationCalculation.transform;
				xDisplacement = translationCalculation.xDisplacement;
				yDisplacement = translationCalculation.yDisplacement;
				moveNumberToExecute ++;
				function performNextMove () {
					if (moveNumberToExecute === totalMovesToMake-1) {
						// on last move
						if (collision) {
							const translationCalculation = translationGenerator([collision.impactMove], cellSize, xDisplacement, yDisplacement);
							const returnTranslationCalculation = translationGenerator([], cellSize, xDisplacement, yDisplacement);
							botToMove.style.transition = `transform ${timePerMove/1000}s linear`;
							botToMove.style.transform = translationCalculation.transform;
							setTimeout(()=>{
								const botToMove = document.getElementById(botToMoveId);
								if (botToMove) {
									botToMove.style.transition = `transform ${timePerMove/1000}s ease-out`;
									botToMove.style.transform = returnTranslationCalculation.transform;
									dispatch(playSFX('impact'));
									animateSparks(collision.type === 'wall' && collision.location, collision.index, collision.impactMove, cellSize, collision.type === 'wall' ? 6 : 10, speed*750);
								}
							},(0.6*timePerMove));
							let newRecordChanges = [...battleInfo.recordTracker.recordChanges];
							let collisionResult = handleCollision(battleInfo.objectsToRender, executingBot.index, collision.type === 'wall', collision.type === 'wall' ? null : collision.index, 1, 0);
							battleLogsToAdd.push({type: 'attribute-change', content: `COLISION! ${executingBot.name} ENDS ON CELL ROW: ${executingBot.location.row + translationCalculation.yDisplacement/cellSize} COL: ${executingBot.location.col + translationCalculation.xDisplacement/cellSize}`});
							newRecordChanges.push(...collisionResult.newRecordsChangesToAdd);
							battleLogsToAdd.push({type: 'attribute-change', content: `${executingBot.name}'S DURABILITY DECREASES FROM ${executingBot.attributes.CurrentDurability} TO ${executingBot.attributes.CurrentDurability - collisionResult.impacterDamageTaken}`});
							executingBot.attributes.CurrentDurability -= collisionResult.impacterDamageTaken;
							if (collision.index) {
								battleLogsToAdd.push({type: 'attribute-change', content: `${battleInfo.objectsToRender[collision.index].name}'S DURABILITY DECREASES FROM ${battleInfo.objectsToRender[collision.index].attributes.CurrentDurability} TO ${battleInfo.objectsToRender[collision.index].attributes.CurrentDurability - collisionResult.recipientDamageTaken}`});
								battleInfo.objectsToRender[collision.index].attributes.CurrentDurability -= collisionResult.recipientDamageTaken;
							}
							battleLogsToAdd.push(...collisionResult.newBattleLogsToAdd);
							newBattleInfo.recordTracker.recordChanges = newRecordChanges;
							newBattleInfo.battleLog = [...newBattleInfo.battleLog, ...battleLogsToAdd];
							setTimeout(()=>{
								const botToMove = document.getElementById(botToMoveId);
								if (botToMove) {
									botToMove.style.transition = '0s';
									botToMove.style.transform = 'translate(0px,0px)';
								}
								executingBot.location.row += returnTranslationCalculation.yDisplacement/cellSize;
								executingBot.location.col += returnTranslationCalculation.xDisplacement/cellSize;
								setCellColors({});
								dispatch(completeCommand(newBattleInfo));
							},((speed*1000)-(timePerMove*(totalMovesToMake))));
						} else {
							botToMove.style.transition = `transform ${timePerMove/1000}s ease-out`;
							const translationCalculation = translationGenerator([pathToTravel[moveNumberToExecute]], cellSize, xDisplacement, yDisplacement);
							// console.log('transform final:',translationCalculation.transform);
							botToMove.style.transform = translationCalculation.transform;
							battleLogsToAdd.push({type: 'attribute-change', content: `${executingBot.name} MOVES TO CELL ROW: ${executingBot.location.row + translationCalculation.yDisplacement/cellSize} COL: ${executingBot.location.col + translationCalculation.xDisplacement/cellSize}`});
							newBattleInfo.battleLog = [...newBattleInfo.battleLog, ...battleLogsToAdd];
							setTimeout(()=>{
								const botToMove = document.getElementById(botToMoveId);
								if (botToMove) {
									botToMove.style.transition = '0s';
									botToMove.style.transform = 'translate(0px,0px)';
								}
								setCellColors({});
								executingBot.location.row += translationCalculation.yDisplacement/cellSize;
								executingBot.location.col += translationCalculation.xDisplacement/cellSize;
								dispatch(completeCommand(newBattleInfo));
							},((speed*1000)-(timePerMove*(totalMovesToMake))));
						}
					} else {
						// in a middle move - collision is impossible
						botToMove.style.transition = `transform ${timePerMove/1000}s linear`;
						const translationCalculation = translationGenerator([pathToTravel[moveNumberToExecute]], cellSize, xDisplacement, yDisplacement);
						// console.log('transform #:',moveNumberToExecute+1, translationCalculation.transform);
						botToMove.style.transform = translationCalculation.transform;
						xDisplacement = translationCalculation.xDisplacement;
						yDisplacement = translationCalculation.yDisplacement;
						moveNumberToExecute ++;
						setTimeout(()=>{
							performNextMove();
						},(timePerMove));
					}
				}
				setTimeout(()=>{
					performNextMove();
				},(timePerMove));
			}
		}
	}
}
 export default moveCommand