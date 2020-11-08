import React from 'react';
import styled from 'styled-components';

const EmptyNode = ({ active, localAiAndScript, setAiAndScripts }) => {
  return (
		<EmptyWrapper
		className = 'centeredFlex'
		active = {active}
		>
			NODE # 1
			<EmptyBox
			className = 'centeredFlex decisionTreeBox'
			active = {active}
			onClick ={()=>{console.log(active, localAiAndScript); setAiAndScripts({insertion: false, viewing: localAiAndScript})}}
			>
				EMPTY NODE
			</EmptyBox>
		</EmptyWrapper>
  )
}
export default EmptyNode;

const EmptyWrapper = styled.div`
	width: 175px;
	height: 100px;
	flex-direction: column;
	flex-wrap: nowrap;
	white-space: nowrap;
	font-size: ${props =>props.active && props.active === 'active' ? '0.8em' : '0.6em'};
	transition: font-size .5s;
`

const EmptyBox = styled.div`
	flex-wrap: wrap;
	white-space: normal;
	border: black double;
	border-width: ${props =>props.active && props.active === 'offPath' ? '2px' : props.active === 'onPath' ? '4px' : '6px'};
	background-color: rgba(0,0,0,0.2);
	animation: ${props => props.active === 'active' && '1s linear infinite alternate glowEmptyNodeBox'};
	opacity: ${props =>props.active && props.active === 'offPath' ? '0.5' : props.active === 'onPath' ? '0.75' : '1'};
	transition: opacity .5s, border-width .5s;
	:hover {
		cursor: pointer;
	}
`