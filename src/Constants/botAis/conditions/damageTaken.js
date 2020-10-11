class DamageTaken {
  constructor(depth, conditionMet, conditionUnMet) {
		this.depth = depth;
		this.name = 'damageTaken';
		this.test = {
			threshold: 0,
			evaluationType: '>',
		};
		this.conditionMet = conditionMet;
		this.conditionUnMet = conditionUnMet;
	}
	// comparisonOperator can be: ===, !==, >, <
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
module.exports = DamageTaken