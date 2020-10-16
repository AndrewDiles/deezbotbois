const commandDetails = {
	aimAndAttackCommand: {
		cost: 'The energy cost is the sum of the costs of an AIM command + a RANGED-ATTACK command.',
		affect: "The execution of this command will cause the executor to point a ranged weapon and fire it.  Using this command, a weapon may be pointed: by a rotational increment, to a set angle, or at a scanned target.",
		generalUse: 'This is a tick-efficient command that combinds two commands',
		useWhen: [
			'has detected the presence of a hostile more than one cell away',
			'is not both adjacent to a hostile with a melee weapon equipped',
			'is predicting the location of an hostile, or has limited the likely locations they may be'
		],
		instructionOptions: [
			
		]
	},
	aimCommand: {
		cost: "The energy cost depends on the bot's model, equipment and unlocked technologies.",
		affect: "The execution of this command will cause the executor to point a ranged weapon.  Using this command, a weapon may be pointed by a rotational increment or to a set angle.",
		generalUse: 'This command allows for incremental sweeping for hostiles at a low energy cost',
		useWhen: [
			'has not detected the presence of any hostiles',
			'has not taken damage in the previous tick',
			'is employing stationary-ranged strategy'
		],
		instructionOptions: [
			
		]
	},
	chargeCommand: {
		cost: 'The energy cost is the sum of the costs of a MOVE command + a MELEE-ATTACK command.',
		affect: "The execution of this command will cause the executor to move adjacent to a target and make a MELEE-ATTACK.",
		generalUse: 'With enough Scan Distance and Move Distance, a bot desinged for melee conflicts can enter into an effective loop of SCAN and CHARGE or SCAN and MELEE-ATTACK once they locate a hostile.',
		useWhen: [
			'has detected the presence of a hostile more than one cell away',
			'is employing a forced-melee strategy'
		],
		instructionOptions: [
			
		]
	},
	counterCommand: {
		cost: 'The same cost as a MELEE-ATTACK with the selected equipment',
		affect: "For the remainder of the tick, the executor of this command will have their Shield and Armor multiplied twofold against incoming MELEE-ATTACKs, and, upon such an attack, the executor will attack the agressor with a MELEE-ATTACK.",
		generalUse: 'Great to use repeatdely when an adjacent hostile unit initiated a conflict',
		useWhen: [
			'has detected the presence of a hostile exactly one cell away',
			'has not began the conflict'
		],
		instructionOptions: [
			
		]
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
		cost: 12,
		affect: "The execution of this command will increase the executor's current Durability by 1.  This command cannot increase the current Durability to a value greater than the executor's maximum Durability.",
		generalUse: 'When it is safe to do so, repairing damage is an excellent form of preparation for the next conflict.',
		useWhen: [
			'has not detected the presence of any hostiles',
			"'s current Durability is less than their maximum Durability",
		],
		instructionOptions: [
			// this command does not take Instructions
		]
	},
	scanCommand: {
		cost: "The energy cost depends on the bot's model, equipment and unlocked technologies.",
		affect: "The execution of this command will provide the executor with the contents, be it wall, hostile or friendly, of each cell up to a distance of the executor's Scan Distance from the executor.",
		generalUse: 'This is the primary means through which bots discover where other bots are positioned.',
		useWhen: [
			'has not detected the presence of any hostiles',
			'has executed a MOVE command in the previous tick',
			'has enough stored energy to attack a scanned hostile in the following turn',
		],
		instructionOptions: [
			// this command does not take Instructions
		]
	},
	waitCommand: {
		cost: 0,
		affect: 'The execution of this command will cause the executor to perform no action.',
		generalUse: 'This can be useful as a means of regathering energy.',
		useWhen: [
			'has not detected the presence of any hostiles',
			'has not taken damage in the previous tick',
			'does not have a full Capacitor'
		],
		instructionOptions: [
			// this command does not take Instructions
		]
	}
}
export default commandDetails