import React from 'react';
import styled from 'styled-components';
const TechDisplay = ({children}) => {
  return (
		<Wrapper>
			<ExpandingDisplay>
				{children}
			</ExpandingDisplay>
		</Wrapper>
  )
}
export default TechDisplay;
const Wrapper = styled.div`
	height: 60px;
	width: 100%;
`
const ExpandingDisplay = styled.div`
	/* transition: animation .75s;
	animation: '.75s ease-out 1 expandTechdisplay'; */
	font-size: 0.8em;
`