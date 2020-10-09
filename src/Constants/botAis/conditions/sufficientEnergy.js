class SufficientEnergy {
  constructor(depth) {
		this.depth = depth;
		this.condition = {
			name: 'sufficientEnergy',
			test: {
				commandName: 'rangedAttackCommand',
				armSlot: 'arm1',
			},
			conditionMet: [],
			conditionUnMet: []
		}
	}
	// newCommandName can be any camelCased command name
	setCommandName(newCommandName) {
		this.condition.test.commandName = newCommandName
	}
	// slotName can be: arm1, arm2, arm3
	setSlot(slotName) {
		this.condition.test.armSlot = slotName
	}
}
export default SufficientEnergy