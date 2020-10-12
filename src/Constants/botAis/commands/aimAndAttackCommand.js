class AimAndAttackCommand {
  constructor() {
		this.name = 'aimAndAttackCommand';
		this.instructions = {
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
	// armSlot can be: arm1, arm2, arm3. Should only be a ranged weapon
	setArm(armSlot) {
		this.instructions.weapon = armSlot;
		const armXAngle = `${armSlot}Angle`;
		this.instructions.angleToModify = armXAngle;
	}
	activateTargetting() {
		this.instructions.targetting = true;
		this.instructions.rotating = false;
		this.instructions.pointing = false;
	}
	activateRotating() {
		this.instructions.targetting = false;
		this.instructions.rotating = true;
		this.instructions.pointing = false;
	}
	activatePointing() {
		this.instructions.targetting = false;
		this.instructions.rotating = false;
		this.instructions.pointing = true;
	}
	// newTargetNumber is the index number +1 of a scan
	setTargetNumber(newTargetNumber) {
		this.instructions.targetNumber = newTargetNumber
	}
	setRotation(angle) {
		this.instructions.rotation = angle;
	}
	setDirection(angle) {
		this.instructions.direction = angle;
	}
}
module.exports = AimAndAttackCommand