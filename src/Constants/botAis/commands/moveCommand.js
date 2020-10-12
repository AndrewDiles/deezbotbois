class MoveCommand {
  constructor() {
		this.name = 'moveCommand';
		this.instructions = {
			targetting: false,
			targetNumber: 1,
			intent: 'adjacent',
			directions: 'R'
		}
	}
	activateTargetting() {
		this.instructions.targetting = true;
	}
	deactivateTargetting() {
		this.instructions.targetting = false;
	}
	// newTargetNumber is the index number +1 of a scan
	setTargetNumber(newTargetNumber) {
		this.instructions.targetNumber = newTargetNumber
	}
	// nweIntent can be adjacent or collision
	setIntent(newIntent) {
		this.instructions.intent = newIntent;
	}
	// newDirection can be a string comination of: U, D, L, R, UR, UL, DR, DL
	setMeleeDirection(newDirections) {
		this.instructions.directions = newDirections;
	}
}
module.exports = MoveCommand