import React from 'react';
import EvaluationTypeSelector from '../TestComponents/EvaluationTypeSelector';
import TestTargetsSetter from '../TestComponents/TestTargetsSetter';
import TestReturnDirectionSetter from '../TestComponents/TestReturnDirectionSetter';

const AdjacentToTest = ({ nodeInfo, activeNodeArray, setActiveNodeArray, botNumberSelected, aiAndScripts }) => {

	return (		
		<div className = 'commandContents'>
			<TestReturnDirectionSetter
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
			includesAny = {1}
			/>
			<br/>
			<EvaluationTypeSelector
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			aiAndScripts = {aiAndScripts}
			optionsArray = {['=','≠']}
			botNumberSelected = {botNumberSelected}
			/>
			
		</div>
	)
}
export default AdjacentToTest;