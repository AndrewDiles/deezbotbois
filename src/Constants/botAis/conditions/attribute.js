class Attribute {
  constructor(depth, conditionMet, conditionUnMet) {
		this.depth = depth;
		this.condition = {
			name: 'attribute',
			test: {
				testTargets: 'durability',
				evaluationType: '>',
				threshold: 1
			},
			conditionMet: conditionMet,
			conditionUnMet: conditionUnMet
		}

	}
	// newTarget can be: durability , capacitor
	setTarget(newTarget) {
		this.condition.test.testTargets = newTarget
	}
	
	// comparisonOperator can be: ===, >, <
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
export default Attribute