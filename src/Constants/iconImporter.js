import React from 'react';

import {power as cost} from 'react-icons-kit/icomoon/power'
import {x as multiplier} from 'react-icons-kit/oct/x'
import {news as command} from 'react-icons-kit/typicons/news'
import {list as slot} from 'react-icons-kit/iconic/list'
import {u1F48D as accessory} from 'react-icons-kit/noto_emoji_regular/u1F48D'
import {u1F3AF as accuracy} from 'react-icons-kit/noto_emoji_regular/u1F3AF'
import {target as aim} from 'react-icons-kit/ikons/target'
import {shield as armor} from 'react-icons-kit/icomoon/shield'
import {shield as typedArmor} from 'react-icons-kit/fa/shield'
import {iosWorld as typedShield} from 'react-icons-kit/ionicons/iosWorld'  //alt shield
// import {ic_pages} from 'react-icons-kit/md/ic_pages' //alternative attack
import {u1F4A5 as attack} from 'react-icons-kit/noto_emoji_regular/u1F4A5'
import {battery as capacitor} from 'react-icons-kit/entypo/battery'
import {wrench as repair} from 'react-icons-kit/icomoon/wrench'
import {u1F320 as charge} from 'react-icons-kit/noto_emoji_regular/u1F320'
import {arrowMinimiseOutline as collision} from 'react-icons-kit/typicons/arrowMinimiseOutline'
import {heart as durability} from 'react-icons-kit/icomoon/heart'
import {shield as guard} from 'react-icons-kit/entypo/shield'
import {hammer as melee} from 'react-icons-kit/icomoon/hammer'
import {u1F52A as armorPenetration} from 'react-icons-kit/noto_emoji_regular/u1F52A'
import {rocket as shieldPenetration} from 'react-icons-kit/oct/rocket'
import {ic_timeline as movement} from 'react-icons-kit/md/ic_timeline'
import {u1F529 as power} from 'react-icons-kit/noto_emoji_regular/u1F529'
import {u1F52B as ranged} from 'react-icons-kit/noto_emoji_regular/u1F52B'
// import {ic_battery_charging_50 as reactor} from 'react-icons-kit/md/ic_battery_charging_50'
import {nuclear as reactor} from 'react-icons-kit/ionicons/nuclear';
import {loop2 as reload} from 'react-icons-kit/icomoon/loop2'
import {ic_wifi_tethering as scan} from 'react-icons-kit/md/ic_wifi_tethering'
import {sphere as shield} from 'react-icons-kit/icomoon/sphere'
import {u1F528 as weapon} from 'react-icons-kit/noto_emoji_regular/u1F528'

const iconImporter = (stringToConvert) => {
	let icon1, icon2
	switch (stringToConvert) {
		case 'accessorySlot' : {
			icon1 = accessory;
			icon2 = slot;
			break;
		}
		case 'Accuracy' : {
			icon1 = accuracy;
			break;
		}
		case 'aimCost' : {
			icon1 = aim;
			icon2 = cost;
			break;
		}
		case 'Armor' : {
			icon1 = armor;
			break;
		}
		case 'ArmorVsPiercingMultiplier' : {
			icon1 = typedArmor;
			icon2 = multiplier;
			break;
		}
		case 'attackCost' : {
			icon1 = attack;
			icon2 = cost;
			break;
		}
		case 'AutoRepair' : {
			icon1 = repair;
			break;
		}
		case 'Capacitor' : {
			icon1 = capacitor;
			break;
		}
		case 'chargeCommand' : {
			icon1 = charge;
			icon2 = command
			break;
		}
		case 'CollisionDamageMultipliter' : {
			icon1 = collision;
			icon2 = multiplier;
			break;
		}
		case 'Damage' : {
			icon1 = attack;
			break;
		}
		case 'Durability' : {
			icon1 = durability;
			break;
		}
		case 'guardCommand' : {
			icon1 = guard;
			icon2 = command;
			break;
		}
		case 'MeleeDamageMultiplier' : {
			icon1 = melee;
			icon2 = multiplier;
			break;
		}
		case 'MeleeArmorPenetration' : {
			icon1 = armorPenetration;
			icon2 = multiplier;
			break;
		}
		case 'MovementCost' : {
			icon1 = movement;
			icon2 = cost;
			break;
		}
		case 'MovementDistance' : {
			icon1 = movement;
			break;
		}
		case 'RangedDamageMultiplier' : {
			icon1 = ranged;
			icon2 = multiplier;
			break;
		}
		case 'RangedShieldPenetration' : {
			icon1 = shieldPenetration;
			icon2 = multiplier;
			break;
		}
		case 'Reactor' : {
			icon1 = reactor;
			break;
		}
		case 'Power' : {
			icon1 = power;
			break;
		}
		case 'reloadTime' : {
			icon1 = reload;
			break;
		}
		case 'repairCommand' : {
			icon1 = repair;
			icon2 = command;
			break;
		}
		case 'ScanCost' : {
			icon1 = scan;
			icon2 = cost;
			break;
		}
		case 'ScanDistance' : {
			icon1 = scan;
			break;
		}
		case 'Shield' : {
			icon1 = shield;
			break;
		}
		case 'ShieldVsEnergyMultiplier' : {
			icon1 = typedShield;
			icon2 = multiplier;
			break;
		}
		case 'weaponSlot' : {
			icon1 = weapon;
			icon2 = slot;
			break;
		}
		default :{}
	}
	return {icon1: icon1, icon2: icon2}
}
export default iconImporter;