class ScanResults {
  constructor(depth, conditionMet, conditionUnMet) {
		this.depth = depth;
		this.name = 'scanResults';
		this.test = {
			testTargets: 'hostile',
			targetEvaluationType: '===',
			threshold: 0,
			thresholdEvaluationType: '>',
		};
		this.conditionMet = conditionMet;
		this.conditionUnMet = conditionUnMet;
	}
	// newTarget can be: hostile, friend, wall, corner
	setTarget(newTarget) {
		this.test.testTargets = newTarget
	}
	// comparisonOperator can be: ===, !==
	setTargetEvaluation(comparisonOperator) {
		this.test.targetEvaluationType = comparisonOperator
	}
	// comparisonOperator can be: ===, !==, >, <
	setThresholdEvaluation(comparisonOperator) {
		this.test.thresholdEvaluationType = comparisonOperator
	}
	incrementThreshold() {
		this.test.threshold ++
	}
	decrementThreshold() {
		this.test.threshold --
	}
}
module.exports = ScanResults