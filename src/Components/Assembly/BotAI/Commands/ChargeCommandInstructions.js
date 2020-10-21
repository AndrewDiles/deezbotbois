import React from 'react';
import WeaponSelector from '../InstructionsComponents/WeaponSelector';
import TargetSelector from '../InstructionsComponents/TargetSelector';

const ChargeCommandInstructions = ({ nodeInfo, activeNodeArray, setActiveNodeArray, botNumberSelected, aiAndScripts }) => {

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
			/>
		</div>
	)
}
export default ChargeCommandInstructions;