import React from 'react';
import styled from 'styled-components';

const ModularDepthDisplay = ({ maxDepthReached }) => {
  return (
		<DepthDisplayWrapper>
			{maxDepthReached.map((depthLevel)=>{
				return (
					<DepthLabel
					depthLevel = {depthLevel
					}>
						DEPTH LV {depthLevel}
					</DepthLabel>
				)
			})}
		</DepthDisplayWrapper>
  )
}
export default ModularDepthDisplay;

const DepthDisplayWrapper = styled.div`
	/* width: 120px; */
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	text-align: center;
`
const DepthLabel = styled.h5`
	width: 120px;
	height: 100%;
	margin: 0;
	padding: 10px;
	background-color: ${props => props.depthLevel < 55 ? `rgba(${200+props.depthLevel},${200+props.depthLevel},${200+props.depthLevel},0.2)` : 'rgba(255,255,255,0.2'};
`