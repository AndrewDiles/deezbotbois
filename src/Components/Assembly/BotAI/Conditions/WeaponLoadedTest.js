import React from 'react';
import ReloadableWeaponSelector from '../TestComponents/ReloadableWeaponSelector';
import EvaluationTypeSelector from '../TestComponents/EvaluationTypeSelector';
import ThresholdSetter from '../TestComponents/ThresholdSetter';

const WeaponLoadedTest = ({ nodeInfo, activeNodeArray, setActiveNodeArray, botNumberSelected, aiAndScripts }) => {

	return (		
		<div className = 'commandContents'>
			<ReloadableWeaponSelector
			nodeInfo = {nodeInfo}
			activeNodeArray = {activeNodeArray}
			setActiveNodeArray = {setActiveNodeArray}
			botNumberSelected = {botNumberSelected}
			aiAndScripts = {aiAndScripts}
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
export default WeaponLoadedTest;