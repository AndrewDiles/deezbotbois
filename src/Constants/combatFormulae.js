export const attributeDamageMultiplier = (attributeValue) => {
	return Math.pow(((0.5)+(attributeValue/20)),2)
}
// dam amp = (0.5 + (attribute/20))^2