import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import scriptUpdater from '../scriptUpdater';
import styled from 'styled-components';
import StyledButton from '../../../StyledButton/StyledButton';

const TestTargetsSetter = ({ nodeInfo, activeNodeArray, setActiveNodeArray, botNumberSelected, aiAndScripts, infoGatheredBy }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const dispatch = useDispatch();

	function setTestTargets(type) {
		let newActiveNodeArray = [...activeNodeArray];
		newActiveNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.testTargets = type;
		setActiveNodeArray(newActiveNodeArray);
		scriptUpdater(botNumberSelected, aiAndScripts, newActiveNodeArray, dispatch, userInfo);
	}

	return (		
		<EvaluationTypeSelectorContainer>
			<Request className = 'centeredFlex'>
				{infoGatheredBy === 'scan' ? (
					activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.targetEvaluationType === '=' ? (
						'TEST IF SCAN CONTAINS'
					) : (
						'TEST IF SCAN DOES NOT CONTAIN'
					)
				) : (
				activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.evaluationType === '=' ? (
					'TEST IF DIRECTION CONTAINS'
				) : (
					'TEST IF DIRECTION DOES NOT CONTAIN'
				))}
				
			</Request>
			<Options className = 'evenlyFlex'>
				<StyledButton
				handleClick = {()=>{setTestTargets('hostile')}}
				selected = {'hostile' === activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.testTargets}
				// fontSize = {'16'}
				>
					HOSTILE
				</StyledButton>
				<StyledButton
				handleClick = {()=>{setTestTargets('friend')}}
				selected = {'friend' === activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.testTargets}
				// fontSize = {'16'}
				>
					FRIEND
				</StyledButton>
				<StyledButton
				handleClick = {()=>{setTestTargets('wall')}}
				selected = {'wall' === activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.testTargets}
				// fontSize = {'16'}
				>
					WALL
				</StyledButton>
				<StyledButton
				handleClick = {()=>{setTestTargets('corner')}}
				selected = {'corner' === activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.testTargets}
				// fontSize = {'16'}
				>
					CORNER
				</StyledButton>
				<StyledButton
				handleClick = {()=>{setTestTargets('any')}}
				selected = {'any' === activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.testTargets}
				// fontSize = {'16'}
				>
					ANY
				</StyledButton>
			</Options>
		</EvaluationTypeSelectorContainer>
	)
}

export default TestTargetsSetter;
const EvaluationTypeSelectorContainer = styled.div`
	width: 100%;
	height: 220px;
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
	flex-direction: column;
`