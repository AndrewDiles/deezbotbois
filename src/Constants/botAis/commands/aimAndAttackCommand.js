class AimAndAttackCommand {
  constructor() {
		this.command = {
			name: 'aimAndAttackCommand',
			instructions: {
				weapon: 'arm1',
				angleToModify: 'arm1Angle',

				targetting: false,
				targetNumber: 1,
				
				rotating: false,
				rotation: 15,

				pointing: true,
				direction: 0,
			}
		}
	}
	// armSlot can be: arm1, arm2, arm3. Should only be a ranged weapon
	setArm(armSlot) {
		this.command.instructions.weapon = armSlot;
		const armXAngle = `${armSlot}Angle`;
		this.command.instructions.angleToModify = armXAngle;
	}
	activateTargetting() {
		this.command.direcinstructionstions.targetting = true;
		this.command.instructions.rotating = false;
		this.command.direcinstructionstions.pointing = false;
	}
	activateRotating() {
		this.command.direcinstructionstions.targetting = false;
		this.command.instructions.rotating = true;
		this.command.direcinstructionstions.pointing = false;
	}
	activatePointing() {
		this.command.direcinstructionstions.targetting = false;
		this.command.instructions.rotating = false;
		this.command.direcinstructionstions.pointing = true;
	}
	// newTargetNumber is the index number +1 of a scan
	setTargetNumber(newTargetNumber) {
		this.condition.test.targetNumber = newTargetNumber
	}
	setRotation(angle) {
		this.command.instructions.rotation = angle;
	}
	setDirection(angle) {
		this.command.instructions.direction = angle;
	}
}
module.exports = AimAndAttackCommand