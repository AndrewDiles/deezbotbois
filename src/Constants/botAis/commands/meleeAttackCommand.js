class MeleeAttackCommand {
  constructor() {
		this.name = 'meleeAttackCommand';
		this.instructions = {
			weapon: 'arm1',
			targetting: true,
			targetNumber: 1,
			meleeDirection: 'R'
		}
	}
	// armSlot can be: arm1, arm2, arm3. Should only be a melee weapon
	setArm(armSlot) {
		this.instructions.weapon = armSlot;
	}
	activateTargetting() {
		this.instructions.targetting = true;
	}
	deactivateTargetting() {
		this.instructions.targetting = false;
	}
	// newTargetNumber is the index number +1 of a scan
	setTargetNumber(newTargetNumber) {
		this.instructions.targetNumber = newTargetNumber;
	}
	// newDirection can be: U, D, L, R, UR, UL, DR, DL
	setDirection(newDirection) {
		this.instructions.meleeDirection = newDirection;
	}
}
module.exports = MeleeAttackCommand