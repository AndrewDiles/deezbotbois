import React from 'react';
import styled from 'styled-components';
import StyledButton from '../../../StyledButton/StyledButton';

const AttackTypeSetter = ({ activeNodeArray, setActiveNodeArray, aiAndScripts }) => {
	
	function setAttackType(input) {
		let newActiveNodeArray = [...activeNodeArray];
		newActiveNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.attackType = input;
		setActiveNodeArray(newActiveNodeArray)
	}

	return (		
		<AttackTypeSelectionContainer>
			<Request className = 'centeredFlex'>
				SELECT ATTACK TYPE
			</Request>
			<Options className = 'evenlyFlex'>
				<StyledButton
				handleClick = {()=>{setAttackType('melee')}}
				selected = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.attackType === 'melee'}
				// fontSize = {9}
				>
					MELEE
				</StyledButton>
				<StyledButton
				handleClick = {()=>{setAttackType('ranged')}}
				selected = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.attackType === 'ranged'}
				// fontSize = {9}
				>
					RANGED
				</StyledButton>
			</Options>
		</AttackTypeSelectionContainer>
	)
}
export default AttackTypeSetter;
const AttackTypeSelectionContainer = styled.div`
	width: 100%;
	height: 85px;
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