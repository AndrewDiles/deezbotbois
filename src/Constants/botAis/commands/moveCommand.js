class MoveCommand {
  constructor() {
		this.command = {
			name: 'moveCommand',
			instructions: {
				targetting: false,
				targetNumber: 1,
				intent: 'adjacent',
				directions: 'R'
			}
		}
	}
	activateTargetting() {
		this.command.direcinstructionstions.targetting = true;
	}
	deactivateTargetting() {
		this.command.direcinstructionstions.targetting = false;
	}
	// newTargetNumber is the index number +1 of a scan
	setTargetNumber(newTargetNumber) {
		this.condition.test.targetNumber = newTargetNumber
	}
	// nweIntent can be adjacent or collision
	setIntent(newIntent) {
		this.command.instructions.intent = newIntent;
	}
	// newDirection can be a string comination of: U, D, L, R, UR, UL, DR, DL
	setMeleeDirection(newDirections) {
		this.command.instructions.directions = newDirections;
	}
}
module.exports = MoveCommand