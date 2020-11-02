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
	width: 175px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	background-color: ${props => props.depthLevel < 27 ? `rgba(${200+2*props.depthLevel},${200+2*props.depthLevel},${200+2*props.depthLevel},0.2)` : 'rgba(255,255,255,0.2'};
`