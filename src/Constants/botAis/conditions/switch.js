class Switch {
  constructor(depth, conditionMet, conditionUnMet) {
		this.depth = depth;
		this.name = 'switch';
		this.test = {
			threshold: 1, //switch number 1-5
			evaluationType: 'ON',
		};
		this.conditionMet = conditionMet;
		this.conditionUnMet = conditionUnMet;
	}
	setThresholdOn() {
		this.test.evaluationType = 'ON'
	}
	setThresholdOff() {
		this.test.evaluationType = 'OFF'
	}
	incrementThreshold() {
		this.test.threshold ++
	}
	decrementThreshold() {
		this.test.threshold --
	}
}
module.exports = Switch