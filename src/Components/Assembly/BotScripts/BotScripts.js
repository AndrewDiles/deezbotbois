import React, { useState } from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import StyledButton from '../../StyledButton/StyledButton';
import Conditions from './Conditions';
import Commands from './Commands';

const BotScripts = ({ attributes, aiAndScripts, setAiAndScripts }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const [typeViewing, setTypeViewing] = useState('conditions');

	if (!userInfo.botBuilds || !attributes) {
		return (<></>)
	}
	
  return (
    <Wrapper
		className = "assemblyGridChild" 
		>
			<h3>
				NODE OPTIONS
			</h3>
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
				aiAndScripts = {aiAndScripts}
				/>
			}
			{typeViewing === 'commands' && 
				<Commands
				attributes = {attributes}
				aiAndScripts = {aiAndScripts}
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