import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { techTreeRequirements, inverseTechTreeRequirements } from '../../../Constants/helperFunctions';
import baseBotAttributes from '../../../Constants/attributes';

import TechCell from './TechCell';
import {power} from 'react-icons-kit/icomoon/power'		// cost
import {x} from 'react-icons-kit/oct/x'								// multiplier
import {news} from 'react-icons-kit/typicons/news'		// action

import {target} from 'react-icons-kit/ikons/target'
import {shield} from 'react-icons-kit/icomoon/shield'
import {shield as ArmorVsPiercingMultiplier} from 'react-icons-kit/fa/shield'
// import {ic_pages} from 'react-icons-kit/md/ic_pages' //alternative attack
import {u1F4A5} from 'react-icons-kit/noto_emoji_regular/u1F4A5'
import {wrench} from 'react-icons-kit/icomoon/wrench'
import {u1F320} from 'react-icons-kit/noto_emoji_regular/u1F320'
import {arrowMinimiseOutline} from 'react-icons-kit/typicons/arrowMinimiseOutline'
import {heart} from 'react-icons-kit/icomoon/heart'
import {hammer} from 'react-icons-kit/icomoon/hammer'
import {ic_timeline} from 'react-icons-kit/md/ic_timeline'
import {u1F52B} from 'react-icons-kit/noto_emoji_regular/u1F52B'
import {loop2} from 'react-icons-kit/icomoon/loop2'
import {ic_wifi_tethering} from 'react-icons-kit/md/ic_wifi_tethering'
import {sphere} from 'react-icons-kit/icomoon/sphere'

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
		else if (botInfo[botNumberSelected].techTree[techRequirement]) techRequirementMet = true;
		else techRequirementMet = false;
		let starRequirementMet = false;
		// console.log('tech requirementMet on index', index, techRequirementMet)
		let starRequirement = baseBotAttributes[botInfo[botNumberSelected].model].TechTree[index].cost;
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
		console.log('index, purchased, disabled',index, purchased, disabled)
		if (purchased) {
			dispatch(removeTechs(botNumberSelected, inverseTechTreeRequirements(index)))
		}
		else if (!disabled)
		dispatch(addTech(botNumberSelected, index ))
	}

	let icon1, icon2 = null;
	switch (tech.affect) {
		case 'aimCost' : {
			icon1 = target;
			icon2 = power;
			break;
		}
		case 'Armor' : {
			icon1 = shield;
			break;
		}
		case 'ArmorVsPiercingMultiplier' : {
			icon1 = ArmorVsPiercingMultiplier;
			icon2 = x;
			break;
		}
		case 'attackCost' : {
			icon1 = u1F4A5;
			icon2 = power;
			break;
		}
		case 'AutoRepair' : {
			icon1 = wrench;
			break;
		}
		case 'chargeAction' : {
			icon1 = u1F320;
			icon2 = news
			break;
		}
		case 'CollisionDamageMultipliter' : {
			icon1 = arrowMinimiseOutline;
			icon2 = x;
			break;
		}
		case 'Damage' : {
			icon1 = u1F4A5;
			break;
		}
		case 'Durability' : {
			icon1 = heart;
			break;
		}
		case 'MeleeDamageMultiplier' : {
			icon1 = hammer;
			icon2 = x;
			break;
		}
		case 'MovementDistance' : {
			icon1 = ic_timeline;
			break;
		}
		case 'RangedDamageMultiplier' : {
			icon1 = u1F52B;
			icon2 = x;
			break;
		}
		case 'reloadTime' : {
			icon1 = loop2;
			break;
		}
		case 'ScanCost' : {
			icon1 = ic_wifi_tethering;
			icon2 = power;
			break;
		}
		case 'ScanDistance' : {
			icon1 = ic_wifi_tethering;
			break;
		}
		case 'Shield' : {
			icon1 = sphere;
			break;
		}

		default :{}
	}

  return (
		<TechCell
		index = {index}
		techMessage = {baseBotAttributes[botInfo[botNumberSelected].model].TechTree[index].techMessage}
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