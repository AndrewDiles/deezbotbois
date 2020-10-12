class AimCommand {
  constructor() {
		this.name = 'aimCommand';
		this.instructions = {
			angleToModify: 'arm1Angle',
			rotating: true,
			rotation: 15,
			// pointing: false,
			direction: 0,
		}
	}
	// armSlot can be: arm1, arm2, arm3. Should only be a ranged weapon
	setArm(armSlot) {
		const armXAngle = `${armSlot}Angle`;
		this.instructions.angleToModify = armXAngle;
	}
	activateRotating() {
		this.instructions.rotating = true;
		// this.command.direcinstructionstions.pointing = false;
	}
	deactivateRotating() {
		this.instructions.rotating = false;
	}
	// activatePointing() {
	// 	this.command.instructions.rotating = false;
	// 	this.command.instructions.pointing = true;
	// }
	// angle must be an integer.  Should be between 0-360, will function even if outside this range
	setRotation(angle) {
		this.instructions.rotation = angle;
	}
	setDirection(angle) {
		this.instructions.direction = angle;
	}
}
module.exports = AimCommand