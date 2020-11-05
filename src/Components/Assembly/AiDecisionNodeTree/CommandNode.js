import React from 'react';
import styled from 'styled-components';
import { commandInfo } from '../../../Constants/attributes';

const CommandNode = ({ index, command }) => {
  return (
		<CommandWrapper className = 'centeredFlex'>
			NODE # {index+1}
			<CommandBox className = 'centeredFlex'>
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
	font-size: 0.6em;
`

const CommandBox = styled.div`
	width: 125px;
	height: 50px;
	border: blue 3px solid;
	background-color: rgba(0,0,255,0.2);
	border-radius: 10px;
	font-size: 0.6em;
`