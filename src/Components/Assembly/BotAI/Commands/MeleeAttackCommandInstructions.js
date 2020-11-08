import React from 'react';
import { useSelector } from "react-redux";
import WeaponSelector from '../InstructionsComponents/WeaponSelector';
import AttackDirectionSetter from '../InstructionsComponents/AttackDirectionSetter';
import TargettingToggle from '../InstructionsComponents/TargettingToggle';
import TargetSelector from '../InstructionsComponents/TargetSelector';

const MeleeAttackCommandInstructions = ({ nodeInfo, activeNodeArray, setActiveNodeArray, botNumberSelected, aiAndScripts }) => {
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
			<br/>
			<TargettingToggle
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			aiAndScripts = {aiAndScripts}
			botNumberSelected = {botNumberSelected}
			/>
			<br/>
			{activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.targetting ? (
				<TargetSelector
				activeNodeArray = {activeNodeArray}
				setActiveNodeArray = {setActiveNodeArray}
				aiAndScripts = {aiAndScripts}
				botNumberSelected = {botNumberSelected}
				/>
			):(
				<AttackDirectionSetter
				activeNodeArray = {activeNodeArray}
				setActiveNodeArray = {setActiveNodeArray}
				aiAndScripts = {aiAndScripts}
				botNumberSelected = {botNumberSelected}
				/>
			)}
			
		</div>
	)
}
export default MeleeAttackCommandInstructions;