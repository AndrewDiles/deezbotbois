class AdjacentTo {
  constructor(depth, conditionMet, conditionUnMet) {
		this.depth = depth;
		this.name = 'adjacentTo';
		this.test = {
			testTargets: 'hostile',
			evaluationType: '===',
			testReturn: 'any'
		};
		this.conditionMet = conditionMet;
		this.conditionUnMet = conditionUnMet;
	}
	// newTarget can be: hostile, friend, wall, corner
	setTarget(newTarget) {
		this.test.testTargets = newTarget
	}
	// comparisonOperator can be: ===, !==
	setEvaluation(comparisonOperator) {
		this.test.evaluationType = comparisonOperator
	}
	// value can be: any, U, D, L, R, UR, UL, DR, DL
	setReturn(value) {
		this.test.testReturn = value;
	}
}
// export default AdjacentTo
module.exports = AdjacentTo