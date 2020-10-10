class ConsecutiveAims {
  constructor(depth, conditionMet, conditionUnMet) {
		this.depth = depth;
		this.condition = {
			name: 'consecutiveAims',
			test: {
				threshold: 4,
				evaluationType: '>',
			},
			conditionMet: conditionMet,
			conditionUnMet: conditionUnMet
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