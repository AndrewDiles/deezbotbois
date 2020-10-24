const conditionsList = [
	'adjacentTo',
	'aimResults',
	'attribute',
	'consecutiveAims',
	'damageTaken',
	'distanceToTarget',
	'obstructionToTarget',
	'previousCommand',
	'scanResults',
	'sufficientEnergy',
	'weaponLoaded',
]

export default conditionsList;

export const conditionsData = {
	adjacentTo: {
		camel: 'adjacentTo',
		name: 'Adjacent To',
		affect: '',
		generalUse: '',
		useWhen: [
			'',
		],
		testOptions: [
			''
		]
	},
	aimResults: {
		camel: 'aimResults',
		name: 'Aim Results',
		affect: '',
		generalUse: '',
		useWhen: [
			'',
		],
		testOptions: [
			''
		]
	},
	attribute: {
		camel: 'attribute',
		name: 'Attribute',
		affect: '',
		generalUse: '',
		useWhen: [
			'',
		],
		testOptions: [
			''
		]
	},
	consecutiveAims: {
		camel: 'consecutiveAims',
		name: 'Consecutive Aims',
		affect: '',
		generalUse: '',
		useWhen: [
			'',
		],
		testOptions: [
			''
		]
	},
	damageTaken: {
		camel: 'damageTaken',
		name: 'Damage Taken',
		affect: '',
		generalUse: '',
		useWhen: [
			'',
		],
		testOptions: [
			''
		]
	},
	distanceToTarget: {
		camel: 'distanceToTarget',
		name: 'Distance to Target',
		affect: '',
		generalUse: '',
		useWhen: [
			'',
		],
		testOptions: [
			''
		]
	},
	obstructionToTarget : {
		camel: 'obstructionToTarget',
		name: 'Obstruction to Target',
		affect: '',
		generalUse: '',
		useWhen: [
			'',
		],
		testOptions: [
			''
		]
	},
	previousCommand: {
		camel: 'previousCommand',
		name: 'Previous Command',
		affect: '',
		generalUse: '',
		useWhen: [
			'',
		],
		testOptions: [
			''
		]
	},
	scanResults: {
		camel: 'scanResults',
		name: 'Scan Results',
		affect: '',
		generalUse: '',
		useWhen: [
			'',
		],
		testOptions: [
			''
		]
	},
	sufficientEnergy: {
		camel: 'sufficientEnergy',
		name: 'Sufficient Energy',
		affect: '',
		generalUse: '',
		useWhen: [
			'',
		],
		testOptions: [
			''
		]
	},
	weaponLoaded: {
		camel: 'weaponLoaded',
		name: 'Weapon Loaded',
		affect: 'Tests number of ticks left until a selected weapon is ready to be used again against a selected threshold.  Ex: #ticks > 0 ?',
		generalUse: 'Useful when about to execute a command involving a ranged attack.',
		useWhen: [
			'is about to execute a ranged attack',
			'has an option of which weapon to use'
		],
		testOptions: [
			'if ticks remaining is equal to the provided number',
			'if ticks remaining is not equal to the provided number',
			'if ticks remaining is greater-than the provided number',
			'if ticks remaining is less-than the provided number',
		]
	},
}