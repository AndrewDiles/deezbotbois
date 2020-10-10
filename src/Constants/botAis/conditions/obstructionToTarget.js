class ObstructionToTarget {
  constructor(depth, conditionMet, conditionUnMet) {
		this.depth = depth;
		this.condition = {
			name: 'obstructionToTarget',
			test: {
				targetNumber: 1,
			},
			conditionMet: conditionMet,
			conditionUnMet: conditionUnMet
		}
	}
	// newTargetNumber is the index number +1 of a scan
	setTargetNumber(newTargetNumber) {
		this.condition.test.targetNumber = newTargetNumber
	}
}
export default ObstructionToTarget