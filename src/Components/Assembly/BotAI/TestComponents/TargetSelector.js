import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import scriptUpdater from '../scriptUpdater';
import styled from 'styled-components';
import StyledButton from '../../../StyledButton/StyledButton';

const TargetSelector = ({ activeNodeArray, setActiveNodeArray, aiAndScripts, botNumberSelected }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const dispatch = useDispatch();

	function setTarget(number) {
		let newActiveNodeArray = [...activeNodeArray];
		newActiveNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.targetNumber = number;
		setActiveNodeArray(newActiveNodeArray);
		scriptUpdater(botNumberSelected, aiAndScripts, newActiveNodeArray, dispatch, userInfo);
	}

	return (		
		<>
			<TargetSelectorContainer>
				<Request className = 'centeredFlex'>
					SET TARGET NUMBER
				</Request>
				<Options className = 'centeredFlex'>
					{[1,2,3,4,5].map((number)=>{
						return (
							<StyledButton
							key = {number}
							handleClick = {()=>{setTarget(number)}}
							selected = {number === activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.targetNumber}
							fontSize = {9}
							width = '30'
							>
								{number}
							</StyledButton>
						)
						
					})}
				</Options>
			</TargetSelectorContainer>
		</>
	)
}
export default TargetSelector;
const TargetSelectorContainer = styled.div`
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