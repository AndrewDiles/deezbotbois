class SwitchCommand {
  constructor() {
		this.name = 'switchCommand';
		this.instructions = {
			1: 'FLIP',
			2: 'NONE',
			3: 'NONE',
			4: 'NONE',
			5: 'NONE',
		}
	}
	// switchNumber is an integer 1-5, value is one of: 'ON', 'OFF', 'FLIP', 'NONE'
	setSwitch(switchNumber, value) {
		this.instructions[switchNumber] = value;
	}
}
module.exports = SwitchCommand