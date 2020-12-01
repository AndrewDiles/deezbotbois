import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import scriptUpdater from '../scriptUpdater';
import styled from 'styled-components';
import StyledButton from '../../../StyledButton/StyledButton';

const SwitchSelector = ({ activeNodeArray, setActiveNodeArray, aiAndScripts, botNumberSelected }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const dispatch = useDispatch();

	function setSwitch(number) {
		let newActiveNodeArray = [...activeNodeArray];
		newActiveNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.switchNumber = number;
		setActiveNodeArray(newActiveNodeArray);
		scriptUpdater(botNumberSelected, aiAndScripts, newActiveNodeArray, dispatch, userInfo);
	}

	return (		
		<>
			<SwitchSelectorContainer>
				<Request className = 'centeredFlex'>
					TEST SWITCH NUMBER
				</Request>
				<Options className = 'centeredFlex'>
					{[1,2,3,4,5].map((number)=>{
						return (
							<StyledButton
							key = {number}
							handleClick = {()=>{setSwitch(number)}}
							selected = {number === activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.switchNumber}
							fontSize = {9}
							width = '30'
							sfx = {number === activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.switchNumber ? 'disabled' : 'selected'}
							>
								{number}
							</StyledButton>
						)
						
					})}
				</Options>
			</SwitchSelectorContainer>
		</>
	)
}
export default SwitchSelector;
const SwitchSelectorContainer = styled.div`
	width: 100%;
	height: 40px;
	display: flex;
`
const Request = styled.div`
	height: 100%;
	width: 39%;
	font-Size: 0.8em;
`
const Options = styled.div`
	height: 100%;
	width: 60%;
`