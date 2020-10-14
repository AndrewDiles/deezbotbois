import React from 'react';
import MicroConditionsProvider from './MicroConditionsProvider';
import MicroCommandsProvider from './MicroCommandsProvider';

const MicroNodeOptions = ({ nodeInfo, activeNodeArray, botNumberSelected, aiAndScripts, setAiAndScripts }) => {

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
		<MicroConditionsProvider
		nodeInfo = {nodeInfo.condition}
		activeNodeArray = {activeNodeArray}
		aiAndScripts = {aiAndScripts}
		setAiAndScripts = {setAiAndScripts}
		botNumberSelected = {botNumberSelected}
		/>
	) : (
		<MicroCommandsProvider
		nodeInfo = {nodeInfo.command}
		activeNodeArray = {activeNodeArray}
		aiAndScripts = {aiAndScripts}
		setAiAndScripts = {setAiAndScripts}
		botNumberSelected = {botNumberSelected}
		/>
	)
}
export default MicroNodeOptions;