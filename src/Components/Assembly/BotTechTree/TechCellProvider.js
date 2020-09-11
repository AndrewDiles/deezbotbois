import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { techTreeRequirements } from '../../../Constants/helperFunctions';
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


const TechCellProvider = ({ availableStars, availableBlueStars, tech, size, trimSize, botNumberSelected, index }) => {
	const botInfo = useSelector((state) => state.userInfo.botBuilds);
	const [techRequirementMet, setTechRequirementMet] = useState(false);
	const [starRequirementMet, setStarRequirementMet] = useState(false);
	const [blueStarConversionRate, setBlueStarConversionRate] = useState(1);
	const [locked, setLocked] = useState('locked');
	
	React.useEffect(()=> {
		setBlueStarConversionRate(baseBotAttributes[botInfo[botNumberSelected].model].BlueStarConversionRate);
		let techRequirement = techTreeRequirements(index);
		if (techRequirement === true) setTechRequirementMet(true);
		else if (botInfo[botNumberSelected].techTree[techRequirement]) setTechRequirementMet(true);
		else setTechRequirementMet(false);
		let starRequirement = baseBotAttributes[botInfo[botNumberSelected].model].TechTree[index].cost;
		if ((availableStars + Math.floor(availableBlueStars/blueStarConversionRate)) >= starRequirement) setStarRequirementMet(true);
		if (!techRequirementMet) setLocked('locked');
		else if (!starRequirementMet) setLocked('lackingStars')
		else setLocked('unlocked');
	},[botNumberSelected, botInfo])
	
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
		index = {index} // to be removed?
		purchased = {botInfo[botNumberSelected].techTree[index]}
		locked = {locked}
		icon1 = {icon1}
		icon2 = {icon2}
		size = {size}
		trimSize = {trimSize}
		/>
  )
}
export default TechCellProvider;