import React from 'react';
import styled from 'styled-components';
import CommandNode from './CommandNode';
import NodeHandler from './NodeHandler';
import testLocalAiAndScript from './testLocalAiAndScript';

const LimbStarter = ({ index, nodeLimb, firstEntry, aiAndScripts, setAiAndScripts, depthLevel, localAiAndScript }) => {
  return (
		<LimbRowWrapper
		firstEntry = {firstEntry}
		containsCommand = {nodeLimb.command && 1}
		>
			{nodeLimb.command ? (
				<CommandNode
				setAiAndScripts = {setAiAndScripts}
				command = {nodeLimb.command}
				index = {index}
				active = {testLocalAiAndScript(localAiAndScript,aiAndScripts)}
				localAiAndScript = {localAiAndScript}
				/>
			):(
				<NodeHandler
				setAiAndScripts = {setAiAndScripts}
				decisionObject = {nodeLimb}
				aiAndScripts = {aiAndScripts}
				localAiAndScript = {localAiAndScript}
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