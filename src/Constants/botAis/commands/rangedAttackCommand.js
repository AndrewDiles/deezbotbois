class RangedAttackCommand {
  constructor() {
		this.name = 'rangedAttackCommand';
		this.instructions = {
			weapon: 'arm1',
		}
	}
	// armSlot can be: arm1, arm2, arm3. Should only be a ranged weapon
	setArm(armSlot) {
		this.instructions.weapon = armSlot;
	}
}
module.exports = RangedAttackCommand