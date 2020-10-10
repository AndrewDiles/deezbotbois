class AdjacentTo {
  constructor(depth, conditionMet, conditionUnMet) {
		this.depth = depth;
		this.condition = {
			name: 'adjacentTo',
			test: {
				testTargets: 'hostile',
				evaluationType: '===',
				testReturn: 'any'
			},
			conditionMet: conditionMet,
			conditionUnMet: conditionUnMet
		}
	}
	// newTarget can be: hostile, friend, wall, corner
	setTarget(newTarget) {
		this.condition.test.testTargets = newTarget
	}
	// comparisonOperator can be: ===, !==
	setEvaluation(comparisonOperator) {
		this.condition.test.evaluationType = comparisonOperator
	}
	// value can be: any, U, D, L, R, UR, UL, DR, DL
	setReturn(value) {
		this.condition.test.testReturn = value;
	}
}
export default AdjacentTo