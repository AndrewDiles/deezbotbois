const commandDetails = {
	aimAndAttackCommand: {
		affect: "The execution of this command will cause the executor to point a ranged weapon and fire it.  Using this command, a weapon may be pointed: by a rotational increment, to a set angle, or at a scanned target.",
		generalUse: 'This is a tick-efficient command',
		useWhen: [
			'has detected the presence of an enemies more than one cell away',
			'does not have a melee weapon equipped',
			'is predicting the location of an enemy'
		],
		instructionOptions: [
			
		]
		
	},
	aimCommand: {

	},
	chargeCommand: {

	},
	counterCommand: {

	},
	elevenAttackCommand: {

	},
	guardCommand: {

	},
	meleeAttackCommand: {

	},
	moveCommand: {

	},
	ramCommand: {

	},
	rangedAttackCommand: {

	},
	rechargeCommand: {

	},
	redirectCommand: {

	},
	repairCommand: {

	},
	scanCommand: {
		affect: "The execution of this command will provide the executor with the contents, be it wall, hostile or friendly, of each cell up to a distance of the executor's Scan Distance from the executor.",
		generalUse: 'This is the primary means through which bots discover where other bots are positioned.',
		useWhen: [
			'has not detected the presence of any hostiles',
			'has executed a MOVE command in the previous tick',
			'has enough stored Energy to attack a scanned hostile in the following turn',
		],
		instructionOptions: [

		]
	},
	waitCommand: {
		affect: 'The execution of this command will cause the executor to perform no action.',
		generalUse: 'This can be useful as a means of regathering energy.',
		useWhen: [
			'has not detected the presence of any hostiles',
			'has not taken damage in the previous tick',
			'does not have a full Capacitor'
		],
		instructionOptions: [

		]
	}
}
export default commandDetails