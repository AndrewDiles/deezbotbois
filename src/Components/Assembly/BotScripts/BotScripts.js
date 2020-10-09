import React, { useState } from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import StyledButton from '../../StyledButton/StyledButton';
import Conditions from './Conditions';
import Commands from './Commands';

const BotScripts = ({ attributes, aiInesertionPoint }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const [typeViewing, setTypeViewing] = useState('conditions');

	if (!userInfo.botBuilds || !attributes) {
		return (<></>)
	}
	
  return (
    <Wrapper
		className = "assemblyGridChild" 
		>
			<RowDiv className = 'centeredFlex'>
				<StyledButton
				handleClick = {e=> {setTypeViewing('conditions')}}
				selected = {typeViewing === 'conditions'}
				// disabled = {typeViewing === 'conditions'}
				width = '120'
				fontSize = '10'
				>
					CONDITIONS
				</StyledButton>
				<StyledButton
				handleClick = {e=> {setTypeViewing('commands')}}
				selected = {typeViewing === 'commands'}
				// disabled = {typeViewing === 'commands'}
				width = '120'
				fontSize = '10'
				>
					COMMANDS
				</StyledButton>
			</RowDiv>
			{typeViewing === 'conditions' &&
				<Conditions
				aiInesertionPoint = {aiInesertionPoint}
				/>
			}
			{typeViewing === 'commands' && 
				<Commands
				attributes = {attributes}
				aiInesertionPoint = {aiInesertionPoint}
				/>
			}
    </Wrapper>
  )
}
export default BotScripts;
const Wrapper = styled.div`
	width: 250px;
`
const RowDiv = styled.div`
	display: flex;
	flex-direction: row;
`