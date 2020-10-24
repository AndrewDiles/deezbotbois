import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import scriptUpdater from '../scriptUpdater';
import styled from 'styled-components';
import StyledButton from '../../../StyledButton/StyledButton';

const RotatingToggle = ({ activeNodeArray, setActiveNodeArray, aiAndScripts, botNumberSelected }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const dispatch = useDispatch();

	function toggleRotationType(input) {
		let newActiveNodeArray = [...activeNodeArray];
		newActiveNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.rotating = input;
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
				handleClick = {()=>{toggleRotationType(true)}}
				selected = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.rotating === true}
				fontSize = {9}
				// disabled = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.rotating === true}
				>
					BY INCREMENT
				</StyledButton>
				<StyledButton
				handleClick = {()=>{toggleRotationType(false)}}
				selected = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.rotating === false}
				fontSize = {9}
				// disabled = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.rotating === false}
				>
					SET DIRECTION
				</StyledButton>
			</Options>
		</AimTypeSelectionContainer>
	)
}
export default RotatingToggle;
const AimTypeSelectionContainer = styled.div`
	width: 100%;
	height: 85px;
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