import React from 'react';
import WeaponSelector from '../InstructionsComponents/WeaponSelector';

const RangedAttackCommandInstructions = ({ nodeInfo, activeNodeArray, setActiveNodeArray, botNumberSelected, aiAndScripts }) => {

	return (		
		<div className = 'commandContents'>
			<WeaponSelector
			nodeInfo = {nodeInfo}
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			botNumberSelected = {botNumberSelected}
			aiAndScripts = {aiAndScripts}
			weaponType = 'Ranged'
			/>
		</div>
	)
}
export default RangedAttackCommandInstructions;