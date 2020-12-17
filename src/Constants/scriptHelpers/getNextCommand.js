import getNodeArray from './getNodeArray';
import commandDetails from '../../Constants/commandDetails';
import { weaponStats } from '../../Constants/equipment';
import { distanceToAdjacentToCell, pathToAdjacentCell, nextStepGenerator, collisionVerification } from '../../Constants/helperFunctions';

const waitCommand = {name: 'waitCommand', instructions: {}};

function getNextCommand (objectsToRender, indexInQuestion, levelInfo) {
	const botData = objectsToRender[indexInQuestion];
	const battleLogEntries = [];
	let result = null;
	const mapToTest = [{type: 'head', index: 0}];
	// let nodeTestNumber = 1;  	// This is the 1+index of mapToTest
	// let depthTestLevel = 1;		// This is mapToTest.length
	// if needed, consider adding these values to the battle log

	// TODO: Format battle log to easily color code message types
	
	if (testIsDestroyed(botData)) return {command: {name:'noneBotIsDestroyed'}}
	const nodeBlockInQuestion = getNodeArray(botData.script, mapToTest);

	// Test is empty
	if (testNodeBlockIsEmpty(nodeBlockInQuestion)) {
		battleLogEntries.push(`COMMAND TESTING FOR BOT ${botData.name} FAILED: AI IS EMPTY.  DEFAULTING TO WAITCOMMAND`);
		result = waitCommand;
	} else {
		for (let i = 0; i < botData.script.length; i++) {
			if (result) break;
			// Test is condition or command
			if (testNodeIsCondition(nodeBlockInQuestion)) {
				// Case : Condition.	Test if met or unmet, then set the map and dive deeper
				const conditionTestResult = conditionTest(nodeBlockInQuestion, objectsToRender, indexInQuestion, battleLogEntries);
				if (!conditionTestResult) {
					// Case: Condition is not met, extend map to unMet branch
					mapToTest.push({type: false, index: 0});
				} else {
					mapToTest.push({type: true, index: 0});
					// Case: Condition is met, extend map to met branch
				}
				// Begin new node testing given the new map
				handleTestNewNodeDepth(objectsToRender, indexInQuestion, mapToTest, battleLogEntries, result, levelInfo);
			} else {
				// Case : Command.  Test if command can be executed
				handleCommandCandidacy(nodeBlockInQuestion, botData, mapToTest, battleLogEntries, objectsToRender);
			}
		}
	}
	return {command: result, battleLogEntries: battleLogEntries}
}

export default getNextCommand

function testIsDestroyed (botData) {
	return botData.CurrentDurability === 0 ? true : false
}
function testNodeBlockIsEmpty (nodeBlock) {
	return nodeBlock ? false : true
}
function testNodeIsCondition (nodeBlock) {
	return Object.keys(nodeBlock)[0] === 'condition' ? true : false
}
function handleCommandCandidacy (nodeBlockInQuestion, botData, mapToTest, battleLogEntries, objectsToRender, levelInfo) {
	const invalidInstructionsTest = testInvalidInstructions(nodeBlockInQuestion, botData, objectsToRender, levelInfo);
	if (invalidInstructionsTest) {
		mapToTest[mapToTest.length-1].index ++;
		battleLogEntries.push(invalidInstructionsTest);
	} else {
		const insufficientEnergyTest = testInsufficientEnergy(nodeBlockInQuestion, botData);
		if (insufficientEnergyTest) {
			mapToTest[mapToTest.length-1].index ++;
			battleLogEntries.push(insufficientEnergyTest);
		} else {
			battleLogEntries.push(`COMMAND TESTING FOR BOT ${botData.name} RESULTS IN ${nodeBlockInQuestion.name.toUpperCase()}`);
			result = nodeBlockInQuestion;
		}
	}
}
function noWeaponEquipped (supposedWeaponName, commandName, armSlot) {
	return supposedWeaponName ? false : `CONDITIONS TO EXECUTE COMMAND ${commandName.toUpperCase()} MET, BUT NO WEAPON IS EQUIPPED IN ${armSlot.toUpperCase()}`
}
function notRangedWeapon (supposedRangedWeapon, commandName, armSlot) {
	weaponStats[supposedRangedWeapon].superTypes[0] === 'Ranged' ? false : `CONDITIONS TO EXECUTE COMMAND ${commandName.toUpperCase()} MET, BUT ${weaponStats[supposedRangedWeapon].name.toUpperCase()} EQUIPPED IN ${armSlot.toUpperCase()} IS NOT A RANGED WEAPON`
}
function notMeleedWeapon (supposedMeleeWeapon, commandName, armSlot) {
	weaponStats[supposedMeleeWeapon].superTypes[0] === 'Melee' ? false : `CONDITIONS TO EXECUTE COMMAND ${commandName.toUpperCase()} MET, BUT ${weaponStats[supposedMeleeWeapon].name.toUpperCase()} EQUIPPED IN ${armSlot.toUpperCase()} IS NOT A MELEE WEAPON`
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
	return botInfo[`${armSlot}LoadTime`] === 0 ? false : `CONDITIONS TO EXECUTE COMMAND ${commandNode.name.toUpperCase()} MET, BUT ${weaponStats[supposedRangedWeapon].name.toUpperCase()} EQUIPPED IN ${armSlot.toUpperCase()} IS STILL RELOADING`
}
function weaponNotOfTypeEnergyTest (commandNode, botInfo) {
	const armSlot = commandNode.instructions.weapon;
	const weaponName = botInfo.equipment[armSlot];
	const weaponSubTypes = weaponStats[weaponName].subTypes;
	for(let i = 0; i < weaponSubTypes.length; i++) {
		if (weaponSubTypes[i] === 'Energy') return false
	}
	return `CONDITIONS TO EXECUTE COMMAND ${commandNode.name.toUpperCase()} MET, BUT ${weaponStats[supposedRangedWeapon].name.toUpperCase()} EQUIPPED IN ${armSlot.toUpperCase()} IS NOT OF TYPE ENERGY`;
}
function testInvalidInstructions (commandNode, botInfo, objectsToRender, levelInfo) {
	// TODO: weapons must be loaded!!!!
	switch (commandNode.name) {
		case 'aimCommand' : {
			return invalidRangedWeaponTest(commandNode, botInfo)
		}
		case 'aimAndAttackCommand' : {
			const invalidRangedWeapon = invalidRangedWeaponTest(commandNode, botInfo);
			if (invalidRangedWeapon) return invalidRangedWeapon;
			const weaponNotLoaded = weaponNotLoadedTest(commandNode, botInfo);
			if (weaponNotLoaded) return weaponNotLoaded;

			if (commandNode.instructions.targetting) {
				if (!botInfo.scanResults[commandNode.instructions.targetNumber-1]) {
					return `CONDITIONS TO EXECUTE COMMAND ${commandName.toUpperCase()} MET, BUT TARGET NUMBER ${commandNode.instructions.targetNumber} WAS NOT IN SCAN RESULTS`
				} else {
					return false
				}
			} else {
				return false
			}			
		}
		case 'chargeCommand' : {
			// done 1. check valid melee
			// done 2. check loaded
			// done 3. check target number exists
			// done 4. check target's closest adjacent space is within bot's moveDistance
			// done 5. check to make sure path is not obstructed
			const meleeWeaponInvalid = invalidMeleeWeaponTest(commandNode, botInfo);
			if (meleeWeaponInvalid) return meleeWeaponInvalid;
			const weaponNotLoaded = weaponNotLoadedTest(commandNode, botInfo);
			if (weaponNotLoaded) return weaponNotLoaded;
			if (!botInfo.scanResults[commandNode.instructions.targetNumber-1]) return `CONDITIONS TO EXECUTE COMMAND ${commandName.toUpperCase()} MET, BUT TARGET NUMBER ${commandNode.instructions.targetNumber} WAS NOT IN SCAN RESULTS`;
			const path = pathToAdjacentCell(botInfo.location, botInfo.scanResults[commandNode.instructions.targetNumber-1].location);
			if (path.length === 0) return `CONDITIONS TO EXECUTE COMMAND ${commandName.toUpperCase()} MET, BUT TARGET NUMBER ${commandNode.instructions.targetNumber} IS ALREADY ADJACENT`;
			if (path.length > botInfo.attributes.MovementDistance) return `CONDITIONS TO EXECUTE COMMAND ${commandName.toUpperCase()} MET, BUT TARGET NUMBER ${commandNode.instructions.targetNumber} WAS NOT WITHIN MOVEMENT DISTANCE`;
			let currentLandingSpot = {...botData.location};
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
			return invalidMeleeWeaponTest(commandNode, botInfo)
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
					if (!botInfo.scanResults[commandNode.instructions.targetNumber-1]) {
						return `CONDITIONS TO EXECUTE COMMAND ${commandName.toUpperCase()} MET, BUT TARGET NUMBER ${commandNode.instructions.targetNumber} WAS NOT IN SCAN RESULTS`
					} else {
						return false
					}
				} else {
					if (!botInfo.scanResults[commandNode.instructions.targetNumber-1]) {
						return `CONDITIONS TO EXECUTE COMMAND ${commandName.toUpperCase()} MET, BUT TARGET NUMBER ${commandNode.instructions.targetNumber} WAS NOT IN SCAN RESULTS`
					} else {
						if (distanceToAdjacentToCell(botInfo.location, botInfo.scanResults[commandNode.instructions.targetNumber-1].location) === 0) {
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
				if (!botInfo.scanResults[commandNode.instructions.targetNumber-1]) {
					return `CONDITIONS TO EXECUTE COMMAND ${commandName.toUpperCase()} MET, BUT TARGET NUMBER ${commandNode.instructions.targetNumber} WAS NOT IN SCAN RESULTS`
				} else {
					if (distanceToAdjacentToCell(botInfo.location, botInfo.scanResults[commandNode.instructions.targetNumber-1].location) === 0) {
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
			if (!botInfo.scanResults[commandNode.instructions.targetNumber-1]) {
				return `CONDITIONS TO EXECUTE COMMAND ${commandName.toUpperCase()} MET, BUT TARGET NUMBER ${commandNode.instructions.targetNumber} WAS NOT IN SCAN RESULTS`
			} else {
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
function testInsufficientEnergy (commandNode, botInfo) {
	const commandName = commandNode.name;
	switch (commandName) {
		case 'aimCommand' : {
			const armSlot = commandNode.instructions.weapon;
			const weaponName = botInfo.equipment[armSlot];
			const baseAimCost = weaponStats[weaponName].aimCost;
			const totalCost = baseAimCost + botInfo.attributes.aimCostModifier;
			return botInfo.attributes.CurrentCapacitor >= totalCost ? false : true;
		}
		case 'aimAndAttackCommand' : {
			const armSlot = commandNode.instructions.weapon;
			const weaponName = botInfo.equipment[armSlot];
			const baseAimCost = weaponStats[weaponName].aimCost;
			const totalAimCost = baseAimCost + botInfo.attributes.aimCostModifier;
			const baseAttackCost = weaponStats[weaponName].attackCost;
			const totalAttackCost = baseAttackCost + botInfo.attributes.attackCostModifier;
			const totalCost = totalAimCost + totalAttackCost;
			return botInfo.attributes.CurrentCapacitor >= totalCost ? false : true;
		}
		case 'chargeCommand' : {
			const moveCost = botInfo.attributes.MovementCost;
			const baseAttackCost = weaponStats[weaponName].attackCost;
			const totalAttackCost = baseAttackCost + botInfo.attributes.attackCostModifier;
			const totalCost = moveCost + totalAttackCost;
			return botInfo.attributes.CurrentCapacitor >= totalCost ? false : true;
		}
		case 'counterCommand' : {
			const baseAttackCost = weaponStats[weaponName].attackCost;
			const totalCost = baseAttackCost + botInfo.attributes.attackCostModifier;
			return botInfo.attributes.CurrentCapacitor >= totalCost ? false : true;
		}
		case 'elevenAttackCommand' : {
			const baseAttackCost = weaponStats[weaponName].attackCost;
			const nonElevenTotalCost = baseAttackCost + botInfo.attributes.attackCostModifier;
			const totalCost = 2 * nonElevenTotalCost;
			return botInfo.attributes.CurrentCapacitor >= totalCost ? false : true;
		}
		case 'guardCommand' : return botInfo.attributes.CurrentCapacitor >= commandDetails[commandName].cost ? false : true;
		case 'meleeAttackCommand' : {
			const baseAttackCost = weaponStats[weaponName].attackCost;
			const totalCost = baseAttackCost + botInfo.attributes.attackCostModifier;
			return botInfo.attributes.CurrentCapacitor >= totalCost ? false : true;
		}
		case 'moveCommand' : return botInfo.attributes.CurrentCapacitor >= botInfo.attributes.MovementCost ? false : true;
		case 'rangedAttackCommand' : {
			const baseAttackCost = weaponStats[weaponName].attackCost;
			const totalCost = baseAttackCost + botInfo.attributes.attackCostModifier;
			return botInfo.attributes.CurrentCapacitor >= totalCost ? false : true;
		}
		case 'rechargeCommand' : return false
		case 'redirectCommand' : return botInfo.attributes.CurrentCapacitor >= commandDetails[commandName].cost ? false : true;
		case 'repairCommand' : return botInfo.attributes.CurrentCapacitor >= commandDetails[commandName].cost ? false : true;
		case 'scanCommand' : return botInfo.attributes.CurrentCapacitor >= botInfo.attributes.ScanCost ? false : true;
		case 'switchCommand' : return false
		case 'waitCommand' : return false
		default: {
			console.log(`Unknown command name: ${commandName} inside insufficient energy test`);
			return true
		}
	}
}

function conditionTest (nodeBlockInQuestion, objectsToRender, indexInQuestion, battleLogEntries) {
	// TODO: this function
	// This function will return true if the conditions are met, and false otherwise.
	// This function must add to the battleLogEntries whether the condition was or was not met
}

function handleTestNewNodeDepth (objectsToRender, indexInQuestion, mapToTest, battleLogEntries, result, levelInfo) {
	// This function will be a mirror of the head case, but will pop map if no command hits the result instead of setting it to waitCommand

	const botData = objectsToRender[indexInQuestion];
	const nodeBlockInQuestion = getNodeArray(botData.script, mapToTest);
	if (testNodeBlockIsEmpty(nodeBlockInQuestion)) {
		// if the block is empty then go back up a depth level and increment the index to be tested
		mapToTest.pop();
		mapToTest[mapToTest.length-1].index ++;
		battleLogEntries.push(`CONDITION BRANCH EMPTY.  TESTING TO CONTINUE AT PREVIOUS DEPTH`);
		return
	}
	for (let i = 0; i < nodeBlockInQuestion.length; i++) {
		if (result) break;
		if (testNodeIsCondition(nodeBlockInQuestion)) {
			const conditionTestResult = conditionTest(nodeBlockInQuestion, objectsToRender, indexInQuestion, battleLogEntries);
			if (!conditionTestResult) {
				mapToTest.push({type: false, index: 0});
			} else {
				mapToTest.push({type: true, index: 0});
			}
			handleTestNewNodeDepth(objectsToRender, indexInQuestion, mapToTest, battleLogEntries, result, levelInfo);
		} else {
			// Case : Command.  Test if command can be executed
			handleCommandCandidacy(nodeBlockInQuestion, botData, mapToTest, battleLogEntries, objectsToRender, levelInfo);
		}
	}
}