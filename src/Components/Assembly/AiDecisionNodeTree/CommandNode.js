import React from 'react';
import styled from 'styled-components';
import { commandInfo } from '../../../Constants/attributes';

const CommandNode = ({ index, command, active, localAiAndScript, setAiAndScripts }) => {
	// console.log({active}, 'for:', command.name)
  return (
		<CommandWrapper 
		className = 'centeredFlex'
		active = {active}
		>
			NODE # {index+1}
			<CommandBox
			className = 'centeredFlex decisionTreeBox'
			active = {active}
			onClick ={()=>{console.log(active, localAiAndScript); setAiAndScripts({insertion: false, viewing: localAiAndScript})}}
			>
				{command ? `${commandInfo[command.name]}-COMMAND` : 'EMPTY COMMAND'}
			</CommandBox>
		</CommandWrapper>
  )
}
export default CommandNode;

const CommandWrapper = styled.div`
	width: 175px;
	height: 100px;
	flex-direction: column;
	flex-wrap: nowrap;
	white-space: nowrap;
	font-size: ${props =>props.active && props.active === 'active' ? '0.8em' : '0.6em'};
`

const CommandBox = styled.div`
	flex-wrap: wrap;
	white-space: normal;
	border: blue solid;
	border-width: ${props =>props.active && props.active === 'offPath' ? '2px' : props.active === 'onPath' ? '4px' : '6px'};
	background-color: rgba(0,0,255,0.2);
	border-radius: 10px;
	opacity: ${props =>props.active && props.active === 'offPath' ? '0.5' : props.active === 'onPath' ? '0.75' : '1'};
	:hover {
		cursor: pointer;
	}
`