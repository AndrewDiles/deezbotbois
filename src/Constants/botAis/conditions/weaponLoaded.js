class WeaponLoaded {
  constructor(depth) {
		this.depth = depth;
		this.condition = {
			name: 'weaponLoaded',
			test: {
				threshold: 0,
				evaluationType: '===',
				armSlot: 'arm1',
			},
			conditionMet: [],
			conditionUnMet: []
		}
	}
	// comparisonOperator can be: ===, !==, >, <
	setEvaluation(comparisonOperator) {
		this.condition.test.evaluationType = comparisonOperator
	}
	// comparisonOperator can be: arm1, arm2, arm3
	setSlot(slotName) {
		this.condition.test.armSlot = slotName
	}
	incrementThreshold() {
		this.condition.test.threshold ++
	}
	decrementThreshold() {
		this.condition.test.threshold --
	}
}
export default WeaponLoaded