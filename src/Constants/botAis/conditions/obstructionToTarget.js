class ObstructionToTarget {
  constructor(depth, conditionMet, conditionUnMet) {
		this.depth = depth;
		this.name = 'obstructionToTarget';
		this.test = {
			targetNumber: 1,
			testTargets: 'hostile',
		};
		this.conditionMet = conditionMet;
		this.conditionUnMet = conditionUnMet;
	}
	// newTarget can be: hostile, friend, wall, corner, any
	setTarget(newTarget) {
		this.test.testTargets = newTarget
	}
	// newTargetNumber is the index number +1 of a scan
	setTargetNumber(newTargetNumber) {
		this.test.targetNumber = newTargetNumber
	}
}
module.exports = ObstructionToTarget