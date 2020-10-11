class SufficientEnergy {
  constructor(depth, conditionMet, conditionUnMet) {
		this.depth = depth;
		this.name = 'sufficientEnergy';
		this.test = {
			commandName: 'rangedAttackCommand',
			armSlot: 'arm1',
		};
		this.conditionMet = conditionMet;
		this.conditionUnMet = conditionUnMet;
	}
	// newCommandName can be any camelCased command name
	setCommandName(newCommandName) {
		this.test.commandName = newCommandName
	}
	// slotName can be: arm1, arm2, arm3
	setSlot(slotName) {
		this.test.armSlot = slotName
	}
}
module.exports = SufficientEnergy