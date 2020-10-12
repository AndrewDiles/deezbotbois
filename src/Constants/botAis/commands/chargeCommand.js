class ChargeCommand {
  constructor() {
		this.name = 'chargeCommand';
		this.instructions = {
			weapon: 'arm1',
			targetNumber: 1,
		}
	}
	// armSlot can be: arm1, arm2, arm3. Should only be a melee weapon
	setArm(armSlot) {
		this.instructions.weapon = armSlot;
	}
	// newTargetNumber is the index number +1 of a scan
	setTargetNumber(newTargetNumber) {
		this.instructions.targetNumber = newTargetNumber
	}
}
module.exports = ChargeCommand