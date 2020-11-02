import React from 'react';
import styled from 'styled-components';

const CommandNode = ({ command }) => {
  return (
		<CommandWraaper>
			{command.name}
		</CommandWraaper>
  )
}
export default CommandNode;

const CommandWraaper = styled.div`
	width: 125px;
	border: blue 1px solid;
	`