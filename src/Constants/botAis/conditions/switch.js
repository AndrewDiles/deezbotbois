class Switch {
  constructor(depth, conditionMet, conditionUnMet) {
		this.depth = depth;
		this.name = 'switch';
		this.test = {
			switchNumber: 1,
		};
		this.conditionMet = conditionMet;
		this.conditionUnMet = conditionUnMet;
	}
	// newSwitchNumber should be an integer from 1-5
	setSwitchNumber(newSwitchNumber) {
		this.test.switchNumber = newSwitchNumber
	}
}
module.exports = Switch