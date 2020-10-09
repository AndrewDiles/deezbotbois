class AimResults {
  constructor(depth) {
		this.depth = depth;
		this.condition = {
			name: 'aimResults',
			test: {
				testTargets: 'hostile',
				evaluationType: '===',
			},
			conditionMet: [],
			conditionUnMet: []
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