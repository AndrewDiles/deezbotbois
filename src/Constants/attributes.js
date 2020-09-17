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
		CollisionMultiplier: 1,
		WeaponSlots: 2,
		AccessorySlots: 3,
		Initiative: 7,
		Description: "Dicephalous heavy unit.",
		Special1: "+1 Weapon slot",
		Special2: "+1 Scan distance",
		Special3: "+10 Movement cost",
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
				affect: 'EnergyDamageReductionMultiplier',
				magnitude: 0.75,
				cost: 5,
				techMessage: "Reduces 25% of damage taken from Energy attacks at a cost of 5 Bits"
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
				affect: 'attackCost',
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
		CollisionMultiplier: 1,
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
				affect: 'PiercingDamageReductionMultiplier',
				magnitude: 0.75,
				cost: 5,
				techMessage: "Reduces 25% of damage taken from Piercing attacks at a cost of 5 Bits"
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
				affect: 'CollisionMultiplier',
				magnitude: 1.5,
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
		Name: 'Jager',
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
		CollisionMultiplier: 1,
		WeaponSlots: 1,
		AccessorySlots: 3,
		Initiative: 15,
		Description: "Monocular versatile unit.",
		Special1: "+1 Movement distance",
		Special2: "+10 Movement cost",
		Special3: "+10 Scan cost",
		BlueStarConversionRate: 1,
		TechTree: [
			null,
			{
				affect: 'Durability',
				magnitude: 2,
				cost: 2,
				techMessage: "Inceases Durability by 2 at a cost of 2 Bits"
			},
			{
				affect: 'Capacitor',
				magnitude: 10,
				cost: 2,
				techMessage: "Inceases Capacitor by 10 at a cost of 2 Bits"
			},
			null,
			{
				affect: 'ScanDistance',
				magnitude: 1,
				cost: 5,
				techMessage: "Increases Scan Distance by 1 at a cost of 5 Bits"
			},
			{
				affect: 'MovementDistance',
				magnitude: 1,
				cost: 5,
				techMessage: "Inceases Movement Distance by 1 at a cost of 5 Bits"
			},
			{
				affect: 'Reactor',
				magnitude: 1,
				cost: 8,
				techMessage: "Inceases Reactor by 1 at a cost of 8 Bits"
			},
			{
				affect: 'Power',
				magnitude: 1,
				cost: 3,
				techMessage: "Inceases Power by 1 at a cost of 3 Bits"
			},
			{
				affect: 'CrushingDamageReductionMultiplier',
				magnitude: 0.5,
				cost: 9,
				techMessage: "Reduces 50% of damage taken from Crushing attacks at a cost of 9 Bits"
			},
			{
				affect: 'CrushingDamageMultiplier',
				magnitude: 1.5,
				cost: 6,
				techMessage: "Increases Crushing Damage by 50% at a cost of 6 Bits"
			},
			{
				affect: 'FireDamageMultiplier',
				magnitude: 1.5,
				cost: 3,
				techMessage: "Increases Fire Damage by 50% at a cost of 3 Bits"
			},
			{
				affect: 'FireDamageReductionMultiplier',
				magnitude: 0.75,
				cost: 3,
				techMessage: "Reduces 25% of damage taken from Energy attacks at a cost of 3 Bits"
			},
			{
				affect: 'MovementDistance',
				magnitude: 1,
				cost: 5,
				techMessage: "Inceases Movement Distance by 1 at a cost of 5 Bits"
			},
			{
				affect: 'Reactor',
				magnitude: 1,
				cost: 7,
				techMessage: "Inceases Reactor by 1 at a cost of 7 Bits"
			},
			{
				affect: 'Accuracy',
				magnitude: 2,
				cost: 10,
				techMessage: "Inceases Accuracy by 2 at a cost of 10 Bits"
			},
			{
				affect: 'Initiative',
				magnitude: 2,
				cost: 2,
				techMessage: "Increases Initiative by 2 at a cost of 2 Bits"
			},
			{
				affect: 'Armor',
				magnitude: 2,
				cost: 5,
				techMessage: "Increases Armor by 2 at a cost of 5 Bits"
			},
			{
				affect: 'chargeCommand',
				magnitude: true,
				cost: 5,
				techMessage: "Unlocks the CHARGE command at a cost of 5 Bits"
			},
			{
				affect: 'Damage',
				magnitude: 2,
				cost: 10,
				techMessage: "Inceases Damage by 2 at a cost of 10 Bits"
			},
			{
				affect: 'Shield',
				magnitude: 2,
				cost: 7,
				techMessage: "Increases Shield by 2 at a cost of 7 Bits"
			},
			null,
			{
				affect: 'Reactor',
				magnitude: 3,
				cost: 20,
				techMessage: "Inceases Reactor by 3 at a cost of 20 Bits"
			},
			{
				affect: 'reachargeCommand',
				magnitude: true,
				cost: 20,
				techMessage: "Unlocks the RECHARGE command at a cost of 20 Bits"
			},
			null
		]
	},
	BotLumpey: {
		Name: 'Lumpey',
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
		CollisionMultiplier: 1,
		WeaponSlots: 2,
		AccessorySlots: 0,
		Initiative: 3,
		Description: "Immobile war machine!",
		Special1: "+1 Weapon slot",
		Special2: "-3 Accessory slots",
		Special3: "+.1 AutoRepair",
		BlueStarConversionRate: 1,
	},
	BotRobbey: {
		Name: 'Robbey',
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
		CollisionMultiplier: 1,
		WeaponSlots: 2,
		AccessorySlots: 3,
		Initiative: 11,
		Description: "Advanced glass cannon.",
		Special1: "+1 Weapon slot",
		Special2: "+1 Movement distance",
		Special3: "Warning: Weak Reactor!",
		BlueStarConversionRate: 2.5,
	},
	BotSpikey: {
		Name: 'Spikey',
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
		CollisionMultiplier: 1.5,
		WeaponSlots: 1,
		AccessorySlots: 3,
		Initiative: 13,
		Description: "Inescapable suicide unit.",
		Special1: "+1 Scan distance",
		Special2: "+2 Movement Distance",
		Special3: "+50% Collision damage",
		BlueStarConversionRate: 1.5,
		TechTree: [
			null,
			{
				affect: 'MovementDistance',
				magnitude: 1,
				cost: 6,
				techMessage: "Inceases Movement Distance by 1 at a cost of 6 Bits"
			},
			{
				affect: 'ScanDistance',
				magnitude: 1,
				cost: 3,
				techMessage: "Increases Scan Distance by 1 at a cost of 3 Bits"
			},
			null,
			{
				affect: 'Durability',
				magnitude: 2,
				cost: 4,
				techMessage: "Inceases Durability by 2 at a cost of 4 Bits"
			},
			{
				affect: 'Capacitor',
				magnitude: 10,
				cost: 2,
				techMessage: "Inceases Capacitor by 10 at a cost of 2 Bits"
			},
			{
				affect: 'ScanCost',
				magnitude: -1,
				cost: 3,
				techMessage: "Reduces Scan's Energy Cost by 1 at a cost of 3 Bits"
			},
			{
				affect: 'Durability',
				magnitude: 2,
				cost: 4,
				techMessage: "Inceases Durability by 2 at a cost of 4 Bits"
			},
			{
				affect: 'Power',
				magnitude: 2,
				cost: 6,
				techMessage: "Inceases Power by 2 at a cost of 6 Bits"
			},
			{
				affect: 'Shield',
				magnitude: 1,
				cost: 2,
				techMessage: "Increases Shield by 1 at a cost of 2 Bits"
			},
			{
				affect: 'Reactor',
				magnitude: 1,
				cost: 10,
				techMessage: "Increases Reactor by 1 at a cost of 10 Bits"
			},
			{
				affect: 'AutoRepair',
				magnitude: .1,
				cost: 6,
				techMessage: "Increases Auto Repair by 0.1 at a cost of 6 Bits"
			},
			{
				affect: 'Damage',
				magnitude: 1,
				cost: 4,
				techMessage: "Inceases Damage by 1 at a cost of 4 Bits"
			},
			{
				affect: 'Shield',
				magnitude: 1,
				cost: 3,
				techMessage: "Increases Shield by 1 at a cost of 3 Bits"
			},
			{
				affect: 'MeleeDamageReductionMultiplier',
				magnitude: 0.75,
				cost: 8,
				techMessage: "Reduces Melee Damage taken by 25% at a cost of 8 Bits"
			},
			{
				affect: 'Initiative',
				magnitude: 3,
				cost: 3,
				techMessage: "Increases Initiative by 3 at a cost of 3 Bits"
			},
			{
				affect: 'CollisionMultiplier',
				magnitude: 1.5,
				cost: 12,
				techMessage: "Increases damage dealt in Collisions by 50% at a cost of 12 Bits"
			},
			{
				affect: 'CollisionDamageReductionMultiplier',
				magnitude: 0.5,
				cost: 8,
				techMessage: "Decreases damage taken from Collisions by 50% at a cost of 8 Bits"
			},
			{
				affect: 'MovementDistance',
				magnitude: 1,
				cost: 6,
				techMessage: "Inceases Movement Distance by 1 at a cost of 6 Bits"
			},
			{
				affect: 'MovementCost',
				magnitude: -5,
				cost: 7,
				techMessage: "Decreases Movement Cost by 5 at a cost of 7 Bits"
			},
			null,
			{
				affect: 'CrushingDamageMultiplier',
				magnitude: 1.5,
				cost: 10,
				techMessage: "Increases Crushing Damage by 50% at a cost of 10 Bits"
			},
			{
				affect: 'ramCommand',
				magnitude: true,
				cost: 20,
				techMessage: "Unlocks the RAM command at a cost of 20 Bits"
			},
			null
		]
	},
	BotZippey: {
		Name: 'Zippey',
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
		CollisionMultiplier: 1,
		WeaponSlots: 1,
		AccessorySlots: 3,
		Initiative: 20,
		Description: "Frail run and gunner.",
		Special1: "+1 Movement distance",
		Special2: "Highest initiative",
		Special3: "Warning: Low Durability!",
		BlueStarConversionRate: 2,
	}
}
export default baseBotAttributes;
export const attributeInfo = {
	Durability: 'Durability: Maximum sustainable damage',
	Armor: 'Armor: Damage Reduction; ignored by Energy attacks',
	Shield: 'Shield: Damage Reduction; ignored by Piercing attacks',
	Accuracy: 'Accuracy: Increases subType Accuracy damage dealt',
	Power: 'Power: Increases subType Power damage dealt',
	Capacitor: 'Capacitor: Maximum energy stored [kJ]',
	Reactor: 'Reactor: Maximum energy recharged per tick [kW]',
	AutoRepair: 'Auto Repair: Total Durability recovered per tick',
	ScanDistance: "Scan Distance: Scan Command's maximum detection distance",
	ScanCost: 'Scan Cost: Cost to execute a Scan Command [kJ]',
	MovementDistance: "Movement Distance: Movement Command's maximum traversable distance",
	MovementCost: 'Movement Cost: Cost to execute a Movement Command [kJ]',
	CollisionMultiplier: 'Collision Multiplier: Multiplier on damage dealt during a collision',
	WeaponSlots: 'Weapon Slots: Maximum number of equipable weapons',
	AccessorySlots: 'Accessory Slots: Maximum number of equipable accessories',
	Initiative: 'Initiative: First action priority tie breaker - See RULES',

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
	'CollisionMultiplier',
	'Initiative'
]
