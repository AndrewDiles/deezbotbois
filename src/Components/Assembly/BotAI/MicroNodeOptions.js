import React from 'react';
import MicroConditionsProvider from './MicroConditionsProvider';
import CommandTemplate from './Commands/CommandTemplate';
import ConditionTemplate from './Conditions/ConditionTemplate';

const MicroNodeOptions = ({ attributes, nodeInfo, activeNodeArray, setActiveNodeArray, botNumberSelected, aiAndScripts, setAiAndScripts }) => {

	if (!nodeInfo.condition && !nodeInfo.command) {
		return (
			<>
				NODE DATA
				<br/>
				NOT FOUND
			</>
		)
	}
	return nodeInfo.condition ? (
		<ConditionTemplate
		attributes = {attributes}
		nodeInfo = {nodeInfo.condition}
		activeNodeArray = {activeNodeArray}
		setActiveNodeArray = {setActiveNodeArray}
		aiAndScripts = {aiAndScripts}
		botNumberSelected = {botNumberSelected}
		/>
	) : (
		<CommandTemplate
		attributes = {attributes}
		nodeInfo = {nodeInfo.command}
		activeNodeArray = {activeNodeArray}
		setActiveNodeArray = {setActiveNodeArray}
		aiAndScripts = {aiAndScripts}
		botNumberSelected = {botNumberSelected}
		/>
	)
}
export default MicroNodeOptions;