import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import scriptUpdater from '../scriptUpdater';
import styled from 'styled-components';
import StyledButton from '../../../StyledButton/StyledButton';

const TargettingToggle = ({ activeNodeArray, setActiveNodeArray, aiAndScripts, botNumberSelected }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const dispatch = useDispatch();

	function toggleTargettingType(input) {
		let newActiveNodeArray = [...activeNodeArray];
		newActiveNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.targetting = input;
		setActiveNodeArray(newActiveNodeArray);
		scriptUpdater(botNumberSelected, aiAndScripts, newActiveNodeArray, dispatch, userInfo);
	}

	return (		
		<AttackSelectionContainer>
			<Request className = 'centeredFlex'>
				SELECT ATTACK METHOD
			</Request>
			<Options className = 'evenlyFlex'>
				<StyledButton
				handleClick = {()=>{toggleTargettingType(true)}}
				selected = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.targetting === true}
				fontSize = {9}
				// disabled = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.rotating === true}
				>
					SCANNED TARGET
				</StyledButton>
				<StyledButton
				handleClick = {()=>{toggleTargettingType(false)}}
				selected = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.targetting === false}
				fontSize = {9}
				// disabled = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.rotating === false}
				>
					SET DIRECTION
				</StyledButton>
			</Options>
		</AttackSelectionContainer>
	)
}
export default TargettingToggle;
const AttackSelectionContainer = styled.div`
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