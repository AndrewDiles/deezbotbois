import React from 'react';
import styled from 'styled-components';
import StyledButton from '../../../StyledButton/StyledButton';

const RotatingOrTargettingToggles = ({ activeNodeArray, setActiveNodeArray, aiAndScripts }) => {
	
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
		setActiveNodeArray(newActiveNodeArray)
	}

	return (		
		<AimTypeSelectionContainer>
			<Request className = 'centeredFlex'>
				SELECT AIMING METHOD
			</Request>
			<Options className = 'centeredFlex'>
			<StyledButton
				handleClick = {()=>{handleSetAimMethod('targetting')}}
				selected = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.targetting === true}
				fontSize = {9}
				>
					SCANNED TARGET
				</StyledButton>
				<StyledButton
				handleClick = {()=>{handleSetAimMethod('rotating')}}
				selected = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.rotating === true}
				fontSize = {9}
				>
					BY INCREMENT
				</StyledButton>
				<StyledButton
				handleClick = {()=>{handleSetAimMethod('pointing')}}
				selected = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.rotating === false &&
					activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.targetting === false}
				fontSize = {9}
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
	height: 120px;
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