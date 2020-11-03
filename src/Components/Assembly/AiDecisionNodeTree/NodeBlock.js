import React from 'react';
import styled from 'styled-components';
import LimbStarter from './LimbStarter';
import { commandInfo } from '../../../Constants/attributes';

const NodeBlock = ({ block, type }) => {
	console.log('from inside NodeBlock:',{block})
  return (
		<MasterDepthContainer
		type = {type}
		>
			
		</MasterDepthContainer>
  )
}
export default NodeBlock;

const MasterDepthContainer = styled.div`
	height: 100%;
	width: 175px;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
	text-align: center;
	border: ${props => props.type ? (props.type === 'met' ? 'lime 1px dashed' : 'red 1px dashed' ) : ('purple 1px dashed')};
`