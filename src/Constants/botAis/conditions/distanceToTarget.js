class DistanceToTarget {
  constructor(depth, conditionMet, conditionUnMet) {
		this.depth = depth;
		this.condition = {
			name: 'distanceToTarget',
			test: {
				targetNumber: 1,
				evaluationType: '<',
				threshold: 3
			},
			conditionMet: conditionMet,
			conditionUnMet: conditionUnMet
		}
	}
	// newTargetNumber is the index number +1 of a scan
	setTargetNumber(newTargetNumber) {
		this.condition.test.targetNumber = newTargetNumber
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
export default DistanceToTarget