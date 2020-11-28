import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import scriptUpdater from '../scriptUpdater';
import styled from 'styled-components';
import StyledButton from '../../../StyledButton/StyledButton';

const StepRemoval = ({ activeNodeArray, setActiveNodeArray, aiAndScripts, emptyPath, botNumberSelected }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const dispatch = useDispatch();

	function handleRemoveStep() {
		let newActiveNodeArray = [...activeNodeArray];
		newActiveNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.directions.pop();
		setActiveNodeArray(newActiveNodeArray);
		scriptUpdater(botNumberSelected, aiAndScripts, newActiveNodeArray, dispatch, userInfo);
	}
	function handleResetPath() {
		let newActiveNodeArray = [...activeNodeArray];
		let newPath = []
		newActiveNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.directions = newPath;
		setActiveNodeArray(newActiveNodeArray);
		scriptUpdater(botNumberSelected, aiAndScripts, newActiveNodeArray, dispatch, userInfo);
	}

	return (		
		<>
			<PathSetterContainer
			error = {emptyPath}
			>
				<StyledButton
				handleClick = {() => {handleRemoveStep()}}
				disabled = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.directions.length === 0}
				width = {120}
				sfx = 'confirm'
				// fontSize = '11'
				>
					REMOVE A STEP
				</StyledButton>
				<StyledButton
				handleClick = {() => {handleResetPath()}}
				disabled = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.directions.length === 0}
				width = {120}
				sfx = 'confirm'
				// fontSize = '11'
				>
					RESET PATH
				</StyledButton>

			</PathSetterContainer>
		</>
	)
}
export default StepRemoval;
const PathSetterContainer = styled.div`
	width: 100%;
	height: 40px;
	display: flex;
	background: ${props => props.error && 'rgba(255,0,0,0.2)'};
`
const Request = styled.div`
	height: 100%;
	width: 44%;
	/* font-size: 0.8em; */
`
const Options = styled.div`
	height: 100%;
	width: 55%;
	display: grid;
	/* grid-gap: 5px; */
  grid-template-columns: repeat(3, 1fr);
	
`
const BlankEntry = styled.div`
	height: 40px;
	width: 40px;
`