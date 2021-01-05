import getNodeArray from './getNodeArray';
import commandDetails from '../../Constants/commandDetails';
import { weaponStats } from '../../Constants/equipment';
import allDirections from '../../Constants/allDirectionsArray';
import waitCommand from '../../Constants/defaultWaitCommand';

import { 
	testSameCell,
	verifyCellIsInBounds,
	verifyCellIsOnCorner,
	distanceToAdjacentToCell,
	pathToAdjacentCell,
	nextStepGenerator,
	collisionVerification,
	isPathAdjacentToObstructed,
} from '../../Constants/helperFunctions';

function getNextCommand (objectsToRender, indexInQuestion, levelInfo) {
	const botData = objectsToRender[indexInQuestion];
	const battleLogEntries = [];
	let result = null;
	let mapToTest = [{type: 'head', index: 0}];
	// TODO: make sure that if a bot is being targetted from aim or scan results, that it is verified that their durability > 0 and that their location is the same...
	// on 2nd thought, targets should bge locations, not bots

	// nodeNumber = mapToTest[mapToTest.length-1].index+1
	// depthLevel = mapToTest.length
	
	
	if (testIsDestroyed(botData)) return {command: {name:'noneBotIsDestroyed'}}
	const nodeBlockInQuestion = getNodeArray(botData.script, mapToTest);
	battleLogEntries.push({type: 'testing-bot', name: botData.name})
	// Test is empty
	if (testNodeBlockIsEmpty(nodeBlockInQuestion)) {
		battleLogEntries.push({type: 'action-determined', content: `COMMAND TESTING FOR BOT ${botData.name} FAILED: AI IS EMPTY.  DEFAULTING TO WAITCOMMAND`});
		result = waitCommand;
	} else {
		for (let i = 0; i < botData.script.length; i++) {
			if (result) {
				break;
			} else {
				// Test is condition or command
				if (testNodeIsCondition(nodeBlockInQuestion[i])) {
					// Case : Condition.	Test if met or unmet, then set the map and dive deeper
					const conditionTestResult = conditionTest(nodeBlockInQuestion[i].condition, objectsToRender, indexInQuestion, levelInfo);
					if (!conditionTestResult) {
						// Case: Condition is not met, extend map to unMet branch
						battleLogEntries.push({type: 'test-fail', content: `CONDITION CRITERIA AT D${mapToTest.length} N${mapToTest[mapToTest.length-1].index+1}: ${nodeBlockInQuestion[i].condition.name.toUpperCase()} NOT MET`});
						mapToTest.push({type: 'conditionFalse', index: 0});
					} else {
						battleLogEntries.push({type: 'test-pass', content: `CONDITION CRITERIA AT D${mapToTest.length} N${mapToTest[mapToTest.length-1].index+1}: ${nodeBlockInQuestion[i].condition.name.toUpperCase()} MET`});
						mapToTest.push({type: 'conditionTrue', index: 0});
						// Case: Condition is met, extend map to met branch
					}
					// Begin new node testing given the new map
					let testResults = handleTestNewNodeDepth(objectsToRender, indexInQuestion, mapToTest, battleLogEntries, levelInfo);
					result = testResults.result;
					mapToTest = testResults.mapToTest;
				} else {
					// Case : Command.  Test if command can be executed
					let testResults = handleCommandCandidacy(nodeBlockInQuestion[i].command, botData, mapToTest, battleLogEntries, objectsToRender, levelInfo, result);
					result = testResults.result;
					mapToTest = testResults.mapToTest;
				}
			}
		}
	}
	if (!result) {
		result = waitCommand;
		battleLogEntries.push({type: 'invalid', content: `COMMAND TESTING FOR BOT: ${botData.name} FAILED: DEPLETED AI BRANCHES WITHOUT FINDING A VALID COMMAND.  DEFAULTING TO WAITCOMMAND`});
	}
	return {command: result, battleLogEntries: battleLogEntries}
}

export default getNextCommand

function testIsDestroyed (botData) {
	return botData.attributes.CurrentDurability === 0 ? true : false
}
function testNodeBlockIsEmpty (nodeBlock) {
	return nodeBlock.length > 0 ? false : true
}
function testNodeIsCondition (nodeBlock) {
	return Object.keys(nodeBlock)[0] === 'condition' ? true : false
}
function handleCommandCandidacy (nodeBlockInQuestion, botData, mapToTest, battleLogEntries, objectsToRender, levelInfo) {
	// console.log('candicacy of Command:', nodeBlockInQuestion.name, 'being tested');
	let result = null;
	const botKnowsCommand = botKnowsCommandTest(nodeBlockInQuestion.name, botData);
	if (botKnowsCommand) {
		const invalidInstructionsTest = testInvalidInstructions(nodeBlockInQuestion, botData, objectsToRender, levelInfo);
		if (invalidInstructionsTest) {
			mapToTest.pop();
			battleLogEntries.push({type: 'invalid', content: invalidInstructionsTest});
		} else {
			const insufficientEnergyTest = calculateCommandCost(nodeBlockInQuestion, botData) > botData.attributes.CurrentCapacitor;
			if (insufficientEnergyTest) {
				// nodeBlockInQuestion.test.commandName
				// battleLogEntries.push({type: 'invalid', content: insufficientEnergyTest});
				battleLogEntries.push({type: 'invalid', content: `INSUFFICIENT ENERGY AVAILABLE IN CAPACITOR TO EXECUTE ${nodeBlockInQuestion.name.toUpperCase()}`});
				mapToTest.pop();
			} else {
				battleLogEntries.push({type: 'action-determined', content: `COMMAND TESTING FOR BOT ${botData.name} RESULTS IN ${nodeBlockInQuestion.name.toUpperCase()}`});
				result = nodeBlockInQuestion;
			}
		}
	} else {
		mapToTest.pop();
		battleLogEntries.push({type: 'invalid', content: `AI ERROR: BOT ${botData.name} DOES NOT KNOW COMMAND ${nodeBlockInQuestion.name.toUpperCase()}`});
	}
	return {result: result, mapToTest: mapToTest}
}
function botKnowsCommandTest (commandName, botInfo) {
	if (botInfo.attributes[commandName] !== true && botInfo.attributes[commandName] !== false) {
		console.log('Error acquiring command known test information');
		return false
	} else {
		return botInfo.attributes[commandName]
	}
}
function noWeaponEquipped (supposedWeaponName, commandName, armSlot) {
	return supposedWeaponName ? false : `CONDITIONS TO EXECUTE COMMAND ${commandName.toUpperCase()} MET, BUT NO WEAPON IS EQUIPPED IN ${armSlot.toUpperCase()}`
}
function notRangedWeapon (supposedRangedWeapon, commandName, armSlot) {
	return weaponStats[supposedRangedWeapon].superTypes[0] === 'Ranged' ? false : `CONDITIONS TO EXECUTE COMMAND ${commandName.toUpperCase()} MET, BUT ${weaponStats[supposedRangedWeapon].name.toUpperCase()} EQUIPPED IN ${armSlot.toUpperCase()} IS NOT A RANGED WEAPON`
}
function notMeleedWeapon (supposedMeleeWeapon, commandName, armSlot) {
	return weaponStats[supposedMeleeWeapon].superTypes[0] === 'Melee' ? false : `CONDITIONS TO EXECUTE COMMAND ${commandName.toUpperCase()} MET, BUT ${weaponStats[supposedMeleeWeapon].name.toUpperCase()} EQUIPPED IN ${armSlot.toUpperCase()} IS NOT A MELEE WEAPON`
}
function invalidRangedWeaponTest (commandNode, botInfo) {
	const armSlot = commandNode.instructions.weapon;
	const weaponName = botInfo.equipment[armSlot];
	const weaponEquippedTest = noWeaponEquipped(weaponName, commandNode.name, armSlot);
	if (weaponEquippedTest) return weaponEquippedTest;
	const rangedWeaponTest = notRangedWeapon(weaponName, commandNode.name, armSlot);
	return rangedWeaponTest ? rangedWeaponTest : false;
}
function invalidMeleeWeaponTest (commandNode, botInfo) {
	const armSlot = commandNode.instructions.weapon;
	const weaponName = botInfo.equipment[armSlot];
	const weaponEquippedTest = noWeaponEquipped(weaponName, commandNode.name, armSlot);
	if (weaponEquippedTest) return weaponEquippedTest;
	const meleeWeaponTest = notMeleedWeapon(weaponName, commandNode.name, armSlot);
	return meleeWeaponTest ? meleeWeaponTest : false;
}
function weaponNotLoadedTest (commandNode, botInfo) {
	const armSlot = commandNode.instructions.weapon;
	const weaponName = botInfo.equipment[armSlot];
	return botInfo[`${armSlot}LoadTime`] === 0 ? false : `CONDITIONS TO EXECUTE COMMAND ${commandNode.name.toUpperCase()} MET, BUT ${weaponStats[weaponName].name.toUpperCase()} EQUIPPED IN ${armSlot.toUpperCase()} IS STILL RELOADING`
}
function weaponNotOfTypeEnergyTest (commandNode, botInfo) {
	const armSlot = commandNode.instructions.weapon;
	const weaponName = botInfo.equipment[armSlot];
	const weaponSubTypes = weaponStats[weaponName].subTypes;
	for(let i = 0; i < weaponSubTypes.length; i++) {
		if (weaponSubTypes[i] === 'Energy') return false
	}
	return `CONDITIONS TO EXECUTE COMMAND ${commandNode.name.toUpperCase()} MET, BUT ${weaponStats[weaponName].name.toUpperCase()} EQUIPPED IN ${armSlot.toUpperCase()} IS NOT OF TYPE ENERGY`;
}
function testInvalidInstructions (commandNode, botInfo, objectsToRender, levelInfo) {
	const commandName = commandNode.name;
	switch (commandName) {
		case 'aimCommand' : {
			return invalidRangedWeaponTest(commandNode, botInfo)
		}
		case 'aimAndAttackCommand' : {
			const invalidRangedWeapon = invalidRangedWeaponTest(commandNode, botInfo);
			if (invalidRangedWeapon) return invalidRangedWeapon;
			const weaponNotLoaded = weaponNotLoadedTest(commandNode, botInfo);
			if (weaponNotLoaded) return weaponNotLoaded;

			if (commandNode.instructions.targetting) {
				if (!botInfo.scanHostileResults[commandNode.instructions.targetNumber-1]) {
					return `CONDITIONS TO EXECUTE COMMAND ${commandName.toUpperCase()} MET, BUT TARGET NUMBER ${commandNode.instructions.targetNumber} WAS NOT IN SCAN RESULTS`
				} else {
					return false
				}
			} else {
				return false
			}			
		}
		case 'chargeCommand' : {
			// 1. check valid melee
			// 2. check loaded
			// 3. check target number exists
			// 4. check target's closest adjacent space is within bot's moveDistance
			// 5. check to make sure path is not obstructed
			const meleeWeaponInvalid = invalidMeleeWeaponTest(commandNode, botInfo);
			if (meleeWeaponInvalid) return meleeWeaponInvalid;
			const weaponNotLoaded = weaponNotLoadedTest(commandNode, botInfo);
			if (weaponNotLoaded) return weaponNotLoaded;
			if (!botInfo.scanHostileResults[commandNode.instructions.targetNumber-1]) return `CONDITIONS TO EXECUTE COMMAND ${commandName.toUpperCase()} MET, BUT TARGET NUMBER ${commandNode.instructions.targetNumber} WAS NOT IN SCAN RESULTS`;
			const path = pathToAdjacentCell(botInfo.location, botInfo.scanHostileResults[commandNode.instructions.targetNumber-1].location);
			if (path.length === 0) return `CONDITIONS TO EXECUTE COMMAND ${commandName.toUpperCase()} MET, BUT TARGET NUMBER ${commandNode.instructions.targetNumber} IS ALREADY ADJACENT`;
			if (path.length > botInfo.attributes.MovementDistance) return `CONDITIONS TO EXECUTE COMMAND ${commandName.toUpperCase()} MET, BUT TARGET NUMBER ${commandNode.instructions.targetNumber} WAS NOT WITHIN MOVEMENT DISTANCE`;
			let currentLandingSpot = {...botInfo.location};
			let pathObstructed = false;
			let nextStep;
			path.forEach((move)=>{
				if (!pathObstructed) {
					nextStep = nextStepGenerator(currentLandingSpot, move);
					pathObstructed = collisionVerification(nextStep, objectsToRender, levelInfo.height, levelInfo.width)
					if (!pathObstructed) {
						currentLandingSpot = nextStep;
					}
				}
			})
			return !pathObstructed ? false : `CONDITIONS TO EXECUTE COMMAND ${commandName.toUpperCase()} MET, BUT SOMETHING IS BETWEEN EXECUTOR AND TARGET NUMBER ${commandNode.instructions.targetNumber}`;
		}
		case 'counterCommand' : {
			const meleeWeaponInvalid = invalidMeleeWeaponTest(commandNode, botInfo);
			if (meleeWeaponInvalid) return meleeWeaponInvalid;
			return weaponNotLoadedTest(commandNode, botInfo);
		}
		case 'elevenAttackCommand' : {
			if (commandNode.instructions.attackType === 'ranged') {
				const invalidRangedWeapon = invalidRangedWeaponTest(commandNode, botInfo);
				if (invalidRangedWeapon) return invalidRangedWeapon;
			} else {
				const meleeWeaponInvalid = invalidMeleeWeaponTest(commandNode, botInfo);
				if (meleeWeaponInvalid) return meleeWeaponInvalid;
			}
			const weaponNotLoaded = weaponNotLoadedTest(commandNode, botInfo);
			if (weaponNotLoaded) return weaponNotLoaded;
			const weaponNotOfTypeEnergy = weaponNotOfTypeEnergyTest(commandNode, botInfo);
			if (weaponNotOfTypeEnergy) return weaponNotOfTypeEnergy;
			if (!commandNode.instructions.targetting) {
				if (commandNode.instructions.attackType === 'ranged') {
					if (!botInfo.scanHostileResults[commandNode.instructions.targetNumber-1]) {
						return `CONDITIONS TO EXECUTE COMMAND ${commandName.toUpperCase()} MET, BUT TARGET NUMBER ${commandNode.instructions.targetNumber} WAS NOT IN SCAN RESULTS`
					} else {
						return false
					}
				} else {
					if (!botInfo.scanHostileResults[commandNode.instructions.targetNumber-1]) {
						return `CONDITIONS TO EXECUTE COMMAND ${commandName.toUpperCase()} MET, BUT TARGET NUMBER ${commandNode.instructions.targetNumber} WAS NOT IN SCAN RESULTS`
					} else {
						if (distanceToAdjacentToCell(botInfo.location, botInfo.scanHostileResults[commandNode.instructions.targetNumber-1].location) === 0) {
							return false
						} else {
							return `CONDITIONS TO EXECUTE COMMAND ${commandName.toUpperCase()} MET, BUT TARGET NUMBER ${commandNode.instructions.targetNumber} IS NOT ADJACENT`
						}
					}
				}
			} else return false
		}
		case 'guardCommand' : return false;
		case 'meleeAttackCommand' : {
			const meleeWeaponInvalid = invalidMeleeWeaponTest(commandNode, botInfo);
			if (meleeWeaponInvalid) return meleeWeaponInvalid;
			const weaponNotLoaded = weaponNotLoadedTest(commandNode, botInfo);
			if (weaponNotLoaded) return weaponNotLoaded;

			if (commandNode.instructions.targetting) {
				if (!botInfo.scanHostileResults[commandNode.instructions.targetNumber-1]) {
					return `CONDITIONS TO EXECUTE COMMAND ${commandName.toUpperCase()} MET, BUT TARGET NUMBER ${commandNode.instructions.targetNumber} WAS NOT IN SCAN RESULTS`
				} else {
					if (distanceToAdjacentToCell(botInfo.location, botInfo.scanHostileResults[commandNode.instructions.targetNumber-1].location) === 0) {
						return false
					} else {
						return `CONDITIONS TO EXECUTE COMMAND ${commandName.toUpperCase()} MET, BUT TARGET NUMBER ${commandNode.instructions.targetNumber} IS NOT ADJACENT`
					}
				}
			} else {
				return false
			}
		}
		case 'moveCommand' : {
			// moveCommand will instructions will not be invalid if more movements are instructed than the bot has move distance.
			// similarly, if the distance to move adjacent to or onto a target exceeds the bot's movement distance, this is still not invalid.
			// in these cases, the bot will move as far as it can travel
			// moveCommand instructions will only be invalid if the isntructions are targetting and there is no target number n
			if (!commandNode.instructions.targetting) return false
			if (commandNode.instructions.targetType === 'hostile') {
				if (!botInfo.scanHostileResults[commandNode.instructions.targetNumber-1]) {
					return `CONDITIONS TO EXECUTE COMMAND ${commandName.toUpperCase()} MET, BUT TARGET NUMBER ${commandNode.instructions.targetNumber} WAS NOT IN SCAN RESULTS`
				} else {
					return false
				}
			} else if (commandNode.instructions.targetType === 'friend') {
				if (!botInfo.scanFriendResults[commandNode.instructions.targetNumber-1]) {
					return `CONDITIONS TO EXECUTE COMMAND ${commandName.toUpperCase()} MET, BUT TARGET NUMBER ${commandNode.instructions.targetNumber} WAS NOT IN FRIEND SCAN RESULTS`
				} else {
					return false
				}
			} else {
				console.log('error acquiring targetType of moveCommand instructions');
				return false
			}
			
		}
		case 'rangedAttackCommand' : {
			const invalidRangedWeapon = invalidRangedWeaponTest(commandNode, botInfo);
			if (invalidRangedWeapon) return invalidRangedWeapon;
			return weaponNotLoadedTest(commandNode, botInfo);
		}
		case 'rechargeCommand' : return false
		case 'redirectCommand' : return false;
		case 'repairCommand' : return false;
		case 'scanCommand' : return false;
		case 'switchCommand' : {
			let noneCount = 0;
			for (let i = 1; i <=5; i++) {
				if (commandNode.instructions[i] === 'NONE') noneCount ++;
			}
			return noneCount !== 5 ? false : `CONDITIONS TO EXECUTE COMMAND ${commandNode.name.toUpperCase()} MET, BUT ALL SWITCHES ARE SET TO NOT CHANGE`
		}
		case 'waitCommand' : return false;
		default: {
			let error = `Unknown command name: ${commandName} inside invalid instructions test`;
			console.log(error)
			return error
		}
	}
}

function calculateCommandCost (commandNode, botInfo) {
	const commandName = commandNode.name;
	switch (commandName) {
		case 'aimCommand' : {
			const armSlot = commandNode.instructions.weapon;
			const weaponName = botInfo.equipment[armSlot];
			const baseAimCost = weaponStats[weaponName].aimCost;
			const totalCost = baseAimCost + botInfo.attributes.aimCostModifier;
			return totalCost
		}
		case 'aimAndAttackCommand' : {
			const armSlot = commandNode.instructions.weapon;
			const weaponName = botInfo.equipment[armSlot];
			const baseAimCost = weaponStats[weaponName].aimCost;
			const totalAimCost = baseAimCost + botInfo.attributes.aimCostModifier;
			const baseAttackCost = weaponStats[weaponName].attackCost;
			const totalAttackCost = baseAttackCost + botInfo.attributes.attackCostModifier;
			const totalCost = totalAimCost + totalAttackCost;
			return totalCost
		}
		case 'chargeCommand' : {
			const armSlot = commandNode.instructions.weapon;
			const weaponName = botInfo.equipment[armSlot];
			const moveCost = botInfo.attributes.MovementCost;
			const baseAttackCost = weaponStats[weaponName].attackCost;
			const totalAttackCost = baseAttackCost + botInfo.attributes.attackCostModifier;
			const totalCost = moveCost + totalAttackCost;
			return totalCost
		}
		case 'counterCommand' : {
			const armSlot = commandNode.instructions.weapon;
			const weaponName = botInfo.equipment[armSlot];
			const baseAttackCost = weaponStats[weaponName].attackCost;
			const totalCost = baseAttackCost + botInfo.attributes.attackCostModifier;
			return totalCost
		}
		case 'elevenAttackCommand' : {
			const armSlot = commandNode.instructions.weapon;
			const weaponName = botInfo.equipment[armSlot];
			const baseAttackCost = weaponStats[weaponName].attackCost;
			const nonElevenTotalCost = baseAttackCost + botInfo.attributes.attackCostModifier;
			const totalCost = 2 * nonElevenTotalCost;
			return totalCost
		}
		case 'guardCommand' : return botInfo.attributes.CurrentCapacitor >= commandDetails[commandName].cost ? false : true;
		case 'meleeAttackCommand' : {
			const armSlot = commandNode.instructions.weapon;
			const weaponName = botInfo.equipment[armSlot];
			const baseAttackCost = weaponStats[weaponName].attackCost;
			const totalCost = baseAttackCost + botInfo.attributes.attackCostModifier;
			return totalCost
		}
		case 'moveCommand' : return botInfo.attributes.CurrentCapacitor >= botInfo.attributes.MovementCost ? false : true;
		case 'rangedAttackCommand' : {
			const armSlot = commandNode.instructions.weapon;
			const weaponName = botInfo.equipment[armSlot];
			const baseAttackCost = weaponStats[weaponName].attackCost;
			const totalCost = baseAttackCost + botInfo.attributes.attackCostModifier;
			return totalCost
		}
		case 'rechargeCommand' : return 0
		case 'redirectCommand' : return commandDetails[commandName].cost
		case 'repairCommand' : return commandDetails[commandName].cost
		case 'scanCommand' : return botInfo.attributes.ScanCost
		case 'switchCommand' : return 0
		case 'waitCommand' : return 0
		default: {
			console.log(`Unknown command name: ${commandName} inside calculate energy cost function`);
			return 255
		}
	}
}

function testCellForBotTypeX (objectsToRender, testLocation, botData, botType) {
	for(let i = 0; i < objectsToRender.length; i++) {
		if (testSameCell(objectsToRender[i].location, testLocation)) {
			if (botType === 'hostile') {
				if (objectsToRender[i].team !== botData.team) return true
			} else {
				if (objectsToRender[i].team === botData.team) return true
			}
		}
	}
	return false
}
function evaluateLength (arrayLength, nodeBlockInQuestion) {
	if (nodeBlockInQuestion.test.evaluationType === '>') {
		return arrayLength > nodeBlockInQuestion.test.threshold ? true : false
	} else if (nodeBlockInQuestion.test.evaluationType === '<') {
		return arrayLength < nodeBlockInQuestion.test.threshold ? true : false
	} else if (nodeBlockInQuestion.test.evaluationType === '=') {
		return arrayLength === nodeBlockInQuestion.test.threshold ? true : false
	} else if (nodeBlockInQuestion.test.evaluationType === '≠') {
		return arrayLength !== nodeBlockInQuestion.test.threshold ? true : false
	} else {
		console.log('error determining evaluationType in scanResults test');
		return false
	}
}
function conditionTest (nodeBlockInQuestion, objectsToRender, indexInQuestion, levelInfo) {
	// This function will return true if the conditions are met, and false otherwise.

	const botData = objectsToRender[indexInQuestion];
	const conditionName = nodeBlockInQuestion.name;
	switch (conditionName) {
		case 'adjacentTo' : {
			if (nodeBlockInQuestion.test.testReturn !== 'any') {
				const testLocation = nextStepGenerator(botData.location, nodeBlockInQuestion.test.testReturn);
				if (nodeBlockInQuestion.test.evaluationType === '=') {
					if (nodeBlockInQuestion.test.testTargets === 'hostile') {
						if (testCellForBotTypeX(objectsToRender, testLocation, botData, 'hostile')) return true
					} else if (nodeBlockInQuestion.test.testTargets === 'friend') {
						if (testCellForBotTypeX(objectsToRender, testLocation, botData, 'friend')) return true
					} else if (nodeBlockInQuestion.test.testTargets === 'wall') {
						if (!verifyCellIsInBounds(testLocation, levelInfo.height, levelInfo.width)) return true
					} else if (nodeBlockInQuestion.test.testTargets === 'corner') {
						if (verifyCellIsOnCorner(testLocation, levelInfo.height, levelInfo.width)) return true
					} else if (nodeBlockInQuestion.test.testTargets === 'any') {
						if ( testCellForBotTypeX(objectsToRender, testLocation, botData, 'hostile') ||
						testCellForBotTypeX(objectsToRender, testLocation, botData, 'friend') ||
						!verifyCellIsInBounds(testLocation, levelInfo.height, levelInfo.width) ||
						verifyCellIsOnCorner(testLocation, levelInfo.height, levelInfo.width)
						) return true
					}
				} else {
					if (nodeBlockInQuestion.test.testTargets === 'hostile') {
						if (testCellForBotTypeX(objectsToRender, testLocation, botData, 'friend') ||
						!verifyCellIsInBounds(testLocation, levelInfo.height, levelInfo.width) ||
						verifyCellIsOnCorner(testLocation, levelInfo.height, levelInfo.width)
						) return true
					} else if (nodeBlockInQuestion.test.testTargets === 'friend') {
						if ( testCellForBotTypeX(objectsToRender, testLocation, botData, 'hostile') ||
						!verifyCellIsInBounds(testLocation, levelInfo.height, levelInfo.width) ||
						verifyCellIsOnCorner(testLocation, levelInfo.height, levelInfo.width)
						) return true
					} else if (nodeBlockInQuestion.test.testTargets === 'wall') {
						if ( testCellForBotTypeX(objectsToRender, testLocation, botData, 'hostile') ||
						testCellForBotTypeX(objectsToRender, testLocation, botData, 'friend') ||
						verifyCellIsOnCorner(testLocation, levelInfo.height, levelInfo.width)
						) return true
					} else if (nodeBlockInQuestion.test.testTargets === 'corner') {
						if ( testCellForBotTypeX(objectsToRender, testLocation, botData, 'hostile') ||
						testCellForBotTypeX(objectsToRender, testLocation, botData, 'friend') ||
						!verifyCellIsInBounds(testLocation, levelInfo.height, levelInfo.width)
						) return true
					} else if (nodeBlockInQuestion.test.testTargets === 'any') {
						// Honestly the logic of this test confused me
						// These test settings want to find if a given direction does not contain anything
						// Hence it must be the case that it does not find a hostile, friend, wall nor corner
						if ( !testCellForBotTypeX(objectsToRender, testLocation, botData, 'hostile') &&
						!testCellForBotTypeX(objectsToRender, testLocation, botData, 'friend') &&
						verifyCellIsInBounds(testLocation, levelInfo.height, levelInfo.width) &&
						!verifyCellIsOnCorner(testLocation, levelInfo.height, levelInfo.width)
						) return true
					}
				}
			} else {
				// Case: test every direction
				let criteriaMet = false;
				allDirections.forEach((direction)=>{
					if (!criteriaMet) {
						const testLocation = nextStepGenerator(botData.location, direction);
						if (nodeBlockInQuestion.test.evaluationType === '=') {
							if (nodeBlockInQuestion.test.testTargets === 'hostile') {
								if (testCellForBotTypeX(objectsToRender, testLocation, botData, 'hostile')) criteriaMet = true
							} else if (nodeBlockInQuestion.test.testTargets === 'friend') {
								if (testCellForBotTypeX(objectsToRender, testLocation, botData, 'friend')) criteriaMet = true
							} else if (nodeBlockInQuestion.test.testTargets === 'wall') {
								if (!verifyCellIsInBounds(testLocation, levelInfo.height, levelInfo.width)) criteriaMet = true
							} else if (nodeBlockInQuestion.test.testTargets === 'corner') {
								if (verifyCellIsOnCorner(testLocation, levelInfo.height, levelInfo.width)) criteriaMet = true
							} else if (nodeBlockInQuestion.test.testTargets === 'any') {
								if ( testCellForBotTypeX(objectsToRender, testLocation, botData, 'hostile') ||
								testCellForBotTypeX(objectsToRender, testLocation, botData, 'friend') ||
								!verifyCellIsInBounds(testLocation, levelInfo.height, levelInfo.width) ||
								verifyCellIsOnCorner(testLocation, levelInfo.height, levelInfo.width)
								) criteriaMet = true
							}
						} else {
							if (nodeBlockInQuestion.test.testTargets === 'hostile') {
								if (testCellForBotTypeX(objectsToRender, testLocation, botData, 'friend') ||
								!verifyCellIsInBounds(testLocation, levelInfo.height, levelInfo.width) ||
								verifyCellIsOnCorner(testLocation, levelInfo.height, levelInfo.width)
								) criteriaMet = true
							} else if (nodeBlockInQuestion.test.testTargets === 'friend') {
								if ( testCellForBotTypeX(objectsToRender, testLocation, botData, 'hostile') ||
								!verifyCellIsInBounds(testLocation, levelInfo.height, levelInfo.width) ||
								verifyCellIsOnCorner(testLocation, levelInfo.height, levelInfo.width)
								) criteriaMet = true
							} else if (nodeBlockInQuestion.test.testTargets === 'wall') {
								if ( testCellForBotTypeX(objectsToRender, testLocation, botData, 'hostile') ||
								testCellForBotTypeX(objectsToRender, testLocation, botData, 'friend') ||
								verifyCellIsOnCorner(testLocation, levelInfo.height, levelInfo.width)
								) criteriaMet = true
							} else if (nodeBlockInQuestion.test.testTargets === 'corner') {
								if ( testCellForBotTypeX(objectsToRender, testLocation, botData, 'hostile') ||
								testCellForBotTypeX(objectsToRender, testLocation, botData, 'friend') ||
								!verifyCellIsInBounds(testLocation, levelInfo.height, levelInfo.width)
								) criteriaMet = true
							} else if (nodeBlockInQuestion.test.testTargets === 'any') {
								// Honestly the logic of this test confused me
								// These test settings want to find if a given direction does not contain anything
								// Hence it must be the case that it does not find a hostile, friend, wall nor corner
								if ( !testCellForBotTypeX(objectsToRender, testLocation, botData, 'hostile') &&
								!testCellForBotTypeX(objectsToRender, testLocation, botData, 'friend') &&
								verifyCellIsInBounds(testLocation, levelInfo.height, levelInfo.width) &&
								!verifyCellIsOnCorner(testLocation, levelInfo.height, levelInfo.width)
								) criteriaMet = true
							}
						}
					}
				})
				return criteriaMet
			}
			return false
		}
		case 'aimResults' : {
			// bot.AimResults will be an array with one or zero elements.
			// if 0, return false
			// else test types against testTargets and targetEvaluation Type
			if (botData.aimResults.length === 0) return false
			else {
				// let lockedTarget = objectsToRender[botData.aimResults[0].index];
				// let onSameTeam = lockedTarget.team === botData.team;
				let onSameTeam = botData.aimResults[0].team === botData.team;
				if (nodeBlockInQuestion.test.targetEvaluationType === '=') {
					if (nodeBlockInQuestion.test.testTargets === 'hostile') {
						return onSameTeam ? false : true;
					} else return onSameTeam ? true : false;
				} else {
					if (nodeBlockInQuestion.test.testTargets === 'hostile') {
						return onSameTeam ? true : false;
					} else return onSameTeam ? false : true;
				}
			}
		}
		case 'attribute' : {
			let botAttributeInQuestion = null;
			if (nodeBlockInQuestion.test.testTargets === 'durability') {
				botAttributeInQuestion = botData.attributes.CurrentDurability;
			} else if (nodeBlockInQuestion.test.testTargets === 'capacitor') {
				botAttributeInQuestion = botData.attributes.CurrentCapacitor;
			} else {
				console.log('error acquiring current Attribute type in attribute test');
				return nodeBlockInQuestion.test.evaluationType === '≠' ? true : false
			}
			if (typeof(botAttributeInQuestion) !== 'number') {
				console.log('error acquiring current Attribute value in attribute test');
				return nodeBlockInQuestion.test.evaluationType === '≠' ? true : false
			} else {
				if (nodeBlockInQuestion.test.evaluationType === '>') {
					return botAttributeInQuestion > nodeBlockInQuestion.test.threshold ? true : false
				} else if (nodeBlockInQuestion.test.evaluationType === '<') {
					return botAttributeInQuestion < nodeBlockInQuestion.test.threshold ? true : false
				} else if (nodeBlockInQuestion.test.evaluationType === '=') {
					return botAttributeInQuestion === nodeBlockInQuestion.test.threshold ? true : false
				} else if (nodeBlockInQuestion.test.evaluationType === '≠') {
					return botAttributeInQuestion !== nodeBlockInQuestion.test.threshold ? true : false
				} else {
					console.log('error determining evaluationType in attribute test');
					return false
				}
			}
		}
		case 'consecutiveAims' : {
			if (nodeBlockInQuestion.test.evaluationType === '>') {
				return botData.consecutiveAims > nodeBlockInQuestion.test.threshold ? true : false
			} else if (nodeBlockInQuestion.test.evaluationType === '<') {
				return botData.consecutiveAims < nodeBlockInQuestion.test.threshold ? true : false
			} else if (nodeBlockInQuestion.test.evaluationType === '=') {
				return botData.consecutiveAims === nodeBlockInQuestion.test.threshold ? true : false
			} else if (nodeBlockInQuestion.test.evaluationType === '≠') {
				return botData.consecutiveAims !== nodeBlockInQuestion.test.threshold ? true : false
			} else {
				console.log('error determining evaluationType in consecutiveAims test');
				return false
			}
		}
		case 'damageTaken' : {
			if (nodeBlockInQuestion.test.evaluationType === '>') {
				return botData.damageTakenPreviousTick > nodeBlockInQuestion.test.threshold ? true : false
			} else if (nodeBlockInQuestion.test.evaluationType === '<') {
				return botData.damageTakenPreviousTick < nodeBlockInQuestion.test.threshold ? true : false
			} else if (nodeBlockInQuestion.test.evaluationType === '=') {
				return botData.damageTakenPreviousTick === nodeBlockInQuestion.test.threshold ? true : false
			} else if (nodeBlockInQuestion.test.evaluationType === '≠') {
				return botData.damageTakenPreviousTick !== nodeBlockInQuestion.test.threshold ? true : false
			} else {
				console.log('error determining evaluationType in damageTaken test');
				return false
			}
		}
		case 'distanceToTarget' : {
			let targetInQuestion = null;
			if (nodeBlockInQuestion.test.testTargets === 'hostile') {
				targetInQuestion = botData.scanHostileResults[nodeBlockInQuestion.test.targetNumber-1];
			} else if (nodeBlockInQuestion.test.testTargets === 'wall') {
				targetInQuestion = botData.scanWallResults[nodeBlockInQuestion.test.targetNumber-1];
			} else if (nodeBlockInQuestion.test.testTargets === 'corner') {
				targetInQuestion = botData.scanCornerResults[nodeBlockInQuestion.test.targetNumber-1];
			} else if (nodeBlockInQuestion.test.testTargets === 'friend') {
				targetInQuestion = botData.scanFriendResults[nodeBlockInQuestion.test.targetNumber-1];
			} else {
				console.log('error obtaining testTargets in distanceToTarget test');
				return false
			}
			if (!targetInQuestion) {
				return nodeBlockInQuestion.test.evaluationType === '≠' ? true : false
			} else {
				const objectInQuestion = objectsToRender[targetInQuestion.index];
				if (!objectInQuestion) {
					console.log('error retrieving object info of scanned object in distanceToTarget test');
					return false
				} else {
					const determinedDistance = distanceToAdjacentToCell(botData.location, objectInQuestion.location);
					if (typeof(determinedDistance) !== 'number') {
						console.log('error retrieving distance to object in distanceToTarget test');
						return false
					} else {
						if (nodeBlockInQuestion.test.evaluationType === '>') {
							return determinedDistance > nodeBlockInQuestion.test.threshold ? true : false
						} else if (nodeBlockInQuestion.test.evaluationType === '<') {
							return determinedDistance < nodeBlockInQuestion.test.threshold ? true : false
						} else if (nodeBlockInQuestion.test.evaluationType === '=') {
							return determinedDistance === nodeBlockInQuestion.test.threshold ? true : false
						} else if (nodeBlockInQuestion.test.evaluationType === '≠') {
							return determinedDistance !== nodeBlockInQuestion.test.threshold ? true : false
						} else {
							console.log('error determining evaluationType in distanceToTarget test');
							return false
						}
					}
				}
			}
		}
		case 'obstructionToTarget' : {
			// returns false if no target is found - since there is no obstruction
			if (nodeBlockInQuestion.test.testTargets === 'hostile') {
				const targetInQuestion = botData.scanHostileResults[nodeBlockInQuestion.test.targetNumber-1];
				return !targetInQuestion ? false : isPathAdjacentToObstructed(botData.location, targetInQuestion.location, objectsToRender, levelInfo);
			} else if (nodeBlockInQuestion.test.testTargets === 'wall') {
				const targetInQuestion = botData.scanWallResults[nodeBlockInQuestion.test.targetNumber-1];
				return !targetInQuestion ? false : isPathAdjacentToObstructed(botData.location, targetInQuestion.location, objectsToRender, levelInfo);
			} else if (nodeBlockInQuestion.test.testTargets === 'corner') {
				const targetInQuestion = botData.scanCornerResults[nodeBlockInQuestion.test.targetNumber-1];
				return !targetInQuestion ? false : isPathAdjacentToObstructed(botData.location, targetInQuestion.location, objectsToRender, levelInfo);
			} else if (nodeBlockInQuestion.test.testTargets === 'friend') {
				const targetInQuestion = botData.scanFriendResults[nodeBlockInQuestion.test.targetNumber-1];
				return !targetInQuestion ? false : isPathAdjacentToObstructed(botData.location, targetInQuestion.location, objectsToRender, levelInfo);
			} else {
				console.log('error obtaining testTargets in obstructionToTarget test');
				return false
			}
		}
		case 'previousCommand' : {
			if (!botData.previousCommand) {
				return false
			} else {
				if (botData.previousCommand.name !== nodeBlockInQuestion.test.commandName) {
					return false
				} else {
					if (!botData.previousCommand.instructions.weapon) {
						return true
					} else {
						return botData.previousCommand.instructions.weapon === nodeBlockInQuestion.test.armSlot ? true : false
					}
				}
			}
		}
		case 'scanResults' : {
			if (nodeBlockInQuestion.test.targetEvaluationType === '=') {
				// Case, looking for one type
				if (nodeBlockInQuestion.test.testTargets === 'hostile') {
					return evaluateLength(botData.scanHostileResults.length, nodeBlockInQuestion);
				} else if (nodeBlockInQuestion.test.testTargets === 'friend') {
					return evaluateLength(botData.scanFriendResults.length, nodeBlockInQuestion);
				} else if (nodeBlockInQuestion.test.testTargets === 'wall') {
					return evaluateLength(botData.scanWallResults.length, nodeBlockInQuestion);
				} else if (nodeBlockInQuestion.test.testTargets === 'corner') {
					return evaluateLength(botData.scanCornerResults.length, nodeBlockInQuestion);
				} else {
					console.log('error obtaining testTargets in scanResults test');
					return false
				}
			} else {
				// Case, finding sum of non-selected scan type
				if (nodeBlockInQuestion.test.testTargets === 'hostile') {
					return evaluateLength(botData.scanFriendResults.length + botData.scanWallResults.length + botData.scanCornerResults.length, nodeBlockInQuestion);
				} else if (nodeBlockInQuestion.test.testTargets === 'friend') {
					return evaluateLength(botData.scanHostileResults.length + botData.scanWallResults.length + botData.scanCornerResults.length, nodeBlockInQuestion);
				} else if (nodeBlockInQuestion.test.testTargets === 'wall') {
					return evaluateLength(botData.scanHostileResults.length + botData.scanFriendResults.length + botData.scanCornerResults.length, nodeBlockInQuestion);
				} else if (nodeBlockInQuestion.test.testTargets === 'corner') {
					return evaluateLength(botData.scanHostileResults.length + botData.scanFriendResults.length + botData.scanWallResults.length, nodeBlockInQuestion);
				} else {
					console.log('error obtaining testTargets in scanResults test');
					return false
				}
			}
		}
		case 'sufficientEnergy' : {
			return calculateCommandCost({name: nodeBlockInQuestion.test.commandName, instructions: {weapon: nodeBlockInQuestion.test.armSlot}}, botData) <= botData.attributes.CurrentCapacitor ? true : false
			// return !testInsufficientEnergy({name: nodeBlockInQuestion.test.commandName, instructions: {weapon: nodeBlockInQuestion.test.armSlot}}, botData)
		}
		case 'switch' : {
			return botData.switches[nodeBlockInQuestion.test.switchNumber]
		}
		case 'weaponLoaded' : {
			const armSlot = nodeBlockInQuestion.test.armSlot;
			const weaponName = botData.equipment[armSlot];
			if (!weaponName) {
				console.log('error acquiring weapon info in weaponLoaded test');
				return false
			} else {
				const turnsUntilLoaded = botData[`${armSlot}LoadTime`];
				if (nodeBlockInQuestion.test.evaluationType === '>') {
					return turnsUntilLoaded > nodeBlockInQuestion.test.threshold ? true : false
				} else if (nodeBlockInQuestion.test.evaluationType === '<') {
					return turnsUntilLoaded < nodeBlockInQuestion.test.threshold ? true : false
				} else if (nodeBlockInQuestion.test.evaluationType === '=') {
					return turnsUntilLoaded === nodeBlockInQuestion.test.threshold ? true : false
				} else if (nodeBlockInQuestion.test.evaluationType === '≠') {
					return turnsUntilLoaded !== nodeBlockInQuestion.test.threshold ? true : false
				} else {
					console.log('error determining evaluationType in distanceToTarget test');
					return false
				}
			}
		}
		default: {
			console.log(`Unknown condition name: ${conditionName} inside condition test`);
			return false
		}
	}
}

function handleTestNewNodeDepth (objectsToRender, indexInQuestion, mapToTest, battleLogEntries, levelInfo) {
	// This function will be a mirror of the head case, but will pop map if no command hits the result instead of setting it to waitCommand

	const botData = objectsToRender[indexInQuestion];
	const nodeBlockInQuestion = getNodeArray(botData.script, mapToTest);
	if (testNodeBlockIsEmpty(nodeBlockInQuestion)) {
		// if the block is empty then go back up a depth level and increment the index to be tested
		mapToTest.pop();
		mapToTest[mapToTest.length-1].index ++;
		battleLogEntries.push({type: 'empty', content: `CONDITION BRANCH EMPTY.  TESTING TO CONTINUE AT PREVIOUS DEPTH`});
		return {result: null, mapToTest: mapToTest}
	}
	let result = null;
	// for (let i = mapToTest[mapToTest.length-1].index; i < nodeBlockInQuestion.length; i++) {
	for (let i = 0; i < nodeBlockInQuestion.length; i++) {
		if (result) {
			break;
		} else {
			if (testNodeIsCondition(nodeBlockInQuestion[i])) {
				const conditionTestResult = conditionTest(nodeBlockInQuestion[i].condition, objectsToRender, indexInQuestion, levelInfo);
				if (!conditionTestResult) {
					battleLogEntries.push({type: 'test-fail', content: `CONDITION CRITERIA AT D${mapToTest.length} N${mapToTest[mapToTest.length-1].index+1}: ${nodeBlockInQuestion[i].condition.name.toUpperCase()} NOT MET`});
					mapToTest.push({type: 'conditionFalse', index: 0});
				} else {
					battleLogEntries.push({type: 'test-pass', content: `CONDITION CRITERIA AT D${mapToTest.length} N${mapToTest[mapToTest.length-1].index+1}: ${nodeBlockInQuestion[i].condition.name.toUpperCase()} MET`});
					mapToTest.push({type: 'conditionTrue', index: 0});
				}
				// result = handleTestNewNodeDepth(objectsToRender, indexInQuestion, mapToTest, battleLogEntries, levelInfo);
				let testResults = handleTestNewNodeDepth(objectsToRender, indexInQuestion, mapToTest, battleLogEntries, levelInfo);
				result = testResults.result;
				mapToTest = testResults.mapToTest;
			} else {
				// Case : Command.  Test if command can be executed
				// result = handleCommandCandidacy(nodeBlockInQuestion[i].command, botData, mapToTest, battleLogEntries, objectsToRender, levelInfo);
				let testResults = handleCommandCandidacy(nodeBlockInQuestion[i].command, botData, mapToTest, battleLogEntries, objectsToRender, levelInfo);
				result = testResults.result;
				mapToTest = testResults.mapToTest;
			}
		}
	}
	return {result: result, mapToTest: mapToTest}
}

// TODO: look for every case of scanResults, and fix it into hostiles, friends, wall, and corners