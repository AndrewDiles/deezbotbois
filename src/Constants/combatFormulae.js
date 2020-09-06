export const attributeDamageMultiplier = (attributeValue) => {
	return Math.pow(((0.5)+(attributeValue/20)),2)
}
const returnGreaterNumber = (a,b) => {
	let result
	a > b ? result = a : result = b;
	return result
}

// maximum DR is 90%
export const singleDefenceDamageMultiplier = (appliedDefenceAttribute, incomingDamage) => {
	return (returnGreaterNumber(1-(appliedDefenceAttribute*appliedDefenceAttribute/(2*(incomingDamage*incomingDamage))),0.1))
}
// Not going to write combined def function. Instead, input appliedDefenceAttribute as armor + shield