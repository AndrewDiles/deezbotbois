import React from 'react';
import styled from 'styled-components';

const ConditionNode = ({ condition }) => {
  return (
		<ConditionWraaper className = 'centeredFlex'>
			<Spacer/>
			<ConditionBox>
				{condition ? condition.name : 'EMPTY CONDITION'}
			</ConditionBox>
			<Spacer className = 'centeredFlex'>
				<MetBar/>
				<UnMetBar/>
			</Spacer>
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
const ConditionBox = styled.div`
	width: 125px;
	height: 50px;
	border: blue 1px solid;
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