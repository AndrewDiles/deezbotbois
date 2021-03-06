import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { techTreeRequirements, inverseTechTreeRequirements } from '../../../Constants/helperFunctions';
import baseBotAttributes from '../../../Constants/attributes';

import TechCell from './TechCell';
import iconImporter from'../../../Constants/iconImporter';

import {
	addTech,
	removeTechs,
	playSFX
} from '../../../Redux/actions';

const TechCellProvider = ({ setTechDisplay, availableStars, availableBlueStars, tech, size, trimSize, botNumberSelected, index }) => {
	const botInfo = useSelector((state) => state.userInfo.botBuilds);
	const dispatch = useDispatch();
	const [locked, setLocked] = useState('locked');
	
	const updateState = () => {
		if (!botInfo[botNumberSelected]) return;
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
	},[botNumberSelected, botInfo, botInfo[botNumberSelected] && botInfo[botNumberSelected].model, availableStars, availableBlueStars] )
	
	const handleClick = (purchased, disabled) => {
		// console.log('index, purchased, disabled',index, purchased, disabled)
		if (purchased) {
			dispatch(removeTechs(botNumberSelected, inverseTechTreeRequirements(index)));
			dispatch(playSFX('confirm'));
		}
		else if (!disabled) {
			dispatch(addTech(botNumberSelected, index));
			dispatch(playSFX('selected'));
		}
		else if (disabled) {
			dispatch(playSFX('disabled'));
		}
	}
	let icons = iconImporter(tech.affect);
	let icon1 = icons.icon1;
	let icon2 = icons.icon2;
	// index === 2 && console.log(baseBotAttributes[botInfo[botNumberSelected].model].TechTree[index].techMessage)

  return (
		<TechCell
		botNumberSelected = {botNumberSelected}
		index = {index}
		techMessage = {botInfo[botNumberSelected] && baseBotAttributes[botInfo[botNumberSelected].model].TechTree[index] && baseBotAttributes[botInfo[botNumberSelected].model].TechTree[index].techMessage}
		setTechDisplay = {setTechDisplay}
		purchased = {botInfo[botNumberSelected] && botInfo[botNumberSelected].techTree[index]}
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