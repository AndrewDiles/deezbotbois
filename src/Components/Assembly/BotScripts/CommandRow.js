import React from 'react';

import styled from 'styled-components';
import Command from '../ComprehensiveAttributes/Command';
import AddIcon from './AddIcon';
import SwapIcon from './SwapIcon';
import NodeInsersionIndicator from './NodeInsersionIndicator';

const CommandRow = ({ botNumberSelected, commandOption, aiAndScripts, setAiAndScripts, index, activeNodeArray, setActiveNodeArray, setLosingNestedNodes }) => {
	const [helpNeeded, setHelpNeeded] = React.useState(false);
	// console.log({setHelpNeeded})

	return helpNeeded ? 
		<NodeInsersionIndicator
		setHelpNeeded = {setHelpNeeded}
		/>
		:
		<RowDiv
		key = {commandOption}
		className = 'centeredFlex'
		>
			<Command
			value = {true}
			attribute = {commandOption}
			width = {200}
			excludesCommand = {true}
			/>
			{aiAndScripts.viewing[aiAndScripts.viewing.length-1].index === activeNodeArray.length ? (
				<AddIcon
				aiAndScripts = {aiAndScripts}
				setAiAndScripts = {setAiAndScripts}
				decisionName = {commandOption}
				index = {index}
				setHelpNeeded = {setHelpNeeded}
				activeNodeArray = {activeNodeArray}
				setActiveNodeArray = {setActiveNodeArray}
				botNumberSelected = {botNumberSelected}
				/>
			) : (
				<SwapIcon
				aiAndScripts = {aiAndScripts}
				setAiAndScripts = {setAiAndScripts}
				decisionName = {commandOption}
				index = {index}
				setHelpNeeded = {setHelpNeeded}
				activeNodeArray = {activeNodeArray}
				setActiveNodeArray = {setActiveNodeArray}
				botNumberSelected = {botNumberSelected}
				setLosingNestedNodes = {setLosingNestedNodes}
				/>
			)}
			
		</RowDiv>
}
export default CommandRow;

const Wrapper = styled.div`
	height: 600px;
`
const Options = styled.div`
	display: flex;
	align-items: center;
	text-align: center;
	flex-direction: column;
	overflow-y: auto;
	width: 250px;
	height: 500px;
	border-top: 1px solid rgba(0,0,0,0.24);
`
const RowDiv = styled.div`
	height: 50px;
	width: 250px;
	border-bottom: 1px solid rgba(0,0,0,0.24);
`