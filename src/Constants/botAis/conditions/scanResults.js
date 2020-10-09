class ScanResults {
  constructor(depth) {
		this.depth = depth;
		this.condition = {
			name: 'scanResults',
			test: {
				testTargets: 'hostile',
				targetEvaluationType: '===',
				threshold: 0,
				thresholdEvaluationType: '>',
			},
			conditionMet: [],
			conditionUnMet: []
		}
	}
	// newTarget can be: hostile, friend, wall, corner
	setTarget(newTarget) {
		this.condition.test.testTargets = newTarget
	}
	// comparisonOperator can be: ===, !==
	setTargetEvaluation(comparisonOperator) {
		this.condition.test.targetEvaluationType = comparisonOperator
	}
	// comparisonOperator can be: ===, !==, >, <
	setThresholdEvaluation(comparisonOperator) {
		this.condition.test.thresholdEvaluationType = comparisonOperator
	}
	incrementThreshold() {
		this.condition.test.threshold ++
	}
	decrementThreshold() {
		this.condition.test.threshold --
	}
}
export default ScanResults