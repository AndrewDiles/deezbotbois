import weaponStats from './equipment';

// utility function that returns the greater of two numbers
const returnGreaterNumber = (a,b) => {
	let result
	a > b ? result = a : result = b;
	return result
}
// function that determines the damage multiplier given an applicable attribute's value
const attributeDamageMultiplier = (attributeValue) => {
	return Math.pow(((0.5)+(attributeValue/20)),2)
}
// function that generates an attack object that includes all information required by the damage taken calculator
export function generateAttackObject (armName, attackingBotAttributes, specialMultiplier, specialAddition) {
	const weaponInfo = weaponStats[armName];
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
	}
	else {
		subType0 = weaponInfo.subTypes[0];
		subType1 = weaponInfo.subTypes[1];
		superType = weaponInfo.superType[0];
		baseDamage = weaponInfo.damage;
	}
	const applicableAttributeValue = attackingBotAttributes[subType2];
	const attributeDamageMultiplier = attributeDamageMultiplier(applicableAttributeValue) || 1;
	const subType0Multiplier = attackingBotAttributes[`${subType0}DamageMultiplier`] || 1;
	const subType1Multiplier = attackingBotAttributes[`${subType1}DamageMultiplier`] || 1;
	const superTypeMultiplier = attackingBotAttributes[`${superType}DamageMultiplier`] || 1;
	const DamageBonus = attackingBotAttributes.DamageBonus || 0;
	const productOfMultipliers = subType0Multiplier*subType1Multiplier*superTypeMultiplier*attributeDamageMultiplier*specialMultiplier;
	const sumOfDamage = baseDamage+DamageBonus+specialAddition;
	const outgoingDamage = sumOfDamage * productOfMultipliers;
	const attackObject = {
		damage = outgoingDamage,
		subType0 = subType0,
		subType1 = subType1,
		superType = superType,
		attackingBotAttributes = attackingBotAttributes
	}
	return(attackObject)
}

// function that calculates the amount of damage taken from an attack.  Note: maximum DR% is 90%; minimum damage taken is 1.
export function calculateDamageTaken (defendingBotAttributes, attackObject, specialMultiplier, specialReduction) {
	let appliedShield = defendingBotAttributes.Shield;
	let appliedArmor = defendingBotAttributes.Armor;
	if (attackObject.subType0 === 'Energy') appliedShield = 0;
	else if (attackObject.subType0 === 'Piercing') appliedArmor = 0;
	if (attackObject.superType === 'Melee') appliedArmor *= attackObject.attackingBotAttributes.MeleeArmorPenetration;
	else if (attackObject.superType === 'Ranged') appliedShield *= attackObject.attackingBotAttributes.RangedShieldPenetration;
	const sumOfApplicableAttributeValues = appliedShield + appliedArmor;
	const attributeDamageReductionMultiplier = GreaterNumber(1-(sumOfApplicableAttributeValues*sumOfApplicableAttributeValues/(2*(attackObject.damage*attackObject.damage))),0.1)
	const subType0Multiplier = defendingBotAttributes[`${attackObject.subType0}DamageReductionMultiplier`] || 1;
	const superTypeMultiplier = defendingBotAttributes[`${attackObject.superType}DamageReductionMultiplier`] || 1;
	const DamageReduction = defendingBotAttributes.DamageReduction || 0;
	const productOfMultipliers = subType0Multiplier*superTypeMultiplier*attributeDamageReductionMultiplier*specialMultiplier;
	const differenceOfDamageAndReductions = attackObject.damage - DamageReduction - specialReduction;
	const damageTaken = differenceOfDamageAndReductions * productOfMultipliers;
	return (returnGreaterNumber(damageTaken,1))
}