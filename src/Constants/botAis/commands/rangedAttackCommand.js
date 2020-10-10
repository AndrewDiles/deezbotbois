class RangedAttackCommand {
  constructor() {
		this.command = {
			name: 'rangedAttackCommand',
			instructions: {
				weapon: 'arm1',
			}
		}
	}
	// armSlot can be: arm1, arm2, arm3. Should only be a ranged weapon
	setArm(armSlot) {
		this.command.instructions.weapon = armSlot;
	}
}
export default RangedAttackCommand