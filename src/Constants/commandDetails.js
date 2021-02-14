const commandDetails = {
	//TODO: finish several of these
	aimAndAttackCommand: {
		cost: 'The energy cost is the sum of the costs of an AIM command + a RANGED-ATTACK command.',
		speed: 11,
		affect: "The execution of this command will cause the executor to point a ranged weapon and fire it.  Using this command, a weapon may be pointed: by a rotational increment, to a set angle, or at a scanned target.",
		generalUse: 'This is a tick-efficient command that combinds two commands.',
		useWhen: [
			'has detected the presence of a hostile more than one cell away',
			'is not both adjacent to a hostile with a melee weapon equipped',
			'is predicting the location of an hostile, or has limited the likely locations they may be'
		],
		instructionOptions: [
			'selection of an equiped ranged weapon',
			'aiming methods:',
			'scanned target and target number',
			'by increment and increment value',
			'set direction and direction'
		]
	},
	aimCommand: {
		cost: "The energy cost depends on the bot's model, equipment and unlocked technologies.",
		speed: 21,
		affect: "The execution of this command will cause the executor to point a ranged weapon.  Using this command, a weapon may be pointed by a rotational increment or to a set angle.",
		generalUse: 'This command allows for incremental sweeping for hostiles at a low energy cost.',
		useWhen: [
			'has not detected the presence of any hostiles',
			'has not taken damage in the previous tick',
			'is employing a stationary-ranged strategy'
		],
		instructionOptions: [
			'selection of an equiped ranged weapon',
			'aiming methods:',
			'by increment and increment value',
			'set direction and direction'
		]
	},
	chargeCommand: {
		cost: 'The energy cost is the sum of the costs of a MOVE command + a MELEE-ATTACK command.',
		speed: 15,
		affect: "The execution of this command will cause the executor to move adjacent to a target and make a MELEE-ATTACK.",
		generalUse: 'With enough Scan Distance and Move Distance, a bot desinged for melee conflicts can enter into an effective loop of SCAN and CHARGE or SCAN and MELEE-ATTACK once they locate a hostile.',
		useWhen: [
			'has detected the presence of a hostile more than one cell away',
			'is employing a forced-melee strategy'
		],
		instructionOptions: [
			'selection of an equiped ranged weapon',
			'must select a scanned target to charge'
		]
	},
	counterCommand: {
		cost: 'The same cost as a MELEE-ATTACK with the selected equipment.',
		speed: 3,
		affect: "For the remainder of the tick, the executor of this command will have their Armor and Shield multiplied twofold against incoming MELEE-ATTACKs, and, upon such an attack, the executor will attack the agressor with a MELEE-ATTACK.",
		generalUse: 'Great to use repeatdely when an adjacent hostile unit initiated a conflict.',
		useWhen: [
			'has detected the presence of a hostile exactly one cell away',
			'has not began the conflict'
		],
		instructionOptions: [
			'Required for execution: A selected equipped melee weapon'
		]
	},
	elevenAttackCommand: {
		cost: 'Twice the cost of a MELEE-ATTACK or RANGED-ATTACK with the selected weapon.',
		speed: 13,
		affect: "The executor of this command will perform an attack with an energy weapon that deals twice as much damage.",
		generalUse: 'Best used as a source of burst damage when a hostile has been scanned.',
		useWhen: [
			'has detected the presence of a hostile',
			'has a large amount of energy stored in their Capacitor',
			'ranged aiming methods:',
			'scanned target and target number',
			'by increment and increment value',
			'set direction and direction',
			'melee attack direction methods:',
			'scanned target and target number',
			'at a given direction'
		],
		instructionOptions: [
			'selection of type of attack: melee or ranged',
			'selection of an equiped Energy weapon of the correct type',
		]
	},
	guardCommand: {
		cost: 7,
		speed: 2,
		affect: "The executor of this command will have their Armor and Shield multiplied threefold for the remainder of the tick.",
		generalUse: 'Best used as a source of burst damage when a hostile has been scanned.',
		useWhen: [
			'has detected the presence of a hostile',
			'has a large amount of energy stored in their Capacitor'
		],
		instructionOptions: [
			
		]
	},
	meleeAttackCommand: {
		cost: "The energy cost depends on the bot's model, equipment and unlocked technologies.",
		speed: 11,
		affect: "The execution of this command will cause the executor to attack a direction or target with a melee weapon",
		generalUse: "Best used when adjacent to a hostile.",
		useWhen: [
			'is employing a forced-melee strategy',
			'is willing to exchange blows'
		],
		instructionOptions: [
			'Required for execution: A selected equipped melee weapon',
			'scanned target and target number',
			'at a given direction'
		]
	},
	moveCommand: {
		cost: "The energy cost depends on the bot's model, equipment and unlocked technologies.",
		speed: 17,
		affect: "The execution of this command will cause the executor to attempt to change its location on the battlefield",
		generalUse: "Best used to evade losing encounters, to change the scan origin location or to cause collisions.",
		useWhen: [
			'is adjacent to a hostile and melee attacks are not a viable win condition',
			'no hostiles are in your scan area'
		],
		instructionOptions: [
			
		]
	},
	ramCommand: {
		cost: "Equivalent to a Move command which depends on the bot's model, equipment and unlocked technologies.",
		speed: 15,
		affect: ".",
		generalUse: "Best used as a primary attack when employing a collision strategy.",
		useWhen: [
			'',
		],
		instructionOptions: [
			
		]
	},
	rangedAttackCommand: {
		cost: ".",
		speed: 11,
		affect: ".",
		generalUse: ".",
		useWhen: [
			'',
		],
		instructionOptions: [
			
		]
	},
	rechargeCommand: {
		cost: 0,
		speed: 24,
		affect: "The execution of this command will recharge the executor's Capacitor by a value equal to their Reactor - effectively doubling their Reactor for the tick",
		generalUse: ".",
		useWhen: [
			'',
		],
		instructionOptions: [
			
		]
	},
	redirectCommand: {
		cost: 15,
		speed: 4,
		affect: ".",
		generalUse: ".",
		useWhen: [
			'',
		],
		instructionOptions: [
			
		]
	},
	repairCommand: {
		cost: 12,
		speed: 23,
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
		speed: 22,
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
	switchCommand: {
		cost: 0,
		speed: 1,
		affect: "The execution of this command will allow the executor to set the state of all five switches.",
		generalUse: 'This can indicate when certain conditions are met.',
		useWhen: [
			'has met certain criteria and the switch is in the incorrect position',
		],
		instructionOptions: [
			'Each individual switch can be set to ON or OFF',
			'Alternatively, a switch can be flipped to its opposite state',
			'Finally, a switch can be left unchanged'
		]
	},
	waitCommand: {
		cost: 0,
		speed: 0,
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