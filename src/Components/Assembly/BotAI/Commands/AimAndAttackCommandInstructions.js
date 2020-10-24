import React from 'react';
import WeaponSelector from '../InstructionsComponents/WeaponSelector';
import RotatingOrTargettingToggles from '../InstructionsComponents/RotatingOrTargettingToggles';
import RotationSetter from '../InstructionsComponents/RotationSetter';
import TargetSelector from '../InstructionsComponents/TargetSelector';
import DirectionSetter from '../InstructionsComponents/DirectionSetter';

const AimAndAttackCommandInstructions = ({ nodeInfo, activeNodeArray, setActiveNodeArray, botNumberSelected, aiAndScripts }) => {

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
			<RotatingOrTargettingToggles
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			aiAndScripts = {aiAndScripts}
			botNumberSelected = {botNumberSelected}
			/>
			<br/>
			{activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.rotating &&
				<RotationSetter
				activeNodeArray = {activeNodeArray}
				setActiveNodeArray = {setActiveNodeArray}
				aiAndScripts = {aiAndScripts}
				botNumberSelected = {botNumberSelected}
				/>
			}
			{activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.targetting &&
				<TargetSelector
				activeNodeArray = {activeNodeArray}
				setActiveNodeArray = {setActiveNodeArray}
				aiAndScripts = {aiAndScripts}
				botNumberSelected = {botNumberSelected}
				/>
			}
			{!activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.rotating &&
			!activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.targetting &&
				<DirectionSetter
				activeNodeArray = {activeNodeArray}
				setActiveNodeArray = {setActiveNodeArray}
				aiAndScripts = {aiAndScripts}
				botNumberSelected = {botNumberSelected}
				/>
			}
		</div>
	)
}
export default AimAndAttackCommandInstructions;