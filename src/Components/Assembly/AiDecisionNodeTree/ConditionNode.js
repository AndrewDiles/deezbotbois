import React from 'react';
import styled from 'styled-components';
import { conditionsData } from '../../../Constants/conditions';

const ConditionNode = ({ condition }) => {
  return (
		<ConditionWraaper className = 'centeredFlex'>
			<Spacer/>
			<ConditionBox className = 'centeredFlex'>
				{condition ? `Condition: ${conditionsData[condition.name].name}` : 'EMPTY CONDITION'}
			</ConditionBox>
			<BarContainer className = 'evenlyFlex'>
				<MetBar/>
				<UnMetBar/>
			</BarContainer>
		</ConditionWraaper>
  )
}
export default ConditionNode;

const ConditionWraaper = styled.div`
	width: 175px;
	height: 100px;
`
const Spacer = styled.div`
	width: 25px;
	height: 25px;
`
const BarContainer = styled.div`
	width: 25px;
	height: 75px;
	flex-direction: column;
`
const ConditionBox = styled.div`
	width: 125px;
	height: 50px;
	border: gold 2px solid;
	background-color: rgba(255,215,0, 0.2);
	font-size: 0.6em;
`
const MetBar = styled.div`
	height: 5px;
	width: 25px;
	background-color: lime;
`
const UnMetBar = styled.div`
	height: 5px;
	width: 25px;
	background-color: red;
`