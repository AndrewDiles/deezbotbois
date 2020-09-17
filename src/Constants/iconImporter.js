import {u1F48D as accessory} from 'react-icons-kit/noto_emoji_regular/u1F48D'
import {u1F3AF as accuracy} from 'react-icons-kit/noto_emoji_regular/u1F3AF'
// import {lab as acid} from 'react-icons-kit/icomoon/lab'
// import {beaker as acid} from 'react-icons-kit/oct/beaker'
import {erlenmeyerFlaskBubbles as acid} from 'react-icons-kit/ionicons/erlenmeyerFlaskBubbles'
import {target as aim} from 'react-icons-kit/ikons/target'
import {shield as armor} from 'react-icons-kit/icomoon/shield'

import {u1F44A as attack} from 'react-icons-kit/noto_emoji_regular/u1F44A'
// import {ic_pages as attack} from 'react-icons-kit/md/ic_pages'
// import {battery as capacitor} from 'react-icons-kit/entypo/battery'
import {batteryFull as capacitor} from 'react-icons-kit/ionicons/batteryFull'
import {u1F320 as charge} from 'react-icons-kit/noto_emoji_regular/u1F320'
import {exit as collision} from 'react-icons-kit/iconic/exit'
import {news as command} from 'react-icons-kit/typicons/news'
import {power as cost} from 'react-icons-kit/icomoon/power'
import {legal as crushing} from 'react-icons-kit/fa/legal'
import {u1F4A5 as damage} from 'react-icons-kit/noto_emoji_regular/u1F4A5'
import {shield as damageReduction} from 'react-icons-kit/fa/shield'  // used to be typedArmor
import {heart as durability} from 'react-icons-kit/icomoon/heart'
// import {ionic as energy} from 'react-icons-kit/ionicons/ionic'
import {flashlight as energy} from 'react-icons-kit/entypo/flashlight'
// import {fire} from 'react-icons-kit/icomoon/fire'
import {flame as fire} from 'react-icons-kit/oct/flame'
import {shield as guard} from 'react-icons-kit/entypo/shield'
import {listOl as initiative} from 'react-icons-kit/fa/listOl'
import {hammer as melee} from 'react-icons-kit/icomoon/hammer'
// import {ic_timeline as movement} from 'react-icons-kit/md/ic_timeline'
import {graph_rise as movement} from 'react-icons-kit/ikons/graph_rise'
// import {x as multiplier} from 'react-icons-kit/oct/x'
import {u1F52A as piercing} from 'react-icons-kit/noto_emoji_regular/u1F52A' // used to be armorPenetration
import {u1F529 as power} from 'react-icons-kit/noto_emoji_regular/u1F529'
import {u1F52B as ranged} from 'react-icons-kit/noto_emoji_regular/u1F52B'
import {u1F682 as ram} from 'react-icons-kit/noto_emoji_regular/u1F682'
// import {ic_battery_charging_50 as reactor} from 'react-icons-kit/md/ic_battery_charging_50'
import {nuclear as reactor} from 'react-icons-kit/ionicons/nuclear';
import {batteryCharging as recharge} from 'react-icons-kit/ionicons/batteryCharging'
import {loop2 as reload} from 'react-icons-kit/icomoon/loop2'
import {wrench as repair} from 'react-icons-kit/icomoon/wrench'
import {ic_wifi_tethering as scan} from 'react-icons-kit/md/ic_wifi_tethering'
import {sphere as shield} from 'react-icons-kit/icomoon/sphere'
// import {rocket as shieldPenetration} from 'react-icons-kit/oct/rocket'
// import {list as slot} from 'react-icons-kit/iconic/list'

import {iosWorld as typedShield} from 'react-icons-kit/ionicons/iosWorld'
import {unlocked} from 'react-icons-kit/icomoon/unlocked'
import {u1F528 as weapon} from 'react-icons-kit/noto_emoji_regular/u1F528'

const iconImporter = (stringToConvert) => {
	let icon1, icon2
	switch (stringToConvert) {
		case 'accessorySlot' : {
			icon1 = accessory;
			// icon2 = slot;
			icon2 = unlocked;
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
		// case 'ArmorVsPiercingMultiplier' : {
		// 	icon1 = typedArmor;
		// 	icon2 = multiplier;
		// 	break;
		// }
		// case 'ArmorVsCrushingMultiplier' : {
		// 	icon1 = typedArmor;
		// 	icon2 = multiplier;
		// 	break;
		// }
		case 'attackCost' : {
			icon1 = attack;
			icon2 = cost;
			break;
		}
		case 'AutoRepair' : {
			icon1 = repair;
			break;
		}
		case 'BAR' : {
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
		case 'CollisionMultiplier' : {
			icon1 = collision;
			icon2 = damage;
			break;
		}
		case 'CollisionDamageReductionMultiplier' : {
			icon1 = collision;
			icon2 = damageReduction;
			break;
		}
		case 'CrushingDamageMultiplier' : {
			icon1 = crushing;
			icon2 = damage;
			break;
		}
		case 'CrushingDamageReductionMultiplier' : {
			icon1 = crushing;
			icon2 = damageReduction;
			break;
		}
		case 'Damage' : {
			icon1 = damage;
			break;
		}
		case 'Durability' : {
			icon1 = durability;
			break;
		}
		case 'EnergyDamageReductionMultiplier' : {
			icon1 = energy;
			icon2 = damageReduction;
			break;
		}
		case 'FireDamageMultiplier' : {
			icon1 = fire;
			icon2 = damage;
			break;
		}
		case 'FireDamageReductionMultiplier' : {
			icon1= fire;
			icon2 = damageReduction;
			break;
		}
		case 'guardCommand' : {
			icon1 = guard;
			icon2 = command;
			break;
		}
		case 'Initiative' : {
			icon1 = initiative;
			break;
		}
		case 'MeleeDamageMultiplier' : {
			icon1 = melee;
			icon2 = damage;
			break;
		}
		case 'MeleeDamageReductionMultiplier' : {
			icon1 = melee;
			icon2 = damageReduction;
			break;
		}
		case 'MeleeArmorPenetration' : {
			icon1 = melee;
			icon2 = armor;
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
		case 'PiercingDamageReductionMultiplier' : {
			icon1 = piercing;
			icon2 = damageReduction;
			break;
		}
		case 'RangedDamageMultiplier' : {
			icon1 = ranged;
			icon2 = damage;
			break;
		}
		case 'RangedShieldPenetration' : {
			icon1 = ranged;
			icon2 = shield;
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
		case 'ramCommand' : {
			icon1 = ram;
			icon2 = command;
			break;
		}
		case 'reachargeCommand' : {
			icon1 = recharge;
			icon2 = command;
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
		// case 'ShieldVsEnergyMultiplier' : {
		// 	icon1 = typedShield;
		// 	icon2 = multiplier;
		// 	break;
		// }
		// case 'ShieldVsFireMultiplier' : {
		// 	icon1 = typedShield;
		// 	icon2 = multiplier;
		// 	break;
		// }
		case 'weaponSlot' : {
			icon1 = weapon;
			// icon2 = slot;
			icon2 = unlocked;
			break;
		}
		default :{icon1 = null; icon2 = null}
	}
	// if (!icon1)
	// console.log('the following string failed to load icons:', stringToConvert)
	return {icon1: icon1, icon2: icon2}
}
export default iconImporter;