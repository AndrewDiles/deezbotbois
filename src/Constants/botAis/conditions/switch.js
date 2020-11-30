class Switch {
  constructor(depth, conditionMet, conditionUnMet) {
		this.depth = depth;
		this.name = 'switch';
		this.test = {
			switchNumber: 1,
			evaluationType: 'ON',
		};
		this.conditionMet = conditionMet;
		this.conditionUnMet = conditionUnMet;
	}
	// newType should be either 'ON' or 'OFF'
	setEvaluation(newType) {
		this.test.evaluationType = newType
	}
	// newSwitchNumber should be an integer from 1-5
	setSwitchNumber(newSwitchNumber) {
		this.test.switchNumber = newSwitchNumber
	}
}
module.exports = Switch