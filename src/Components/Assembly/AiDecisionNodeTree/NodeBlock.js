import React from 'react';
import styled from 'styled-components';
import EmptyNode from './EmptyNode';
import LimbStarter from './LimbStarter';

const NodeBlock = ({ block, type }) => {
	// console.log('from inside NodeBlock:',{block})
  return (
			<MasterDepthContainer
			type = {type}
			>
				{block.length === 0 ? (
					<EmptyNode/>
				):(
					block.map((decisionObject, index)=>{
						return (
							<LimbStarter
							key = {index}
							index = {index}
							nodeLimb = {decisionObject}
							/>
						)
					})
				)}

			</MasterDepthContainer>
  )
}
export default NodeBlock;

const MasterDepthContainer = styled.div`
	/* min-height: 100px; */
	height: 100%;
	width: 175px;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
	text-align: center;
	border: ${props => props.type ? (props.type === 'met' ? 'lime 2px dashed' : 'red 2px dashed' ) : ('purple 2px dashed')};
`