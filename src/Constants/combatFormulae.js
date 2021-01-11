import { weaponStats } from './equipment';

// utility function that returns the greater of two numbers
const returnGreaterNumber = (a,b) => {
	let result
	a > b ? result = a : result = b;
	return result
}
// function that determines the damage multiplier given an applicable attribute's value
const attributeDamageMultiplierCalculator = (attributeValue) => {
	return (Math.trunc(100*(Math.pow(((0.5)+(attributeValue/20)),2))))/100
}
// function that generates an attack object that includes all information required by the damage taken calculator
export function generateAttackObject (armName, attackingBotAttributes, specialMultiplier, specialAddition) {
	const weaponInfo = weaponStats[armName];
	let dmgOutFormulaText = '';
	let dmgOutFormulaNumbers = '';
	if (armName !== 'Collision' && !weaponInfo) {
		console.log('Weapon not found')
		return 
	}
	if (!attackingBotAttributes) {
		console.log('Bot attributes not entered')
	}
	let subType0, subType1, superType, baseDamage;
	if (armName === 'Collision') {
		subType0 = 'Crushing';
		subType1 = 'Power';
		superType = 'Collision';
		baseDamage = 0.25*attackingBotAttributes.Durability;
		dmgOutFormulaText = `( Base Collision Damage`;
		dmgOutFormulaNumbers = `(${baseDamage}`;
	} else {
		subType0 = weaponInfo.subTypes[0];
		subType1 = weaponInfo.subTypes[1];
		superType = weaponInfo.superType[0];
		baseDamage = weaponInfo.damage;
	}
	const applicableAttributeValue = attackingBotAttributes[subType1];
	const attributeDamageMultiplier = attributeDamageMultiplierCalculator(applicableAttributeValue) || 1;
	const subType0Multiplier = attackingBotAttributes[`${subType0}DamageMultiplier`] || 1;
	// const subType1Multiplier = attackingBotAttributes[`${subType1}DamageMultiplier`] || 1;
	const superTypeMultiplier = attackingBotAttributes[`${superType}DamageMultiplier`] || 1;
	const DamageBonus = attackingBotAttributes.DamageBonus || 0;
	const productOfMultipliers = subType0Multiplier*superTypeMultiplier*attributeDamageMultiplier*specialMultiplier;
	const sumOfDamage = baseDamage+DamageBonus+specialAddition;
	const outgoingDamage = (Math.trunc(100*(sumOfDamage * productOfMultipliers))/100);
	if (attackingBotAttributes.DamageBonus) {
		dmgOutFormulaText += ` + Damage Bonus`;
		dmgOutFormulaNumbers += `+${attackingBotAttributes.DamageBonus}`;
	}
	if (specialAddition !== 0) {
		dmgOutFormulaText += ` + Command Bonus`;
		dmgOutFormulaNumbers += `+${specialAddition}`;
	}
	dmgOutFormulaText += ' )';
	dmgOutFormulaNumbers += `)`;
	let numberOfMultipliers = 0;
	let multipliersHandled = 0;
	subType0Multiplier !== 1 && numberOfMultipliers++;
	// subType1Multiplier && numberOfMultipliers++;
	superTypeMultiplier !== 1 && numberOfMultipliers++;
	attributeDamageMultiplier !== 1 && numberOfMultipliers++;
	specialMultiplier !== 1 && numberOfMultipliers++;

	function testForEndOfMultipliers () {
		if (multipliersHandled === numberOfMultipliers) {
			dmgOutFormulaText += ' )';
			dmgOutFormulaNumbers += `)`;
		}
	}
	function testIfNotFirstMultiplier () {
		if (multipliersHandled !== 0) {
			dmgOutFormulaText += ' x';
			dmgOutFormulaNumbers += 'x';
		}
	}

	if (numberOfMultipliers !== 0) {
		dmgOutFormulaText += ' x (';
		dmgOutFormulaNumbers += ` x (`;
		if (subType0Multiplier !== 1) {
			dmgOutFormulaText += ` ${subType0} Multiplier`;
			dmgOutFormulaNumbers += `${subType0Multiplier}`;
			multipliersHandled ++;
			testForEndOfMultipliers();
		}
		if (superTypeMultiplier !== 1) {
			testIfNotFirstMultiplier();
			dmgOutFormulaText += ` ${superType} Multiplier`;
			dmgOutFormulaNumbers += `${superTypeMultiplier}`;
			multipliersHandled ++;
			testForEndOfMultipliers();
		}
		if (attributeDamageMultiplier !== 1) {
			testIfNotFirstMultiplier();
			dmgOutFormulaText += ` ${subType1} Multiplier`;
			dmgOutFormulaNumbers += `${attributeDamageMultiplier.toFixed(2)}`;
			multipliersHandled ++;
			testForEndOfMultipliers();
		}
		if (specialMultiplier !== 1) {
			testIfNotFirstMultiplier();
			dmgOutFormulaText += ' Command Multiplier';
			dmgOutFormulaNumbers += `${specialMultiplier}`;
			multipliersHandled ++;
			testForEndOfMultipliers();
		}
	}
	dmgOutFormulaNumbers += ` = ${outgoingDamage}`;
	
	const attackObject = {
		damage: outgoingDamage,
		subType0: subType0,
		subType1: subType1,
		superType: superType,
		attackingBotAttributes: attackingBotAttributes,
		battleLogToAdd: {type: 'damage-calculation', content: `${dmgOutFormulaText} = ${dmgOutFormulaNumbers}`},
	}
	return(attackObject)
}

// function that calculates the amount of damage taken from an attack.  Note: maximum DR% is 90%; minimum damage taken is 1.
export function calculateDamageTaken (defendingBotAttributes, attackObject, specialMultiplier, specialReduction) {
	let battleLogToAdd = '';
	// console.log('damage calculationg parameters:','\n',{defendingBotAttributes},'\n',{attackObject},'\n',{specialMultiplier},'\n',{specialReduction})
	let appliedShield = defendingBotAttributes.Shield;
	let appliedArmor = defendingBotAttributes.Armor;
	if (attackObject.subType0 === 'Energy') {
		appliedShield = 0;
		battleLogToAdd += 'Energy Attack => Shield not applied.\n';
	}
	else if (attackObject.subType0 === 'Piercing') {
		appliedArmor = 0;
		battleLogToAdd += 'Piercing Attack => Armor not applied.\n';
	}
	if (attackObject.superType === 'Melee') {
		if (appliedArmor !== 0) {
			battleLogToAdd += `Armor of ${appliedArmor} reduced by attacker's armor penetration multiplier of ${attackObject.attackingBotAttributes.MeleeArmorPenetration}\n`;
			appliedArmor *= attackObject.attackingBotAttributes.MeleeArmorPenetration;
		}
	}
	else if (attackObject.superType === 'Ranged') {
		if (appliedShield !== 0) {
			battleLogToAdd += `Shield of ${appliedShield} reduced by attacker's shield penetration multiplier of ${attackObject.attackingBotAttributes.RangedShieldPenetration}\n`;
			appliedShield *= attackObject.attackingBotAttributes.RangedShieldPenetration;
		}
	}
	const sumOfApplicableAttributeValues = appliedShield + appliedArmor;
	battleLogToAdd += `Shield and Armor to be applied = ${appliedShield} + ${appliedArmor} = ${sumOfApplicableAttributeValues}\n`;
	const attributeDamageReductionMultiplier = returnGreaterNumber(1-(sumOfApplicableAttributeValues*sumOfApplicableAttributeValues/(2*(attackObject.damage*attackObject.damage))),0.1);
	battleLogToAdd += `Shield and Armor damage reduction multiple is greater of 0.1 and 1 - (AppliedArmor&Shield ^2)/ (2 x incomingDamage ^2) : 1 - (${sumOfApplicableAttributeValues}^2)/2x${attackObject.damage.toFixed(2)}^2 => ${attributeDamageReductionMultiplier.toFixed(2)}\n`;
	const subType0Multiplier = defendingBotAttributes[`${attackObject.subType0}DamageReductionMultiplier`] || 1;
	if (subType0Multiplier !== 1) {
		battleLogToAdd += `${attackObject.subType0} damage reduction multiplier to apply: ${subType0Multiplier.toFixed(2)}\n`;
	}
	const superTypeMultiplier = defendingBotAttributes[`${attackObject.superType}DamageReductionMultiplier`] || 1;
	if (superTypeMultiplier !== 1) {
		battleLogToAdd += `${attackObject.superType} damage reduction multiplier to apply: ${superTypeMultiplier.toFixed(2)}\n`;
	}
	const DamageReduction = defendingBotAttributes.DamageReduction || 0;
	if (DamageReduction !== 0) {
		battleLogToAdd += `Damage reduction to apply: ${DamageReduction}\n`;
	}
	const productOfMultipliers = subType0Multiplier*superTypeMultiplier*attributeDamageReductionMultiplier*specialMultiplier;
	battleLogToAdd += `Product of multipliers = ${subType0Multiplier.toFixed(2)} x ${superTypeMultiplier.toFixed(2)} x ${attributeDamageReductionMultiplier.toFixed(2)} x ${specialMultiplier.toFixed(2)} = ${productOfMultipliers.toFixed(2)}\n`;
	const differenceOfDamageAndReductions = attackObject.damage - DamageReduction - specialReduction;
	battleLogToAdd += `Base damage minus damage reductions = ${attackObject.damage.toFixed(2)} - ${DamageReduction} - ${specialReduction}\n`;
	const damageTaken = (Math.trunc(10*(differenceOfDamageAndReductions * productOfMultipliers))/10);
	battleLogToAdd += `Damage taken (rounded to tenth) = difference of damage and reductions x multipliers = ${differenceOfDamageAndReductions} x ${productOfMultipliers.toFixed(2)} = ${damageTaken.toFixed(1)}\n`;
	return ({battleLogToAdd: {type: 'damage-calculation', content: battleLogToAdd}, value: returnGreaterNumber(damageTaken,1)})
}


					// begin damage output formula
					// damage reduction formula
					// make functions for the calculation of formulas.  It should take in objects, index of dealer, index of recipient, value of output dmg,  ...
					// function should return new record objects, new log objects
					// make a function specific for collisions
export function handleCollision (allBots, impacterIndex, wallImpact, recipientIndex, bonusByMultiplication, bonusByAddition ) {
	const executingBot = allBots[impacterIndex];
	const newRecordsChangesToAdd = [];
	const newBattleLogsToAdd = [];
	if (wallImpact) {
		newRecordsChangesToAdd.push({name: 'damageTaken', value: 1});
		newBattleLogsToAdd.push({type: 'attribute-change', content: `COLLISION BY ${executingBot.name} INTO A WALL. DURABILITY DECREASES FROM ${executingBot.attributes.CurrentDurability +1} TO ${executingBot.attributes.CurrentDurability}`});
		return {
			newRecordsChangesToAdd: newRecordsChangesToAdd,
			newBattleLogsToAdd: newBattleLogsToAdd,
			impacterDamageTaken: 1,
			recipientDamageTaken: 0,
		}
	} else {
		const attackInfo = generateAttackObject('Collision', allBots[impacterIndex].attributes, bonusByMultiplication, bonusByAddition);
		console.log(attackInfo.battleLogToAdd);
		attackInfo.battleLogToAdd.content = `${allBots[impacterIndex].name}'s outgoing damage: ${attackInfo.battleLogToAdd.content}`;
		newBattleLogsToAdd.push(attackInfo.battleLogToAdd);
		const recipientDamageTakenInfo = calculateDamageTaken(allBots[recipientIndex].attributes, attackInfo, 1, 0);
		recipientDamageTakenInfo.battleLogToAdd.content = `${allBots[recipientIndex].name}'s damage taken: ${recipientDamageTakenInfo.battleLogToAdd.content}`;
		newBattleLogsToAdd.push(recipientDamageTakenInfo.battleLogToAdd);
		newRecordsChangesToAdd.push({name: 'damageDealt', superTypes: 'Collision', value: recipientDamageTakenInfo.value});

		const returnAttackInfo = generateAttackObject('Collision', allBots[recipientIndex].attributes, 1, 0);
		console.log(returnAttackInfo.battleLogToAdd);
		returnAttackInfo.battleLogToAdd.content = `${allBots[recipientIndex].name}'s return outgoing damage: ${returnAttackInfo.battleLogToAdd.content}`;
		newBattleLogsToAdd.push(returnAttackInfo.battleLogToAdd);
		const impacterDamageTakenInfo = calculateDamageTaken(allBots[impacterIndex].attributes, returnAttackInfo, 1, 0);
		impacterDamageTakenInfo.battleLogToAdd.content = `${allBots[impacterIndex].name}'s damage taken: ${impacterDamageTakenInfo.battleLogToAdd.content}`;
		newBattleLogsToAdd.push(impacterDamageTakenInfo.battleLogToAdd);
		newRecordsChangesToAdd.push({name: 'damageTaken', superTypes: 'Collision', value: impacterDamageTakenInfo.value});

		console.log({recipientDamageTakenInfo});
		console.log({impacterDamageTakenInfo});

		return {
			newRecordsChangesToAdd: newRecordsChangesToAdd,
			newBattleLogsToAdd: newBattleLogsToAdd,
			impacterDamageTaken: impacterDamageTakenInfo.value,
			recipientDamageTaken: recipientDamageTakenInfo.value,
		}

	}
	

}