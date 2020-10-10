class PreviousCommand {
  constructor(depth, conditionMet, conditionUnMet) {
		this.depth = depth;
		this.condition = {
			name: 'previousCommand',
			test: {
				commandName: 'scanCommand',
				evaluationType: '===',
				armSlot: null,
			},
			conditionMet: conditionMet,
			conditionUnMet: conditionUnMet
		}
	}
	// newCommandName can be any camelCased command name
	setCommandName(newCommandName) {
		this.condition.test.commandName = newCommandName
	}
	// comparisonOperator can be: ===, !==
	setEvaluation(comparisonOperator) {
		this.condition.test.evaluationType = comparisonOperator
	}
	// slotName can be: null, arm1, arm2, arm3
	setSlot(slotName) {
		this.condition.test.armSlot = slotName
	}
}
export default PreviousCommand