import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import scriptUpdater from '../scriptUpdater';
import styled from 'styled-components';
import StyledButton from '../../../StyledButton/StyledButton';

const RotatingOrTargettingToggles = ({ activeNodeArray, setActiveNodeArray, aiAndScripts, botNumberSelected }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const dispatch = useDispatch();

	function handleSetAimMethod(method) {
		let newActiveNodeArray = [...activeNodeArray];
		if (method === 'targetting') {
			newActiveNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.targetting = true;
			newActiveNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.rotating = false;
		} else if (method === 'rotating') {
			newActiveNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.targetting = false;
			newActiveNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.rotating = true;
		} else if (method === 'pointing') {
			newActiveNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.targetting = false;
			newActiveNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.rotating = false;
		} else {
			console.log('unknown method entered:', method)
		}
		setActiveNodeArray(newActiveNodeArray);
		scriptUpdater(botNumberSelected, aiAndScripts, newActiveNodeArray, dispatch, userInfo);
	}

	return (		
		<AimTypeSelectionContainer>
			<Request className = 'centeredFlex'>
				SELECT AIMING METHOD
			</Request>
			<Options className = 'evenlyFlex'>
				<StyledButton
				handleClick = {()=>{handleSetAimMethod('targetting')}}
				selected = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.targetting === true}
				fontSize = {9}
				sfx = 'selected'
				>
					SCANNED TARGET
				</StyledButton>
				<StyledButton
				handleClick = {()=>{handleSetAimMethod('rotating')}}
				selected = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.rotating === true}
				fontSize = {9}
				sfx = 'selected'
				>
					BY INCREMENT
				</StyledButton>
				<StyledButton
				handleClick = {()=>{handleSetAimMethod('pointing')}}
				selected = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.rotating === false &&
					activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.targetting === false}
				fontSize = {9}
				sfx = 'selected'
				>
					SET DIRECTION
				</StyledButton>
			</Options>
		</AimTypeSelectionContainer>
	)
}
export default RotatingOrTargettingToggles;
const AimTypeSelectionContainer = styled.div`
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