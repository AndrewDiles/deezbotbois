class AimResults {
  constructor(depth, conditionMet, conditionUnMet) {
		this.depth = depth;
		this.condition = {
			name: 'aimResults',
			test: {
				testTargets: 'hostile',
				evaluationType: '===',
			},
			conditionMet: conditionMet,
			conditionUnMet: conditionUnMet
		}
	}
	// newTarget can be: hostile, friend
	setTarget(newTarget) {
		this.condition.test.testTargets = newTarget
	}
	// comparisonOperator can be: ===, !==
	setEvaluation(comparisonOperator) {
		this.condition.test.evaluationType = comparisonOperator
	}
}
export default AimResults