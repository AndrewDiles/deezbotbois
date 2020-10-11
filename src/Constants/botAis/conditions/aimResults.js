class AimResults {
  constructor(depth, conditionMet, conditionUnMet) {
		this.depth = depth;
		this.name = 'aimResults';
		this.test = {
			testTargets: 'hostile',
			evaluationType: '===',
		};
		this.conditionMet = conditionMet;
		this.conditionUnMet = conditionUnMet;
	}
	// newTarget can be: hostile, friend
	setTarget(newTarget) {
		this.test.testTargets = newTarget
	}
	// comparisonOperator can be: ===, !==
	setEvaluation(comparisonOperator) {
		this.test.evaluationType = comparisonOperator
	}
}
module.exports = AimResults