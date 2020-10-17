import React from 'react';
import MicroConditionsProvider from './MicroConditionsProvider';
import CommandTemplate from './Commands/CommandTemplate';

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
		// this needs to be changed to ConditionTemplate just like the CommandTemplate and its children below
		<MicroConditionsProvider
		nodeInfo = {nodeInfo.condition}
		activeNodeArray = {activeNodeArray}
		setActiveNodeArray = {setActiveNodeArray}
		aiAndScripts = {aiAndScripts}
		setAiAndScripts = {setAiAndScripts}
		botNumberSelected = {botNumberSelected}
		/>
	) : (
		<CommandTemplate
		attributes = {attributes}
		nodeInfo = {nodeInfo.command}
		activeNodeArray = {activeNodeArray}
		setActiveNodeArray = {setActiveNodeArray}
		aiAndScripts = {aiAndScripts}
		setAiAndScripts = {setAiAndScripts}
		botNumberSelected = {botNumberSelected}
		/>
	)
}
export default MicroNodeOptions;