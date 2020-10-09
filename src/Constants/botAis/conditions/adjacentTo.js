class AdjacentTo {
  constructor() {
		this.name = 'adjacentTo';
		const test = {
			testTargets: 'hostile',
			evaluationType: '===',
			testReturn: 'any'
		}
		this.test = test;
		this.conditionMet = [];
		conditionMet.conditionUnMet = [];
	}
	targetHostiles() {
		this.test.testTargets = 'hostile'
	}
	targetFriendlies() {
		this.test.testTargets = 'friend'
	}
	targetWalls() {
		this.test.testTargets = 'wall'
	}
	targetCorner() {
		this.test.testTargets = 'corner'
	}
	evaluateEquals() {
		this.test.evaluationType = '==='
	}
	evaluateNotEquals() {
		this.test.evaluationType = '!=='
	}
	returnAny() {
		this.test.testReturn = 'any'
	}
	returnU() {
		this.test.testReturn = 'U'
	}
	returnD() {
		this.test.testReturn = 'D'
	}
	returnL() {
		this.test.testReturn = 'L'
	}
	returnR() {
		this.test.testReturn = 'R'
	}
	returnUL() {
		this.test.testReturn = 'UL'
	}
	returnUR() {
		this.test.testReturn = 'UR'
	}
	returnDL() {
		this.test.testReturn = 'DL'
	}
	returnDR() {
		this.test.testReturn = 'DR'
	}
}
export default AdjacentTo