import React from 'react';
import TargetSelector from '../InstructionsComponents/TargetSelector';

const RamCommandInstructions = ({ activeNodeArray, setActiveNodeArray, aiAndScripts }) => {

	return (		
		<div className = 'commandContents'>
			<TargetSelector
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			aiAndScripts = {aiAndScripts}
			/>
		</div>
	)
}
export default RamCommandInstructions;