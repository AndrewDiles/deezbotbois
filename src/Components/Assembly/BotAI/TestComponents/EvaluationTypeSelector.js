import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import scriptUpdater from '../scriptUpdater';
import styled from 'styled-components';
import StyledButton from '../../../StyledButton/StyledButton';

const EvaluationTypeSelector = ({ nodeInfo, activeNodeArray, setActiveNodeArray, botNumberSelected, aiAndScripts, optionsArray, customKeyToChange }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const dispatch = useDispatch();
	let keyToChange = 'evaluationType';
	if (customKeyToChange) {
		keyToChange = customKeyToChange;
	}

	function setEvaluationType(type) {
		let newActiveNodeArray = [...activeNodeArray];
		newActiveNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test[keyToChange] = type;
		setActiveNodeArray(newActiveNodeArray);
		scriptUpdater(botNumberSelected, aiAndScripts, newActiveNodeArray, dispatch, userInfo);
	}
	if (typeof (optionsArray) !== 'object' || optionsArray.length <1 ) {
		return  (
			<>
				MISSING OPTIONS ARRAY
			</>
		)
	}

	return (		
		<EvaluationTypeSelectorContainer
		heightMultiplier = {optionsArray.length}
		>
			<Request className = 'centeredFlex'>
				{customKeyToChange === 'thresholdEvaluationType' ? (
					'TESTS IF MULTIPLICITY IS'
				) : 
				(	customKeyToChange === 'targetEvaluationType' ? (
					'TEST IF RETURN DOES OR DOES NOT INCLUDE'
				) : (
					'TEST IF RETURN IS'
				))}
			</Request>
			<Options className = 'evenlyFlex'>
				{optionsArray.map((type)=>{
					return(
						<StyledButton
						key = {type}
						handleClick = {()=>{setEvaluationType(type)}}
						selected = {type === activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].condition.test[keyToChange]}
						fontSize = {type === '≠' ? '28' : '16'}
						maxHeight = {type === '≠' ? '40' : null}
						>
							{type}
					</StyledButton>
					)
				})}
			</Options>
		</EvaluationTypeSelectorContainer>
	)
}
// ≠
export default EvaluationTypeSelector;
const EvaluationTypeSelectorContainer = styled.div`
	width: 100%;
	height: ${props => props.heightMultiplier ? `${(props.heightMultiplier * 40) + ((props.heightMultiplier -1) * 5)}px` : `85px`};
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