import React from 'react';
import styled from 'styled-components';
import CommandNode from './CommandNode';
import NodeHandler from './NodeHandler';

const LimbStarter = ({ nodeLimb }) => {
  return (
		<LimbRowWrapper>
			{nodeLimb.command ? (
				<CommandNode
				command = {nodeLimb.command}
				/>
			):(
				<NodeHandler
				decisionObject = {nodeLimb}
				/>
			)}
			
		</LimbRowWrapper>
  )
}
export default LimbStarter;

const LimbRowWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: start;
	align-items: center;
	text-align: center;
`