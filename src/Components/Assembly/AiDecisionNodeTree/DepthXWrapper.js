import React from 'react';
import styled from 'styled-components';

const DepthXWrapper = ({ depthLevel, children }) => {
  return (
		<DepthXContainer 
		depthLevel = {depthLevel}
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
	width: 120px;
	height: 100%;
	padding: 10px;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
	text-align: center;
	background-color: ${props => props.depthLevel < 55 ? `rgba(${200+props.depthLevel},${200+props.depthLevel},${200+props.depthLevel},0.2)` : 'rgba(255,255,255,0.2'};
`