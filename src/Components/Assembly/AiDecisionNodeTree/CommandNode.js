import React from 'react';
import styled from 'styled-components';
import { commandInfo } from '../../../Constants/attributes';

const CommandNode = ({ command }) => {
  return (
		<CommandWrapper className = 'centeredFlex'>
			<CommandBox className = 'centeredFlex'>
				{command ? commandInfo[command.name] : 'EMPTY COMMAND'}
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
	border: blue 1px solid;
	font-size: 0.7em;
`