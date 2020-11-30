import React from 'react';
import EvaluationTypeSelector from '../TestComponents/EvaluationTypeSelector';
import SwitchSelector from '../TestComponents/SwitchSelector';

const SwitchTest = ({ activeNodeArray, setActiveNodeArray, botNumberSelected, aiAndScripts }) => {

	return (		
		<div className = 'commandContents'>
			<SwitchSelector
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
			optionsArray = {['ON','OFF']}
			botNumberSelected = {botNumberSelected}
			/>
			<br/>
		</div>
	)
}
export default SwitchTest;