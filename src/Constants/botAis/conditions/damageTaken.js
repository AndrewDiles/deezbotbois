class DamageTaken {
  constructor(depth, conditionMet, conditionUnMet) {
		// TODO: May want to allow changes in threshold in increments of 0.1
		this.depth = depth;
		this.name = 'damageTaken';
		this.test = {
			threshold: 0,
			evaluationType: '>',
		};
		this.conditionMet = conditionMet;
		this.conditionUnMet = conditionUnMet;
	}
	// comparisonOperator can be: =, ≠, >, <
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