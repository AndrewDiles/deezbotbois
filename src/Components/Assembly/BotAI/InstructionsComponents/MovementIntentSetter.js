import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import scriptUpdater from '../scriptUpdater';
import styled from 'styled-components';
import StyledButton from '../../../StyledButton/StyledButton';

const MovementIntentSetter = ({ activeNodeArray, setActiveNodeArray, aiAndScripts, botNumberSelected }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const dispatch = useDispatch();

	function selectIntent(input) {
		let newActiveNodeArray = [...activeNodeArray];
		if (input === 'adjacent') {
			newActiveNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.targetting = true;
			newActiveNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.intent = input;
		} else if (input === 'collision') {
			newActiveNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.targetting = true;
			newActiveNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.intent = input;
		} else {
			newActiveNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.targetting = false;
		}
		setActiveNodeArray(newActiveNodeArray);
		scriptUpdater(botNumberSelected, aiAndScripts, newActiveNodeArray, dispatch, userInfo);
	}

	return (		
		<IntentSelectionContainer>
			<Request className = 'centeredFlex'>
				SELECT MOVE INTENT
			</Request>
			<Options className = 'evenlyFlex'>
				<StyledButton
				handleClick = {()=>{selectIntent('adjacent')}}
				selected = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.intent === 'adjacent' &&
				activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.targetting}
				fontSize = {9}
				width = {120}
				>
					ADJACENT TO TARGET
				</StyledButton>
				<StyledButton
				handleClick = {()=>{selectIntent('collision')}}
				selected = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.intent === 'collision' &&
				activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.targetting}
				fontSize = {9}
				width = {120}
				>
					COLLIDE WITH TARGET
				</StyledButton>
				<StyledButton
				handleClick = {()=>{selectIntent('path')}}
				selected = {!activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.targetting}
				fontSize = {9}
				width = {120}
				>
					PLOT A PATH
				</StyledButton>
			</Options>
		</IntentSelectionContainer>
	)
}
export default MovementIntentSetter;
const IntentSelectionContainer = styled.div`
	width: 100%;
	height: 130px;
	display: flex;
`
const Request = styled.div`
	height: 100%;
	width: 49%;
`
const Options = styled.div`
	height: 100%;
	width: 50%;
	flex-direction: column;
`