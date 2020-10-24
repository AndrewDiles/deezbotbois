import React from 'react';
import WeaponSelector from '../InstructionsComponents/WeaponSelector';
import RotatingToggle from '../InstructionsComponents/RotatingToggle';
import RotationSetter from '../InstructionsComponents/RotationSetter';
import DirectionSetter from '../InstructionsComponents/DirectionSetter';

const AimCommandInstructions = ({ nodeInfo, activeNodeArray, setActiveNodeArray, botNumberSelected, aiAndScripts }) => {

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
			<br/>
			<RotatingToggle
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			aiAndScripts = {aiAndScripts}
			botNumberSelected = {botNumberSelected}
			/>
			<br/>
			{activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.rotating ?
			(
				<RotationSetter
				activeNodeArray = {activeNodeArray}
				setActiveNodeArray = {setActiveNodeArray}
				aiAndScripts = {aiAndScripts}
				botNumberSelected = {botNumberSelected}
				/>
			) : (
				<DirectionSetter
				activeNodeArray = {activeNodeArray}
				setActiveNodeArray = {setActiveNodeArray}
				aiAndScripts = {aiAndScripts}
				botNumberSelected = {botNumberSelected}
				/>
			)}
		</div>
	)
}
export default AimCommandInstructions;