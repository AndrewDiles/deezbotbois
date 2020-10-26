import React from 'react';
import EvaluationTypeSelector from '../TestComponents/EvaluationTypeSelector';
import ThresholdSetter from '../TestComponents/ThresholdSetter';

const DamageTakenTest = ({ nodeInfo, activeNodeArray, setActiveNodeArray, botNumberSelected, aiAndScripts }) => {

	return (		
		<div className = 'commandContents'>
			<ThresholdSetter
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			aiAndScripts = {aiAndScripts}
			botNumberSelected = {botNumberSelected}
			/>
			<br/>
			<EvaluationTypeSelector
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			aiAndScripts = {aiAndScripts}
			optionsArray = {['=','≠','>','<']}
			botNumberSelected = {botNumberSelected}
			/>
		</div>
	)
}
export default DamageTakenTest;