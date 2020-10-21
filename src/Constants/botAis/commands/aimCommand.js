class AimCommand {
  constructor() {
		this.name = 'aimCommand';
		this.instructions = {
			weapon: 'arm1',
			rotating: true,
			rotation: 15,
			// pointing: false,
			rangedDirection: 0,
		}
	}
	// armSlot can be: arm1, arm2, arm3. Should only be a ranged weapon
	setArm(armSlot) {
		this.instructions.weapon = armSlot;
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
		this.instructions.rangedDirection = angle;
	}
}
module.exports = AimCommand