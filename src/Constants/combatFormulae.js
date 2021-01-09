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
		dmgOutFormulaText = `( Collision Base Damage`;
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
		dmgOutFormulaNumbers += ` + ${attackingBotAttributes.DamageBonus}`;
	}
	if (specialAddition !== 0) {
		dmgOutFormulaText += ` + Command Bonus`;
		dmgOutFormulaNumbers += ` + ${specialAddition}`;
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
		dmgOutFormulaText: dmgOutFormulaText,
		dmgOutFormulaNumbers: dmgOutFormulaNumbers
	}
	return(attackObject)
}

// function that calculates the amount of damage taken from an attack.  Note: maximum DR% is 90%; minimum damage taken is 1.
export function calculateDamageTaken (defendingBotAttributes, attackObject, specialMultiplier, specialReduction) {
	console.log('damage calculationg parameters:','\n',{defendingBotAttributes},'\n',{attackObject},'\n',{specialMultiplier},'\n',{specialReduction})
	let appliedShield = defendingBotAttributes.Shield;
	let appliedArmor = defendingBotAttributes.Armor;
	if (attackObject.subType0 === 'Energy') appliedShield = 0;
	else if (attackObject.subType0 === 'Piercing') appliedArmor = 0;
	if (attackObject.superType === 'Melee') appliedArmor *= attackObject.attackingBotAttributes.MeleeArmorPenetration;
	else if (attackObject.superType === 'Ranged') appliedShield *= attackObject.attackingBotAttributes.RangedShieldPenetration;
	const sumOfApplicableAttributeValues = appliedShield + appliedArmor;
	const attributeDamageReductionMultiplier = returnGreaterNumber(1-(sumOfApplicableAttributeValues*sumOfApplicableAttributeValues/(2*(attackObject.damage*attackObject.damage))),0.1)
	const subType0Multiplier = defendingBotAttributes[`${attackObject.subType0}DamageReductionMultiplier`] || 1;
	const superTypeMultiplier = defendingBotAttributes[`${attackObject.superType}DamageReductionMultiplier`] || 1;
	const DamageReduction = defendingBotAttributes.DamageReduction || 0;
	const productOfMultipliers = subType0Multiplier*superTypeMultiplier*attributeDamageReductionMultiplier*specialMultiplier;
	const differenceOfDamageAndReductions = attackObject.damage - DamageReduction - specialReduction;
	const damageTaken = (Math.trunc(10*(differenceOfDamageAndReductions * productOfMultipliers))/10);
	return (returnGreaterNumber(damageTaken,1))
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
		console.log('collision with wall being HANDLED');
		newRecordsChangesToAdd.push({name: 'damageTaken', value: 1});
		newBattleLogsToAdd.push({type: 'attribute-change', content: `COLLISION BY ${executingBot.name} INTO A WALL. DURABILITY DECREASES FROM ${executingBot.attributes.CurrentDurability +1} TO ${executingBot.attributes.CurrentDurability}`});
		return {
			newRecordsChangesToAdd: newRecordsChangesToAdd,
			newBattleLogsToAdd: newBattleLogsToAdd,
			impacterDamageTaken: 1,
			recipientDamageTaken: 0,
		}
	} else {
		console.log('collision with a bot being HANDLED');
		const attackInfo = generateAttackObject('Collision', allBots[impacterIndex].attributes, bonusByMultiplication, bonusByAddition);
		const recipientDamageTaken = calculateDamageTaken(allBots[recipientIndex].attributes, attackInfo, 1, 0);
		// calculateDamageTaken (defendingBotAttributes, attackObject, specialMultiplier, specialReduction) {
		const returnAttackInfo = generateAttackObject('Collision', allBots[recipientIndex].attributes, 1, 0);
		const impacterDamageTaken = calculateDamageTaken(allBots[impacterIndex].attributes, returnAttackInfo, 1, 0);
		console.log({recipientDamageTaken});
		console.log({impacterDamageTaken});



	}
	

}