import React from 'react';
import { useSelector } from "react-redux";
import WeaponSelector from '../InstructionsComponents/WeaponSelector';
import TargetSelector from '../InstructionsComponents/TargetSelector';

const ChargeCommandInstructions = ({ nodeInfo, activeNodeArray, setActiveNodeArray, botNumberSelected, aiAndScripts }) => {
	const userInfo = useSelector((state) => state.userInfo);
	if (!userInfo.botBuilds[botNumberSelected]) {
		return <></>
	}
	return (		
		<div className = 'commandContents'>
			<WeaponSelector
			nodeInfo = {nodeInfo}
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			botNumberSelected = {botNumberSelected}
			aiAndScripts = {aiAndScripts}
			weaponType = 'Melee'
			/>
			<TargetSelector
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			aiAndScripts = {aiAndScripts}
			botNumberSelected = {botNumberSelected}
			/>
		</div>
	)
}
export default ChargeCommandInstructions;