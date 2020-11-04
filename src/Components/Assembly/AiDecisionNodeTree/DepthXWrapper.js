import React from 'react';
import styled from 'styled-components';

const DepthXWrapper = ({ depthLevel, width, children }) => {
  return (
		<DepthXContainer 
		depthLevel = {depthLevel}
		width = {width}
		>
			{/* <h5>
				DEPTH LV {depthLevel}
			</h5> */}
			{children}
		</DepthXContainer>
  )
}
export default DepthXWrapper;

const DepthXContainer = styled.div`
	width: 175px;
	width: ${props => props.width ? `${props.width}px`: '175px'};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	background-color: ${props => props.depthLevel < 20 ? `rgba(${100-5*props.depthLevel},${100-5*props.depthLevel},${100-5*props.depthLevel},0.1)` : 'rgba(0,0,0,0.2'};
`