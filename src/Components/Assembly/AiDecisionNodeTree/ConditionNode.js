import React from 'react';
import styled from 'styled-components';
import { conditionsData } from '../../../Constants/conditions';

const ConditionNode = ({ index, condition, active, setAiAndScripts, localAiAndScript }) => {
  return (
		<ConditionWraaper className = 'centeredFlex'>
			<Spacer/>
			<NodeDisplayWrapper
			className = 'centeredFlex'
			active = {active}
			>
				NODE # {index+1}
				<ConditionBox 
				className = 'centeredFlex decisionTreeBox'
				active = {active}
				onClick ={()=>{console.log(active, localAiAndScript); setAiAndScripts({insertion: false, viewing: localAiAndScript})}}
				>
					{condition ? `Condition: ${conditionsData[condition.name].name}` : 'EMPTY CONDITION'}
				</ConditionBox>
			</NodeDisplayWrapper>
			<BarContainer className = 'evenlyFlex'>
				<MetBar/>
				<UnMetBar/>
			</BarContainer>
		</ConditionWraaper>
  )
}
export default ConditionNode;
const NodeDisplayWrapper = styled.div`
	flex-direction: column;
	flex-wrap: nowrap;
	white-space: nowrap;
	font-size: ${props =>props.active && props.active === 'active' ? '0.8em' : '0.6em'};
`
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
	flex-wrap: wrap;
	white-space: normal;
	border: gold dotted;
	border-width: ${props =>props.active && props.active === 'offPath' ? '2px' : props.active === 'onPath' ? '4px' : '6px'};
	background-color: rgba(255,215,0, 0.2);
	opacity: ${props =>props.active && props.active === 'offPath' ? '0.5' : props.active === 'onPath' ? '0.75' : '1'};
	:hover {
		cursor: pointer;
	}
`
const MetBar = styled.div`
	height: 5px;
	width: 25px;
	background-image: linear-gradient(to right, gold , lime);
`
const UnMetBar = styled.div`
	height: 5px;
	width: 25px;
	background-image: linear-gradient(to right, gold , red);
`