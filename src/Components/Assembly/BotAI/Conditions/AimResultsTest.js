import React from 'react';
import TestTargetsSetter from '../TestComponents/TestTargetsSetter';
import EvaluationTypeSelector from '../TestComponents/EvaluationTypeSelector';

const AimResultsTest = ({ nodeInfo, activeNodeArray, setActiveNodeArray, botNumberSelected, aiAndScripts }) => {

	return (		
		<div className = 'commandContents'>
			<TestTargetsSetter
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			aiAndScripts = {aiAndScripts}
			botNumberSelected = {botNumberSelected}
			infoGatheredBy = 'scan'
			targets = {['hostile', 'friend']}
			/>
			<br/>
			<EvaluationTypeSelector
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			aiAndScripts = {aiAndScripts}
			optionsArray = {['=','≠']}
			botNumberSelected = {botNumberSelected}
			customKeyToChange = 'targetEvaluationType'
			/>
		</div>
	)
}
export default AimResultsTest;