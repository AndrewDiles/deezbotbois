import React from 'react';
import styled from 'styled-components';
import { commandInfo } from '../../../Constants/attributes';

const CommandNode = ({ command }) => {
  return (
		<CommandWrapper className = 'centeredFlex'>
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
`

const CommandBox = styled.div`
	width: 125px;
	height: 50px;
	border: blue 2px solid;
	background-color: rgba(0,0,255,0.2);
	border-radius: 10px;
	font-size: 0.6em;
`