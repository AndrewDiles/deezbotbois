import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { techTreeRequirements, inverseTechTreeRequirements } from '../../../Constants/helperFunctions';
import baseBotAttributes from '../../../Constants/attributes';

import TechCell from './TechCell';
import {power as cost} from 'react-icons-kit/icomoon/power'
import {x as multiplier} from 'react-icons-kit/oct/x'
import {news as command} from 'react-icons-kit/typicons/news'
import {list as slot} from 'react-icons-kit/iconic/list'

import {u1F48D as accessory} from 'react-icons-kit/noto_emoji_regular/u1F48D'
import {target as aim} from 'react-icons-kit/ikons/target'
import {shield as armor} from 'react-icons-kit/icomoon/shield'
import {shield as ArmorVsPiercingMultiplier} from 'react-icons-kit/fa/shield'
// import {ic_pages} from 'react-icons-kit/md/ic_pages' //alternative attack
import {u1F4A5 as attack} from 'react-icons-kit/noto_emoji_regular/u1F4A5'
import {wrench as repair} from 'react-icons-kit/icomoon/wrench'
import {u1F320 as charge} from 'react-icons-kit/noto_emoji_regular/u1F320'
import {arrowMinimiseOutline as collision} from 'react-icons-kit/typicons/arrowMinimiseOutline'
import {heart as durability} from 'react-icons-kit/icomoon/heart'
import {shield as guard} from 'react-icons-kit/entypo/shield'
import {hammer as melee} from 'react-icons-kit/icomoon/hammer'
import {u1F52A as armorPenetration} from 'react-icons-kit/noto_emoji_regular/u1F52A'
import {ic_timeline as movement} from 'react-icons-kit/md/ic_timeline'
import {u1F52B as ranged} from 'react-icons-kit/noto_emoji_regular/u1F52B'
import {loop2 as reload} from 'react-icons-kit/icomoon/loop2'
import {ic_wifi_tethering as scan} from 'react-icons-kit/md/ic_wifi_tethering'
import {sphere as shield} from 'react-icons-kit/icomoon/sphere'
import {u1F528 as weapon} from 'react-icons-kit/noto_emoji_regular/u1F528'
// still need shieldPenetration

import {
	addTech,
	removeTechs
} from '../../../Redux/actions';

const TechCellProvider = ({ setTechDisplay, availableStars, availableBlueStars, tech, size, trimSize, botNumberSelected, index }) => {
	const botInfo = useSelector((state) => state.userInfo.botBuilds);
	const dispatch = useDispatch();
	const [locked, setLocked] = useState('locked');
		
	const updateState = () => {
		let techRequirement = techTreeRequirements(index);
		// console.log('tech requirement on index', index, techRequirement)
		// console.log(index, '<-index, Evaluation of its requirement->',botInfo[botNumberSelected].techTree[techRequirement])
		let techRequirementMet = null;
		if (techRequirement === null || techRequirement === undefined) techRequirementMet = true;
		else if (
			botInfo[botNumberSelected].techTree[techRequirement[0]] && 
			(
				!techRequirement[1] ||
				botInfo[botNumberSelected].techTree[techRequirement[1]]
			)
		) techRequirementMet = true;
		else techRequirementMet = false;
		let starRequirementMet = false;
		// console.log('tech requirementMet on index', index, techRequirementMet)
		let starRequirement = 0;
		if (baseBotAttributes[botInfo[botNumberSelected].model].TechTree[index]) {
			starRequirement = baseBotAttributes[botInfo[botNumberSelected].model].TechTree[index].cost;
		}
		// console.log('starRequirement on index', index, starRequirement)
		if ((availableStars + availableBlueStars) >= starRequirement) starRequirementMet = true;
		let locked = null;
		if (!techRequirementMet) locked = 'locked'
		else if (!starRequirementMet) locked = 'lackingStars';
		else locked = 'unlocked';
		setLocked(locked);
	}

	React.useEffect(()=>  {
		updateState();
	},[botNumberSelected, botInfo, availableStars, availableBlueStars] )
	
	const handleClick = (purchased, disabled) => {
		// console.log('index, purchased, disabled',index, purchased, disabled)
		if (purchased) {
			dispatch(removeTechs(botNumberSelected, inverseTechTreeRequirements(index)))
		}
		else if (!disabled)
		dispatch(addTech(botNumberSelected, index ))
	}

	let icon1, icon2 = null;
	switch (tech.affect) {
		case 'accessorySlot' : {
			icon1 = accessory;
			icon2 = slot;
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
			icon1 = ArmorVsPiercingMultiplier;
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
		case 'MovementDistance' : {
			icon1 = movement;
			break;
		}
		case 'RangedDamageMultiplier' : {
			icon1 = ranged;
			icon2 = multiplier;
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
		case 'weaponSlot' : {
			icon1 = weapon;
			icon2 = slot;
			break;
		}

		default :{}
	}

  return (
		<TechCell
		index = {index}
		techMessage = {baseBotAttributes[botInfo[botNumberSelected].model].TechTree[index] && baseBotAttributes[botInfo[botNumberSelected].model].TechTree[index].techMessage}
		setTechDisplay = {setTechDisplay}
		purchased = {botInfo[botNumberSelected].techTree[index]}
		locked = {locked}
		icon1 = {icon1}
		icon2 = {icon2}
		size = {size}
		trimSize = {trimSize}
		handleClick = {handleClick}
		/>
  )
}
export default TechCellProvider;