class PreviousCommand {
  constructor(depth, conditionMet, conditionUnMet) {
		this.depth = depth;
		this.name = 'previousCommand';
		this.test = {
			commandName: 'scanCommand',
			armSlot: null,
		};
		this.conditionMet = conditionMet;
		this.conditionUnMet = conditionUnMet;
	}
	// newCommandName can be any camelCased command name
	setCommandName(newCommandName) {
		this.test.commandName = newCommandName
	}
	// comparisonOperator can be: =, ≠
	setEvaluation(comparisonOperator) {
		this.test.evaluationType = comparisonOperator
	}
	// slotName can be: null, arm1, arm2, arm3
	setSlot(slotName) {
		this.test.armSlot = slotName
	}
}
module.exports = PreviousCommand