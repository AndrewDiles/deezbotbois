class DamageTaken {
  constructor(depth) {
		this.depth = depth;
		this.condition = {
			name: 'damageTaken',
			test: {
				threshold: 0,
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
export default DamageTaken