import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import scriptUpdater from '../scriptUpdater';
import styled from 'styled-components';
import StyledButton from '../../../StyledButton/StyledButton';

const SwitchSetter = ({ switchNumber, activeNodeArray, setActiveNodeArray, aiAndScripts, botNumberSelected }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const dispatch = useDispatch();

	function setSwitch(value) {
		let newActiveNodeArray = [...activeNodeArray];
		newActiveNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions[switchNumber] = value;
		setActiveNodeArray(newActiveNodeArray);
		scriptUpdater(botNumberSelected, aiAndScripts, newActiveNodeArray, dispatch, userInfo);
	}

	return (		
		<>
			<SwitchSetterContainer>
				<Request className = 'centeredFlex'>
					SWITCH {switchNumber} CHANGES
				</Request>
				<Options className = 'evenlyFlex'>
					{['ON', 'OFF', 'FLIP', 'NONE'].map((value)=>{
						return (
							<StyledButton
							key = {value}
							handleClick = {()=>{setSwitch(value)}}
							selected = {value === activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions[switchNumber]}
							fontSize = {9}
							width = '50'
							sfx = {value === activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions[switchNumber] ? 'disabled' : 'selected'}
							>
								{value}
							</StyledButton>
						)
						
					})}
				</Options>
			</SwitchSetterContainer>
		</>
	)
}
export default SwitchSetter;
const SwitchSetterContainer = styled.div`
	width: 100%;
	height: 60px;
	display: flex;
	flex-direction: column;
	margin-bottom: 10px;
`
const Request = styled.div`
	height: 20px;
	width: 100%;
	font-Size: 0.8em;
`
const Options = styled.div`
	height: 40px;
	width: 100%;
	/* padding: 0 10px; */
`