import React from 'react';
import styled from 'styled-components';
import CommandNode from './CommandNode';
import NodeHandler from './NodeHandler';

const LimbStarter = ({ index, nodeLimb, firstEntry }) => {
  return (
		<LimbRowWrapper
		firstEntry = {firstEntry}
		containsCommand = {nodeLimb.command && 1}
		>
			{nodeLimb.command ? (
				<CommandNode
				command = {nodeLimb.command}
				index = {index}
				/>
			):(
				<NodeHandler
				decisionObject = {nodeLimb}
				index = {index}
				/>
			)}
			
		</LimbRowWrapper>
  )
}
export default LimbStarter;

const LimbRowWrapper = styled.div`
	display: flex;
	flex-direction: row;
	/* justify-content: start; */
	align-items: center;
	text-align: center;
	margin-top: ${props => props.firstEntry && '-2px'};
	margin-left: ${props => props.firstEntry ? '-2px' : props.containsCommand ? '0px' : '200px'};
`