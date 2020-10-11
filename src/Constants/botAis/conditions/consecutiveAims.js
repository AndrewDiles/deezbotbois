class ConsecutiveAims {
  constructor(depth, conditionMet, conditionUnMet) {
		this.depth = depth;
		this.name = 'consecutiveAims';
		this.test = {
			threshold: 4,
			evaluationType: '>',
		};
		this.conditionMet = conditionMet;
		this.conditionUnMet = conditionUnMet;
	}
	// comparisonOperator can be: ===, !==, >, <
	setEvaluation(comparisonOperator) {
		this.test.evaluationType = comparisonOperator
	}
	incrementThreshold() {
		this.test.threshold ++
	}
	decrementThreshold() {
		this.test.threshold --
	}
}
module.exports = ConsecutiveAims