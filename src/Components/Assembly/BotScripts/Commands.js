import React, { useState } from 'react';

import { useSelector } from "react-redux";
import { getThemeColors } from '../../../Redux/reducers/user-reducer';

import styled from 'styled-components';
import Command from '../ComprehensiveAttributes/Command';
import AddIcon from './AddIcon';

const Commands = ({ attributes, aiInesertionPoint }) => {
	const settings = useSelector((state) => state.settings);
	const colors = useSelector(getThemeColors);
	const [availableCommands, setAvailableCommands] = useState([]);
	React.useEffect(()=>{
		let grabbedCommands = [];
		Object.keys(attributes).forEach((attribute)=>{
			attribute.includes('Command') && attributes[attribute] && grabbedCommands.push(attribute);
		})
		setAvailableCommands(grabbedCommands);
	}, [attributes])
	
  return (
    <Wrapper>
      <h3>
				COMMANDS
			</h3>
			<Options>
				{availableCommands.map((commandOption)=>(
					<RowDiv
					key = {commandOption}
					className = 'centeredFlex'
					>
						<Command
						value = {true}
						attribute = {commandOption}
						width = {200}
						/>
						<AddIcon/>
					</RowDiv>
				))}
			</Options>
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
`
const RowDiv = styled.div`
	height: 50px;
	width: 250px;
`