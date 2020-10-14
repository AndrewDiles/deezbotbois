import React, { useState } from 'react';

import { useSelector } from "react-redux";
import { getThemeColors } from '../../../Redux/reducers/user-reducer';

import styled from 'styled-components';
import CommandRow from './CommandRow';
import ConfirmLossOfNodes from './ConfirmLossOfNodes';

const Commands = ({ botNumberSelected, attributes, aiAndScripts, setAiAndScripts, activeNodeArray, setActiveNodeArray }) => {
	const settings = useSelector((state) => state.settings);
	const colors = useSelector(getThemeColors);
	const [availableCommands, setAvailableCommands] = useState([]);
	const [losingNestedNodes, setLosingNestedNodes] = useState(null);
	React.useEffect(()=>{
		let grabbedCommands = [];
		Object.keys(attributes).forEach((attribute)=>{
			attribute.includes('Command') && attributes[attribute] && grabbedCommands.push(attribute);
		})
		setAvailableCommands(grabbedCommands);
	}, [attributes])
	
  return (
    <Wrapper>
      <p>
				COMMANDS
			</p>
			{losingNestedNodes ? (
				<Options>
					<ConfirmLossOfNodes
					botNumberSelected = {botNumberSelected}
					aiAndScripts = {aiAndScripts}
					setAiAndScripts = {setAiAndScripts}
					activeNodeArray = {activeNodeArray}
					setActiveNodeArray = {setActiveNodeArray}
					losingNestedNodes = {losingNestedNodes}
					setLosingNestedNodes = {setLosingNestedNodes}
					/>
				</Options>
			) : (
				<Options>
					{availableCommands.map((commandOption, index)=>(
						<CommandRow
						key = {commandOption}
						commandOption = {commandOption}
						aiAndScripts = {aiAndScripts}
						setAiAndScripts = {setAiAndScripts}
						index = {index}
						activeNodeArray = {activeNodeArray}
						setActiveNodeArray = {setActiveNodeArray}
						botNumberSelected= {botNumberSelected}
						setLosingNestedNodes = {setLosingNestedNodes}
						/>
					))}
				</Options>
			)}
			
    </Wrapper>
  )
}
export default Commands;

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