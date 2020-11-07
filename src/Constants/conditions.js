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

// TODO: complete conditionsData

export const conditionsData = {
	adjacentTo: {
		camel: 'adjacentTo',
		name: 'Adjacent To',
		affect: 'Tests a set direction one cell away from the executor and looks for contents of a selected type',
		generalUse: 'Useful for wall navigation and to quicly test if beside a hostile bot.',
		useWhen: [
			'is about to execute a MOVE command',
			'is employing a wall or corner strategy',
		],
		testOptions: [
			'if executor is adjacent to a hostile, friend, wall or corner',
			'the direction of said obstacle',
			'the type of said obstacle'
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
		affect: 'Tests whether or not there is an obstacle between the executor of a SCAN command and a scanned target.',
		generalUse: 'Useful to guage expected outcomes of commands.',
		useWhen: [
			'is about to execute a MOVE command toward a scanned target',
			'is about to execute a ranged attack on a scanned target'
		],
		testOptions: [
			'if there is another bot along the shortest path to a scanned target'
		]
	},
	previousCommand: {
		camel: 'previousCommand',
		name: 'Previous Command',
		affect: 'Tests whether or not a selected command was executed in the previous tick.',
		generalUse: 'Useful to determine which step a bot is on during a sequence of commands.',
		useWhen: [
			'is incrementally aiming',
			'is employing a simple-sequence strategy',
			'has satisfied the conditions to enter into a subroutine'
		],
		testOptions: [
			'if the bot executed the selected command on the previous tick'
		]
	},
	scanResults: {
		camel: 'scanResults',
		name: 'Scan Results',
		affect: 'Tests information from the end of the previous tick from a SCAN command or the auto-scan. Ex1: # of Hostiles Scanned > 0   Ex2: # of nonFriends = 0 ',
		generalUse: 'Useful to find the location of other bots and walls.',
		useWhen: [
			'has executed a MOVE command',
			'is searching for a hostile bot',
			'is searching for walls',
			'is searching for a corner'
		],
		testOptions: [
			'if a scan does or does not contain a selected return',
			'if the multiplicity of selected returns is greater-than or less-than a provided number',
			'if the multiplicity of selected returns is equal or not equal to than a provided number',
		]
	},
	sufficientEnergy: {
		camel: 'sufficientEnergy',
		name: 'Sufficient Energy',
		affect: 'Tests if the bot has enough energy in their Capacitor to execute a selected command.',
		generalUse: 'Useful to know when a command will be executed and not ignored due to an impossibility to execute.',
		useWhen: [
			'is about to execute a command',
		],
		testOptions: [
			'if the bot has enough stored energy to perform a selected action',
			'if the bot has enough stored energy to perform an attack with a specific weapon'
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
			'if ticks remaining is equal or not equal to the provided number',
			'if ticks remaining is greater-than or less-than the provided number',
	
		]
	},
}