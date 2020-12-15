import getNodeArray from './getNodeArray';
import commandDetails from '../../Constants/commandDetails';
import { weaponStats } from '../../Constants/equipment';

const waitCommand = {name: 'waitCommand', instructions: {}};

function getNextCommand (objectsToRender, indexInQuestion) {
	const botData = objectsToRender[indexInQuestion];
	const battleLogEntries = [];
	// TODO: format and push battleLogEntries at each test step
	let result = null;
	let commandCandidate = null;
	// let nodeTestNumber = 1;  	// This is the 1+index of mapToTest
	// let depthTestLevel = 1;		// This is mapToTest.length
	const mapToTest = [{type: 'head', index: 0}]

	if (testIsDestroyed(botData)) return {command: {name:'noneBotIsDestroyed'}}

	for (let i = 0; i < botData.script.length; i++) {
		if (result) break;
		const nodeBlockInQuestion = getNodeArray(botData.script, mapToTest);
		// Test is empty
		if (testNodeBlockIsEmpty(nodeBlockInQuestion)) {
			battleLogEntries.push(`COMMAND TESTING FOR BOT ${botData.name} FAILED.  DEFAULTING TO WAITCOMMAND`);
			result = waitCommand;
		} else {
			// Test is condition or command
			if (testNodeIsCondition(nodeBlockInQuestion)) {
				// Case : Condition.	Test if met or unmet, then set the map and dive deeper

			} else {
				// Case : Command.  Test if command can be executed
				handleCommandCandidacy(nodeBlockInQuestion, botData, mapToTest, battleLogEntries);
			}
		}

		// if alive, proceed to other tests, else, set command to dead.

		// test if node/depth is a command
		// if command, test if legal and sufficient energy
		// let conditionResult = test(objectsToRender, indexInQuestion, depthTestLevel, nodeTestNumber)
		//  then if conditionResult is false, move to false branch.branch
		//  if conditionResult is true, move to true branch









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
function handleCommandCandidacy (nodeBlockInQuestion, botData, mapToTest, battleLogEntries) {
	const invalidInstructionsTest = testInvalidInstructions(nodeBlockInQuestion, botData);
	if (invalidInstructionsTest) {
		mapToTest[mapToTest.length-1].index ++;
		battleLogEntries.push(invalidInstructionsTest);
	} else {
		const insufficientEnergyTest = testInsufficientEnergy(nodeBlockInQuestion.name, botData);
		if (insufficientEnergyTest) {
			mapToTest[mapToTest.length-1].index ++;
			battleLogEntries.push(insufficientEnergyTest);
		} else {
			battleLogEntries.push(`COMMAND TESTING FOR BOT ${botData.name} RESULTS IN ${nodeBlockInQuestion.name.toUpperCase()}`);
			result = nodeBlockInQuestion;
		}
	}
	if (testInvalidInstructions(nodeBlockInQuestion, botData)) {
		// add to battleLog attempted commandName invalid instructions
		mapToTest[mapToTest.length-1].index ++;
	} else if (testInsufficientEnergy(nodeBlockInQuestion.name, botData)) {
		// add to battleLog attempted commandName insufficient energy
		mapToTest[mapToTest.length-1].index ++;
	} else {
		// add botName registered commandName
		result = nodeBlockInQuestion;
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
function testInvalidInstructions (commandNode, botInfo) {
	switch (commandNode.name) {
		case 'aimCommand' : {
			const armSlot = commandNode.instructions.weapon;
			const weaponName = botInfo.equipment[armSlot];
			const weaponEquippedTest = noWeaponEquipped(weaponName, commandNode.name, armSlot);
			if (weaponEquippedTest) return weaponEquippedTest;
			const rangedWeaponTest = notRangedWeapon(weaponName, commandNode.name, armSlot);
			return rangedWeaponTest ? rangedWeaponTest : false;
		}
		case 'aimAndAttackCommand' : {
			
			
		}
		case 'chargeCommand' : {
			
			
		}
		case 'counterCommand' : {
		
			
		}
		case 'elevenAttackCommand' : {
			

		}
		case 'guardCommand' : return false;
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
			let error = `Unknown command name: ${commandName} inside insufficient energy test`;
			console.log(error)
			return error
		}
	}
}
function testInsufficientEnergy (commandName, botInfo) {
	switch (commandName) {
		case 'aimCommand' : {
			const armSlot = commandName.instructions.weapon;
			const weaponName = botInfo.equipment[armSlot];
			const baseAimCost = weaponStats[weaponName].aimCost;
			const totalCost = baseAimCost + botInfo.attributes.aimCostModifier;
			return botInfo.attributes.CurrentCapacitor >= totalCost ? false : true;
		}
		case 'aimAndAttackCommand' : {
			const armSlot = commandName.instructions.weapon;
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

