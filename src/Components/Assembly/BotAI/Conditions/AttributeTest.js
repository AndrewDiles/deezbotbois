import React from 'react';
import TestTargetsSetter from '../TestComponents/TestTargetsSetter';
import EvaluationTypeSelector from '../TestComponents/EvaluationTypeSelector';
import ThresholdSetter from '../TestComponents/ThresholdSetter';

const AttributeTest = ({ nodeInfo, activeNodeArray, setActiveNodeArray, botNumberSelected, aiAndScripts }) => {

	return (		
		<div className = 'commandContents'>
			<TestTargetsSetter
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			aiAndScripts = {aiAndScripts}
			botNumberSelected = {botNumberSelected}
			infoGatheredBy = 'scan'
			ignoreTargetEvaluationType = '1'
			targets = {['durability', 'capacitor']}
			/>
			<br/>
			<EvaluationTypeSelector
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			aiAndScripts = {aiAndScripts}
			optionsArray = {['=','≠','>','<']}
			botNumberSelected = {botNumberSelected}
			/>
			<br/>
			<ThresholdSetter
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			aiAndScripts = {aiAndScripts}
			botNumberSelected = {botNumberSelected}
			/>
		</div>
	)
}
export default AttributeTest;