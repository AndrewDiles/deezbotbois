import React from 'react';
import styled from 'styled-components';

const ModularDepthDisplay = ({ maxDepthReached }) => {
  return (
		<DepthDisplayWrapper
		>
			{maxDepthReached.map((depthLevel)=>{
				return (
					<DepthLabel
					key = {depthLevel}
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
	justify-content: flex-start;
	align-items: center;
	text-align: center;
`
const DepthLabel = styled.div`
	text-indent: -25px;
	padding: 5px 10px;
	width: 200px;
	height: 100%;
	font-size: 0.7em;
	background-color: ${props => props.depthLevel < 20 ? `rgba(${100-5*props.depthLevel},${100-5*props.depthLevel},${100-5*props.depthLevel},0.1)` : 'rgba(0,0,0,0.2'};
`