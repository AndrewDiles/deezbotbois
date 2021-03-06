class DistanceToTarget {
  constructor(depth, conditionMet, conditionUnMet) {
		this.depth = depth;
		this.name = 'distanceToTarget';
		this.test = {
			targetNumber: 1,
			testTargets: 'hostile',
			evaluationType: '<',
			threshold: 3
		};
		this.conditionMet = conditionMet;
		this.conditionUnMet = conditionUnMet;
	}
	// newTargetNumber is the index number +1 of a scan
	setTargetNumber(newTargetNumber) {
		this.test.targetNumber = newTargetNumber
	}
	// newTarget can be: hostile, friend, wall, corner
	setTarget(newTarget) {
		this.test.testTargets = newTarget
	}
	// comparisonOperator can be: =, ≠, >, <
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
module.exports = DistanceToTarget