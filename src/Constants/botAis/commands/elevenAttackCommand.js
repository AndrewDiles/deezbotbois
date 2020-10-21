class ElevenAttackCommand {
  constructor() {
		this.name = 'elevenAttackCommand';
		this.instructions = {
			weapon: 'arm1',
			attackType: 'ranged',
			// angleToModify: 'arm1Angle',

			targetting: true,
			targetNumber: 1,
			
			rotating: false,
			rotation: 15,

			// pointing: false,
			rangedDirection: 0,
			meleeDirection: 'R'
		}
	}
	// armSlot can be: arm1, arm2, arm3. Should only be an energy weapon
	setArm(armSlot) {
		this.instructions.weapon = armSlot;
		// const armXAngle = `${armSlot}Angle`;
		// this.instructions.angleToModify = armXAngle;
	}
	// type can be: ranged or melee
	setAttackType(type) {
		this.instructions.attackType = type;
	}

	activateTargetting() {
		this.instructions.targetting = true;
		this.instructions.rotating = false;
		// this.instructions.pointing = false;
	}
	activateRotating() {
		this.instructions.targetting = false;
		this.instructions.rotating = true;
		// this.instructions.pointing = false;
	}
	activatePointing() {
		this.instructions.targetting = false;
		this.instructions.rotating = false;
		// this.instructions.pointing = true;
	}
	// newTargetNumber is the index number +1 of a scan
	setTargetNumber(newTargetNumber) {
		this.instructions.targetNumber = newTargetNumber
	}
	setRotation(angle) {
		this.instructions.rotation = angle;
	}
	setRangedDirection(angle) {
		this.instructions.rangedDirection = angle;
	}
	// newDirection can be: U, D, L, R, UR, UL, DR, DL
	setMeleeDirection(newDirection) {
		this.instructions.meleeDirection = newDirection;
	}
}
module.exports = ElevenAttackCommand