class MeleeAttackCommand {
  constructor() {
		this.command = {
			name: 'meleeAttackCommand',
			instructions: {
				weapon: 'arm1',
				targetting: true,
				targetNumber: 1,
				direction: 'R',
			}
		}
	}
	// armSlot can be: arm1, arm2, arm3. Should only be a melee weapon
	setArm(armSlot) {
		this.command.instructions.weapon = armSlot;
	}
	activateTargetting() {
		this.condition.test.targetting = true;
	}
	deactivateTargetting() {
		this.condition.test.targetting = false;
	}
	// newTargetNumber is the index number +1 of a scan
	setTargetNumber(newTargetNumber) {
		this.condition.test.targetNumber = newTargetNumber;
	}
	// newDirection can be: U, D, L, R, UR, UL, DR, DL
	setDirection(newDirection) {
		this.command.instructions.direction = newDirection;
	}
}
export default MeleeAttackCommand