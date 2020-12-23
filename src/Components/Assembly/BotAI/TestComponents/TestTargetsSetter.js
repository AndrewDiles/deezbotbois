import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import scriptUpdater from '../scriptUpdater';
import styled from 'styled-components';
import StyledButton from '../../../StyledButton/StyledButton';

const TestTargetsSetter = ({ activeNodeArray, setActiveNodeArray, botNumberSelected, aiAndScripts, infoGatheredBy, ignoreTargetEvaluationType, targets, includesAny }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const dispatch = useDispatch();
	let targetsArray = ['hostile', 'friend', 'wall', 'corner'];
	if (includesAny) {
		targetsArray.push('any');
	}
	if (targets) {
		targetsArray = targets;
	}

	function setTestTargets(type) {
		let newActiveNodeArray = [...activeNodeArray];
		newActiveNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.testTargets = type;
		setActiveNodeArray(newActiveNodeArray);
		scriptUpdater(botNumberSelected, aiAndScripts, newActiveNodeArray, dispatch, userInfo);
	}

	return (		
		<EvaluationTypeSelectorContainer
		heightMultiplier = {targetsArray.length}
		>
			<Request className = 'centeredFlex'>
				{infoGatheredBy === 'scan' ? (
					ignoreTargetEvaluationType === '1' ? (
						'TEST FOR'
					) : (
						activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.targetEvaluationType !== '≠' ? (
							'TEST FOR'
						) : (
							'TEST FOR NOT'
						)
					)
				) : (
				activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.evaluationType !== '≠' ? (
					'TEST IF DIRECTION CONTAINS'
				) : (
					'TEST IF DIRECTION DOES NOT CONTAIN'
				))}
				
			</Request>
			<Options
			className = 'evenlyFlex'
			>
				{targetsArray.map((target)=>{
					return (
						<StyledButton
						key = {target}
						handleClick = {()=>{setTestTargets(target)}}
						selected = {target === activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test.testTargets}
						fontSize = {target.length >= 10 ? '10' : '12'}
						sfx = 'selected'
						>
							{target.toUpperCase()}
						</StyledButton>
					)
				})}
			</Options>
		</EvaluationTypeSelectorContainer>
	)
}

export default TestTargetsSetter;
const EvaluationTypeSelectorContainer = styled.div`
	width: 100%;
	height: ${props => props.heightMultiplier ? `${(props.heightMultiplier*40)+((props.heightMultiplier-1)*5)}px` : '40px'};
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