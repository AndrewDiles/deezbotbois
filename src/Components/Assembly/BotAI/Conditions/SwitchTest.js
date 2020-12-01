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
			<p>
				CASE IS TRUE IF SWITCH IS ON
			</p>
			<br/>
			{5 === activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.switchNumber && (
				<p>
					NOTE: SWITCH 5 FLIPS TO OFF AFTER IT HAS BEEN ON FOR A ONE TICK CYCLE
				</p>
			)}
		</div>
	)
}
export default SwitchTest;