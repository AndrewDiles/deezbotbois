class ElevenAttackCommand {
  constructor() {
		this.command = {
			name: 'elevenAttackCommand',
			instructions: {
				weapon: 'arm1',
				attackType: 'ranged',

				angleToModify: 'arm1Angle',

				targetting: true,
				targetNumber: 1,
				
				rotating: false,
				rotation: 15,

				pointing: false,
				rangedDirection: 0,

				meleeDirection: 'R'
			}
		}
	}
	// armSlot can be: arm1, arm2, arm3. Should only be an energy weapon
	setArm(armSlot) {
		this.command.instructions.weapon = armSlot;
		const armXAngle = `${armSlot}Angle`;
		this.command.instructions.angleToModify = armXAngle;
	}
	// type can be: ranged or melee
	setAttackType(type) {
		this.command.instructions.attackType = type;
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
	setRangedDirection(angle) {
		this.command.instructions.rangedDirection = angle;
	}
	// newDirection can be: U, D, L, R, UR, UL, DR, DL
	setMeleeDirection(newDirection) {
		this.command.instructions.meleeDirection = newDirection;
	}
}
module.exports = ElevenAttackCommand