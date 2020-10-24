import React from 'react';
import styled from 'styled-components';
import StyledButton from '../../../StyledButton/StyledButton';

const ThresholdSetter = ({ nodeInfo, activeNodeArray, setActiveNodeArray, botNumberSelected, aiAndScripts }) => {

	function modifyThreshold(value) {
		let newActiveNodeArray = [...activeNodeArray];
		newActiveNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.threshold += value;
		setActiveNodeArray(newActiveNodeArray)
	}

	return (		
		<EvaluationTypeSelectorContainer>
			<Request className = 'centeredFlex'>
				SET THRESHOLD
			</Request>
			<Options className = 'betweenFlex'>
				<StyledButton
				handleClick = {()=>{modifyThreshold(-1)}}
				fontSize = '22'
				width = '40'
				disabled = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.threshold === 0}
				>
					-
				</StyledButton>

				{activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.threshold}
				
				<StyledButton
				handleClick = {()=>{modifyThreshold(1)}}
				fontSize = '22'
				width = '40'
				disabled = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.threshold === 20}
				>
					+
				</StyledButton>
			</Options>
		</EvaluationTypeSelectorContainer>
	)
}
export default ThresholdSetter;
const EvaluationTypeSelectorContainer = styled.div`
	width: 100%;
	height: 40px;
	display: flex;
`
const Request = styled.div`
	height: 100%;
	width: 49%;
	font-size: 0.8em;
`
const Options = styled.div`
	height: 100%;
	width: 50%;
	flex-direction: row;
	font-size: 1.2em;
`