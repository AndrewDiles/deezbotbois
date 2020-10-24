import React from 'react';
import TargetSelector from '../InstructionsComponents/TargetSelector';

const RamCommandInstructions = ({ activeNodeArray, setActiveNodeArray, aiAndScripts, botNumberSelected }) => {

	return (		
		<div className = 'commandContents'>
			<TargetSelector
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			aiAndScripts = {aiAndScripts}
			botNumberSelected = {botNumberSelected}
			/>
		</div>
	)
}
export default RamCommandInstructions;