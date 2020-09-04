export const equipmentSlots = [
	'arm1',
	'arm1',
	'arm3',
	'acc1',
	'acc2',
	'acc3',
	'acc4',
	'acc5'
];

export const accessoryStats = {
	thickPaint : {
		name: 'Thick Paint',
		description: 'Poor workmanship has its upsides.',
		Durability: 1,
	},
	antenna : {
		name: 'Antenna',
		description: 'A thin metal rod and old chewing gum.',
		ScanDistance: 1,
	},
	minorShieldBooster : {
		name: 'Minor Shield Booster',
		description: 'Attachment that reroutes energy to your shield.',
		Shield: 1,
		Capacitor: -5,
	},
	plateCoat : {
		name: 'Plate Coat',
		description: 'A coat of metal to protect metal...',
		Armor: 1,
		MovementCost: 2,
	},
	solderingNanobots: {
		name: 'Soldering Nanobots',
		description: 'Miniscule metal miracle workers.',
		AutoRepair: 1,
	},
	batteryPack: {
		name: 'Battery Pack',
		description: 'Ghetto add-on to aid with energy "production".',
		Reactor: 2,
	},
	powerGlove: {
		name: 'Power Glove',
		description: "Now you're swinging with power!",
		Power: 2,
	},
	wd40 : {
		name: "WD-40",
		description: "Mistaken for a lubricant, but it works...",
		MovementCost: -2,
	}
}
export const weaponStats = {
	gun1: {
		name: "pewpew",
		description: "Handgun of questionable efficacy and naming.",
		damage: 8,
		superTypes: ['Ranged'],
		subTypes: ['Piercing', 'Accuracy'],
		reloadTime: 2,
		fireCost: 20,
		targetFireCost: 30,
		aimCost: 5,
	}
}