class ConsecutiveAims {
  constructor(depth) {
		this.depth = depth;
		this.condition = {
			name: 'consecutiveAims',
			test: {
				threshold: 4,
				evaluationType: '>',
			},
			conditionMet: [],
			conditionUnMet: []
		}
	}
	// comparisonOperator can be: ===, !==, >, <
	setEvaluation(comparisonOperator) {
		this.condition.test.evaluationType = comparisonOperator
	}
	incrementThreshold() {
		this.condition.test.threshold ++
	}
	decrementThreshold() {
		this.condition.test.threshold --
	}
}
export default ConsecutiveAims