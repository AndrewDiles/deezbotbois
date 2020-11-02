import React from 'react';
import styled from 'styled-components';

const ModularDepthDisplay = ({ maxDepthReached }) => {
  return (
		<DepthDisplayWrapper>
			{maxDepthReached.map((depthLevel)=>{
				return (
					<DepthLabel
					depthLevel = {depthLevel}
					className = 'centeredFlex'
					>
						DEPTH LV {depthLevel}
					</DepthLabel>
				)
			})}
		</DepthDisplayWrapper>
  )
}
export default ModularDepthDisplay;

const DepthDisplayWrapper = styled.div`
	width: 100%;
	height: 40px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	text-align: center;
`
const DepthLabel = styled.div`
	padding: 5px;
	width: 120px;
	height: 100%;
	font-size: 0.5em;
	background-color: ${props => props.depthLevel < 27 ? `rgba(${200+2*props.depthLevel},${200+2*props.depthLevel},${200+2*props.depthLevel},0.2)` : 'rgba(255,255,255,0.2'};
`