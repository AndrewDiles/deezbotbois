class ObstructionToTarget {
  constructor(depth, conditionMet, conditionUnMet) {
		this.depth = depth;
		this.name = 'obstructionToTarget';
		this.test = {
			targetNumber: 1,
		};
		this.conditionMet = conditionMet;
		this.conditionUnMet = conditionUnMet;
	}
	// newTargetNumber is the index number +1 of a scan
	setTargetNumber(newTargetNumber) {
		this.test.targetNumber = newTargetNumber
	}
}
module.exports = ObstructionToTarget