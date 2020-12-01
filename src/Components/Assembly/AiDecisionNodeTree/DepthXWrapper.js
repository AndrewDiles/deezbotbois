import React from 'react';
import styled from 'styled-components';

const DepthXWrapper = ({ depthLevel, width, colored, children }) => {
	// console.log({colored})
  return (
		<DepthXContainer
		// className = 'centeredFlex'
		depthLevel = {depthLevel}
		width = {width}
		colored = {colored}
		>
			{children}
		</DepthXContainer>
  )
}
export default DepthXWrapper;

const DepthXContainer = styled.div`
	width: ${props => props.width ? `${props.width}px`: '175px'};
	/* mix-blend-mode: saturation; */
	background-color: ${props => props.colored ? props.depthLevel < 10 ? `rgba(${128-12*props.depthLevel},35,${255-24*props.depthLevel},0.2)` : 'rgba(8,35,15,0.2)' : ''};
	/* background-color: ${props => props.depthLevel < 20 ? `rgba(${128-3*props.depthLevel},35,${255-6*props.depthLevel},0.25)` : 'rgba(60,35,120,.25'}; */
	/* background-color: ${props => props.depthLevel < 12 ? `rgba(${20*props.depthLevel},0,0,0.35)` : 'rgba(240,0,0,0.35'}; */
	/* background-color: ${props => props.depthLevel < 20 ? `rgba(${100-5*props.depthLevel},${100-5*props.depthLevel},${100-5*props.depthLevel},0.2)` : 'rgba(0,0,0,0.2'}; */
`