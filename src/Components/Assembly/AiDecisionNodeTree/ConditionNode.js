import React from 'react';
import styled from 'styled-components';
import { conditionsData } from '../../../Constants/conditions';
import testNextLocalAiAndScript from './testNextLocalAiAndScrip';

const ConditionNode = ({ index, condition, active, aiAndScripts, setAiAndScripts, localAiAndScript }) => {
	let metActive = testNextLocalAiAndScript(localAiAndScript,aiAndScripts, 'conditionTrue', active);
	let unMetActive = testNextLocalAiAndScript(localAiAndScript,aiAndScripts, 'conditionFalse', active);
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
				<MetBar active = {metActive}/>
				<UnMetBar active = {unMetActive}/>
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
	transition: font-size .5s;
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
	animation: ${props => props.active === 'active' && '1s linear infinite alternate glowConditionNodeBox'};
	opacity: ${props =>props.active && props.active === 'offPath' ? '0.5' : props.active === 'onPath' ? '0.75' : '1'};
	transition: opacity .5s, border-width .5s;
	:hover {
		cursor: pointer;
	}
`
const MetBar = styled.div`
	height: 5px;
	width: 25px;
	background-image: linear-gradient(to right, gold , lime);
	opacity: ${props => props.active && props.active === 'onPath' ? '1' : '0.3'};
	transition: opacity .5s;
`
const UnMetBar = styled.div`
	height: 5px;
	width: 25px;
	background-image: linear-gradient(to right, gold , red);
	opacity: ${props => props.active && props.active === 'onPath' ? '1' : '0.3'};
	transition: opacity .5s;
`