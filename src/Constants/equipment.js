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
		AutoRepair: .1,
	},
	batteryPack: {
		name: 'Battery Pack',
		description: 'Ghetto add-on to aid with energy "production".',
		Reactor: 1,
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
	Gun1: {
		name: "Pewpew",
		description: "Handgun of questionable efficacy and naming.",
		damage: 8,
		superTypes: ['Ranged'],
		subTypes: ['Piercing', 'Accuracy'],
		projectileSpeed: 4,
		attackShape: 'line',
		reloadTime: 2,
		attackCost: 20,
		aimCost: 5,
	},
	Sword1: {
		name: "Busted Sword",
		description: "A sword that was once great.",
		damage: 11,
		superTypes: ['Melee'],
		subTypes: ['Piercing', 'Power'],
		attackShape: 'adjacentCell',
		attackCost: 20,
	},
	Hammer1: {
		name: "Bambam",
		description: "Primitive doesn't always mean inferior.",
		damage: 13,
		superTypes: ['Melee'],
		subTypes: ['Crushing', 'Power'],
		attackShape: 'adjacentCell',
		attackCost: 25,
	}
}
export const attackShapes = {
	adjacentCell : [
		null, null, null, null, null, null,
		null, null, null, null, null, null,
		null, 'violet', null, null, null, null,
		null, null, 'lime', 'red', null, null,
		null, null, null, null, null, null,
		null, null, null, null, null, null,
	],
	line : [
		null, null, null, null, null, null,
		null, null, null, null, null, null,
		null, null, null, null, 'red', 'red',
		null, null, 'red', 'red', null, null,
		null, 'lime', 'violet', 'violet', 'violet', 'violet',
		null, null, null, null, null, null,
	],
	cone : [
		null, null, null, null, null, null,
		null, 'violet', null, null, null, null,
		null, 'violet', 'violet', 'lime', null, null,
		null, 'violet', null, null, 'red', 'red',
		null, null, null, null, 'red', 'red',
		null, null, null, null, null, null,
	]
}