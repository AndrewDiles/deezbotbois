class WeaponLoaded {
  constructor(depth, conditionMet, conditionUnMet) {
		this.depth = depth;
		this.name = 'weaponLoaded';
		this.test = {
			threshold: 0,
			evaluationType: '=',
			armSlot: 'arm1',
		};
		this.conditionMet = conditionMet;
		this.conditionUnMet = conditionUnMet;
	}
	// comparisonOperator can be: =, ≠, >, <
	setEvaluation(comparisonOperator) {
		this.test.evaluationType = comparisonOperator
	}
	// comparisonOperator can be: arm1, arm2, arm3
	setSlot(slotName) {
		this.test.armSlot = slotName
	}
	incrementThreshold() {
		this.test.threshold ++
	}
	decrementThreshold() {
		this.test.threshold --
	}
}
module.exports = WeaponLoaded