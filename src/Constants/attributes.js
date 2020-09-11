const baseBotAttributes = {
	BotBiggey: {
		Durability: 30,
		Armor: 4,
		Shield: 2,
		Accuracy: 14,
		Power: 14,
		Capacitor: 75,
		Reactor: 12,
		AutoRepair: 0,
		ScanDistance: 2,
		ScanCost: 10,
		MovementDistance: 1,
		MovementCost: 30,
		CollisionAmplifier: 1,
		WeaponSlots: 2,
		AccessorySlots: 3,
		Initiative: 7,
		Description: "Dicephalous heavy unit.",
		Special1: "+1 Weapon slot",
		Special2: "+1 Scan distance",
		Special3: "+50% Movement energy cost"
	},
  BotBoxey: {
		Durability: 20,
		Armor: 3,
		Shield: 3,
		Accuracy: 10,
		Power: 10,
		Capacitor: 100,
		Reactor: 10,
		AutoRepair: 0,
		ScanDistance: 2,
		ScanCost: 10,
		MovementDistance: 1,
		MovementCost: 20,
		CollisionAmplifier: 1,
		WeaponSlots: 1,
		AccessorySlots: 4,
		Initiative: 9,
		Description: "Jack of all trades, master of none.",
		Special1: "+1 Accessory slot",
		Special2: "-",
		Special3: "-",
		BlueStarConversionRate: 1,
		TechTree: [
			null,
			{
				Durability: 1,
				Cost: 1
			},
			{
				aimCost: -1,
				Cost: 1
			},
			null,
			{
				Armor: 1,
				Cost: 2
			},
			{
				Durability: 2,
				Cost: 2
			},
			{
				attackCost: -2,
				Cost: 3
			},
			{
				ScanCost: -1,
				Cost: 2
			},
			{
				Shield: 1,
				Cost: 2
			},
			{
				MovementDistance: 1,
				Cost: 4
			},
			{
				Damage: 1,
				Cost: 4
			},
			{
				reloadTime: -1,
				Cost: 5
			},
			{
				ArmorVsPiercingMultiplier: 2,
				Cost: 5
			},
			{
				chargeAction: true,
				Cost: 5
			},
			{
				AutoRepair: .1,
				Cost: 6
			},
			{
				ScanDistance: 1,
				Cost: 2
			},
			{
				CollisionDamageMultipliter: 0.5,
				Cost: 7
			},
			{
				MeleeDamageMultiplier: 2,
				Cost: 7
			},
			{
				RangedDamageMultiplier: 1.5,
				Cost: 10
			},
			{
				MovementDistance: 1,
				Cost: 4
			}
		]
	},
	BotJager: {
		Durability: 20,
		Armor: 2,
		Shield: 4,
		Accuracy: 8,
		Power: 10,
		Capacitor: 125,
		Reactor: 12,
		AutoRepair: 0,
		ScanDistance: 2,
		ScanCost: 20,
		MovementDistance: 2,
		MovementCost: 30,
		CollisionAmplifier: 1,
		WeaponSlots: 1,
		AccessorySlots: 3,
		Initiative: 15,
		Description: "Monocular versatile unit.",
		Special1: "+1 Movement distance",
		Special2: "+50% Movement cost",
		Special3: "+100% Scan energy cost"
	},
	BotLumpey: {
		Durability: 40,
		Armor: 5,
		Shield: 4,
		Accuracy: 12,
		Power: 15,
		Capacitor: 60,
		Reactor: 12,
		AutoRepair: .1,
		ScanDistance: 2,
		ScanCost: 10,
		MovementDistance: 0,
		MovementCost: 255,
		CollisionAmplifier: 1,
		WeaponSlots: 2,
		AccessorySlots: 0,
		Initiative: 3,
		Description: "Immobile war machine!",
		Special1: "+1 Weapon slot",
		Special2: "-3 Accessory slots",
		Special3: "+.1 AutoRepair"
	},
	BotRobbey: {
		Durability: 14,
		Armor: 3,
		Shield: 2,
		Accuracy: 11,
		Power: 11,
		Capacitor: 200,
		Reactor: 6,
		AutoRepair: 0,
		ScanDistance: 2,
		ScanCost: 10,
		MovementDistance: 2,
		MovementCost: 20,
		CollisionAmplifier: 1,
		WeaponSlots: 2,
		AccessorySlots: 3,
		Initiative: 11,
		Description: "Advanced glass cannon.",
		Special1: "+1 Weapon slot",
		Special2: "+1 Movement distance",
		Special3: "Warning: Weak Reactor!"
	},
	BotSpikey: {
		Durability: 20,
		Armor: 5,
		Shield: 1,
		Accuracy: 8,
		Power: 10,
		Capacitor: 100,
		Reactor: 10,
		AutoRepair: 0,
		ScanDistance: 3,
		ScanCost: 10,
		MovementDistance: 3,
		MovementCost: 20,
		CollisionAmplifier: 2,
		WeaponSlots: 1,
		AccessorySlots: 3,
		Initiative: 13,
		Description: "Inescapable suicide unit.",
		Special1: "+1 Scan distance",
		Special2: "+2 Movement Distance",
		Special3: "+100% Ram damage"
	},
	BotZippey: {
		Durability: 10,
		Armor: 2,
		Shield: 2,
		Accuracy: 14,
		Power: 5,
		Capacitor: 100,
		Reactor: 10,
		AutoRepair: 0,
		ScanDistance: 2,
		ScanCost: 10,
		MovementDistance: 2,
		MovementCost: 10,
		CollisionAmplifier: 1,
		WeaponSlots: 1,
		AccessorySlots: 3,
		Initiative: 20,
		Description: "Frail run and gunner.",
		Special1: "+1 Movement distance",
		Special2: "Highest initiative",
		Special3: "Warning: Low Durability!"
	}
}
export default baseBotAttributes;
export const attributeInfo = {
	Durability: 'Durability: Maximum sustainable damage +1',
	Armor: 'Armor: Provides damage reduction from everything but "Energy" attacks',
	Shield: 'Shield: Provides damage reduction from everything but "Piercing Melee" attacks',
	Accuracy: 'Accuracy: Increases damage from weapons with subType "Accuracy"',
	Power: 'Power: Increases damage from weapons with subType "Power"',
	Capacitor: 'Capacitor: Maximum energy stored [kJ]',
	Reactor: 'Reactor: Maximum energy recharged [kW]',
	AutoRepair: 'Auto Repair: Total durability recovered over each tick',
	ScanDistance: 'Scan Distance: Maximum distance that bots will be detected using a scan',
	ScanCost: 'Scan Cost: Energy cost to scan [kJ]',
	MovementDistance: 'Movement Distance: Maximum traversable distance in one tick',
	MovementCost: 'Movement Cost: Energy cost to move up to Movement Distance [kJ]',
	CollisionAmplifier: 'Collision Amplifier: Multiplier on damage dealt during a collision',
	WeaponSlots: 'Weapon Slots: Maximum number of equipable weapons',
	AccessorySlots: 'Accessory Slots: Maximum number of equipable accessories',
	Initiative: 'Initiative: Helps determine action priority when multiple bots perform the same action',

	// Below are technically not attributes, but are useful for the AttributeHeader
	Attribute: 'Column of associated attributes',
	Base: 'Base attribute value from model',
	Equipment: 'Net attribute change from equipment',
	Tech: 'Net attribute change from tech tree',
	PlusMinus: 'Increase/decrease from upcoming change',
	PercentChange: 'Increase/decrease from upcoming change as a percent',
	Sum: "Build's total attribute value"
}
export const displayedAttributes = [
	'BAR',
	'Durability',
	'Armor',
	'Shield',
	'Accuracy',
	'Power',
	'Capacitor',
	'Reactor',
	'AutoRepair',
	'ScanDistance',
	'ScanCost',
	'MovementDistance',
	'MovementCost',
	'Initiative'
]
