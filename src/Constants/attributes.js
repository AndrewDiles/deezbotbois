import BotBiggey from "../Components/Bots/BotBiggey";

const baseBotAttributes = {
	BotBiggey: {
		Name: 'Biggey',
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
		Special3: "+50% Movement energy cost",
		BlueStarConversionRate: 1.5,
		TechTree: [
			null,
			{
				affect: 'Armor',
				magnitude: 2,
				cost: 5,
				techMessage: "Inceases Armor by 2 at a cost of 5 Bits"
			},
			{
				affect: 'Shield',
				magnitude: 2,
				cost: 5,
				techMessage: "Inceases Shield by 2 at a cost of 5 Bits"
			},
			null,
			{
				affect: 'ScanDistance',
				magnitude: 1,
				cost: 5,
				techMessage: "Increases Scan Distance by 1 at a cost of 5 Bits"
			},
			{
				affect: 'Capacitor',
				magnitude: -10,
				cost: 0,
				techMessage: "Reduces Capacitor by 10 at no Bit cost"
			},
			{
				affect: 'Capacitor',
				magnitude: -10,
				cost: 0,
				techMessage: "Reduces Capacitor by 10 at no Bit cost"
			},
			{
				affect: 'ShieldVsEnergyMultiplier',
				magnitude: 2,
				cost: 5,
				techMessage: "Inceases Shield by 100% against Energy attacks at a cost of 5 Bits"
			},
			{
				affect: 'Power',
				magnitude: 2,
				cost: 7,
				techMessage: "Inceases Power by 2 at a cost of 7 Bits"
			},
			{
				affect: 'Durability',
				magnitude: 5,
				cost: 3,
				techMessage: "Inceases Durability by 5 at a cost of 3 Bits"
			},
			{
				affect: 'Reactor',
				magnitude: 1,
				cost: 8,
				techMessage: "Inceases Reactor by 1 at a cost of 8 Bits"
			},
			{
				affect: 'Accuracy',
				magnitude: 2,
				cost: 9,
				techMessage: "Increases Accuracy by 2 at a cost of 9 Bits"
			},
			{
				affect: 'ScanCost',
				magnitude: 2,
				cost: 0,
				techMessage: "Increases Scan's Energy Cost by 2 at no Bit cost"
			},
			{
				affect: 'AttackCost',
				magnitude: 2,
				cost: 0,
				techMessage: "Increases Attack's Energy Cost by 2 at no Bit cost"
			},
			{
				affect: 'MovementCost',
				magnitude: 10,
				cost: 0,
				techMessage: "Increases Movement's Cost by 10 at no Bit cost"
			},
			{
				affect: 'aimCost',
				magnitude: 2,
				cost: 0,
				techMessage: "Increases Aim's Cost by 2 at no Bit cost"
			},
			{
				affect: 'MeleeArmorPenetration',
				magnitude: 0.5,
				cost: 12,
				techMessage: "Reduces opponent's Armor by 50% against your Melee attacks at a cost of 12 Bits"
			},
			{
				affect: 'Reactor',
				magnitude: 2,
				cost: 15,
				techMessage: "Inceases Reactor by 2 at a cost of 15 Bits"
			},
			{
				affect: 'MovementDistance',
				magnitude: 1,
				cost: 6,
				techMessage: "Inceases Movement Distance by 1 at a cost of 6 Bits"
			},
			{
				affect: 'RangedShieldPenetration',
				magnitude: 0.5,
				cost: 15,
				techMessage: "Reduces opponent's Shield by 50% against your Ranged attacks at a cost of 15 Bits"
			},
			null,
			{
				affect: 'weaponSlot',
				magnitude: 1,
				cost: 2,
				techMessage: "Unlocks an additional weapon slot at the cost of 2 Bits"
			},
			{
				affect: 'guardCommand',
				magnitude: true,
				cost: 2,
				techMessage: "Unlocks the GUARD command at a cost of 2 Bits"
			},
			null
		]
	},
  BotBoxey: {
		Name: 'Boxey',
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
				affect: 'Durability',
				magnitude: 1,
				cost: 1,
				techMessage: "Inceases Durability by 1 at a cost of 1 Bit"
			},
			{
				affect: 'aimCost',
				magnitude: -1,
				cost: 1,
				techMessage: "Reduces Aim's Energy Cost by 1 at a cost of 1 Bit"
			},
			null,
			{
				affect: 'Armor',
				magnitude: 1,
				cost: 2,
				techMessage: "Inceases Armor by 1 at a cost of 2 Bits"
			},
			{
				affect: 'Durability',
				magnitude: 2,
				cost: 2,
				techMessage: "Inceases Durability by 2 at a cost of 2 Bits"
			},
			{
				affect: 'attackCost',
				magnitude: -2,
				cost: 3,
				techMessage: "Reduces Attack's Energy Cost by 2 at a cost of 3 Bits"
			},
			{
				affect: 'ScanCost',
				magnitude: -1,
				cost: 2,
				techMessage: "Reduces Scan's Energy Cost by 1 at a cost of 2 Bits"
			},
			{
				affect: 'Shield',
				magnitude: 1,
				cost: 2,
				techMessage: "Inceases Shield by 1 at a cost of 2 Bits"
			},
			{
				affect: 'MovementDistance',
				magnitude: 1,
				cost: 4,
				techMessage: "Inceases Movement Distance by 1 at a cost of 4 Bits"
			},
			{
				affect: 'Damage',
				magnitude: 1,
				cost: 4,
				techMessage: "Inceases Damage by 1 at a cost of 4 Bits"
			},
			{
				affect: 'ScanDistance',
				magnitude: 1,
				cost: 3,
				techMessage: "Increases Scan Distance by 1 at a cost of 3 Bits"
			},
			{
				affect: 'ArmorVsPiercingMultiplier',
				magnitude: 2,
				cost: 5,
				techMessage: "Inceases Armor by 100% against Piercing attacks at a cost of 5 Bits"
			},
			{
				affect: 'chargeCommand',
				magnitude: true,
				cost: 5,
				techMessage: "Unlocks the CHARGE command at a cost of 5 Bits"
			},
			{
				affect: 'AutoRepair',
				magnitude: .1,
				cost: 6,
				techMessage: "Increases Auto Repair by 0.1 at a cost of 6 Bits"
			},
			{
				affect: 'MovementDistance',
				magnitude: 1,
				cost: 4,
				techMessage: "Inceases Movement Distance by 1 at a cost of 4 Bits"
			},
			{
				affect: 'CollisionDamageMultipliter',
				magnitude: 0.5,
				cost: 7,
				techMessage: "Increases damage dealt in Collisions by 50% at a cost of 7 Bits"
			},
			{
				affect: 'MeleeDamageMultiplier',
				magnitude: 1.5,
				cost: 7,
				techMessage: "Increases Melee Damage by 50% at a cost of 7 Bits"
			},
			{
				affect: 'RangedDamageMultiplier',
				magnitude: 1.5,
				cost: 10,
				techMessage: "Increases Ranged Damage by 50% at a cost of 10 Bits"
			},
			{
				affect: 'reloadTime',
				magnitude: -1,
				cost: 5,
				techMessage: "Reduces weapon Reload Time by 1 tick at a cost of 5 Bits"
			},
			null,
			{
				affect: 'accessorySlot',
				magnitude: 1,
				cost: 8,
				techMessage: "Unlocks an additional accessory slot at the cost of 8 Bits"
			},
			{
				affect: 'repairCommand',
				magnitude: true,
				cost: 12,
				techMessage: "Unlocks the REPAIR command at a cost of 12 Bits"
			},
			null
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
