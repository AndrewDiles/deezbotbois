class RamCommand {
  constructor() {
		this.command = {
			name: 'ramCommand',
			instructions: {
				targetNumber: 1,
			}
		}
	}
	// newTargetNumber is the index number +1 of a scan
	setTargetNumber(newTargetNumber) {
		this.condition.test.targetNumber = newTargetNumber
	}
}
export default RamCommand