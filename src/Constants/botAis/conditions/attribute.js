class Attribute {
  constructor(depth, conditionMet, conditionUnMet) {
		this.depth = depth;
		this.name = 'attribute';
		this.test = {
			testTargets: 'durability',
			evaluationType: '>',
			threshold: 1
		};
		this.conditionMet = conditionMet;
		this.conditionUnMet = conditionUnMet;
	}
	// newTarget can be: durability , capacitor
	setTarget(newTarget) {
		this.test.testTargets = newTarget
	}
	
	// comparisonOperator can be: ===, >, <
	setEvaluation(comparisonOperator) {
		this.test.evaluationType = comparisonOperator
	}
	incrementThreshold() {
		this.test.threshold ++
	}
	decrementThreshold() {
		this.test.threshold --
	}
}
module.exports = Attribute