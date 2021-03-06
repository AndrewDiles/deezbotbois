import React from 'react';
import TargetSelector from '../TestComponents/TargetSelector';
import TestTargetsSetter from '../TestComponents/TestTargetsSetter';

const ObstructionToTest = ({ nodeInfo, activeNodeArray, setActiveNodeArray, botNumberSelected, aiAndScripts }) => {

	return (		
		<div className = 'commandContents'>
			<TargetSelector
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			aiAndScripts = {aiAndScripts}
			botNumberSelected = {botNumberSelected}
			/>
			<br/>
			<TestTargetsSetter
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			aiAndScripts = {aiAndScripts}
			botNumberSelected = {botNumberSelected}
			infoGatheredBy = 'scan'
			/>
		</div>
	)
}
export default ObstructionToTest;