class attribute {
  constructor() {
		this.name = 'attribute';
		const test = {
			testTargets: 'durability',
			evaluationType: '>',
			threshold: 1,
		}
		this.test = test;
		this.conditionMet = [];
		conditionMet.conditionUnMet = [];
	}
	targetDurability() {
		this.test.testTargets = 'durability'
	}
	targetCapacitor() {
		this.test.testTargets = 'capacitor'
	}
	evaluateEquals() {
		this.test.evaluationType = '==='
	}
	evaluateGreaterThan() {
		this.test.evaluationType = '>'
	}
	evaluateLessThan() {
		this.test.evaluationType = '<'
	}
	incrementThreshold() {
		this.test.threshold ++
	}
	decrementThreshold() {
		this.test.threshold --
	}
}
export default AdjacentTo