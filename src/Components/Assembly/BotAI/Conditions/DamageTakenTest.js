import React from 'react';
import EvaluationTypeSelector from '../TestComponents/EvaluationTypeSelector';
import ThresholdSetter from '../TestComponents/ThresholdSetter';

const DamageTakenTest = ({ nodeInfo, activeNodeArray, setActiveNodeArray, botNumberSelected, aiAndScripts }) => {
// TODO : Change incrementation to 0.1 instead of 1, since damage increments in this way
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