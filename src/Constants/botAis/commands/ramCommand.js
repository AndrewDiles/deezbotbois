class RamCommand {
  constructor() {
		this.name = 'ramCommand';
		this.instructions = {
			targetNumber: 1,
		}
	}
	// newTargetNumber is the index number +1 of a scan
	setTargetNumber(newTargetNumber) {
		this.instructions.targetNumber = newTargetNumber
	}
}
module.exports = RamCommand