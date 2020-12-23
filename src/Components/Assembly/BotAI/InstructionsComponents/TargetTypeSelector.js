import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import scriptUpdater from '../scriptUpdater';
import styled from 'styled-components';
import StyledButton from '../../../StyledButton/StyledButton';

const TargetTypeSelector = ({ activeNodeArray, setActiveNodeArray, aiAndScripts, botNumberSelected }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const dispatch = useDispatch();

	function setTargetType(input) {
		let newActiveNodeArray = [...activeNodeArray];
		newActiveNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.targetType = input;
		setActiveNodeArray(newActiveNodeArray);
		scriptUpdater(botNumberSelected, aiAndScripts, newActiveNodeArray, dispatch, userInfo);
	}
	const types = ['hostile', 'friend', 'wall', 'corner'];
	// TODO: have warning message if you are going to collide with wall or friend? 
	// {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.intent === 'collision'}

	return (		
		<AttackTypeSelectionContainer>
			<Request className = 'centeredFlex'>
				SELECT TARGET TYPE
			</Request>
			<Options className = 'evenlyFlex'>
				{types.map((type)=>{
					return (
						<StyledButton
						key = {type}
						handleClick = {()=>{setTargetType(type)}}
						selected = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.targetType === type}
						sfx = 'selected'
						// fontSize = {9}
						>
							{type.toUpperCase()}
						</StyledButton>
					)
				})}
			</Options>
		</AttackTypeSelectionContainer>
	)
}
export default TargetTypeSelector;
const AttackTypeSelectionContainer = styled.div`
	width: 100%;
	height: 175px;
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