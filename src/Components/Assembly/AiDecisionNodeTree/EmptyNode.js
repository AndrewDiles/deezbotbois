import React from 'react';
import styled from 'styled-components';

const EmptyNode = () => {
  return (
		<EmptyWrapper className = 'centeredFlex'>
			<EmptyBox className = 'centeredFlex'>
				EMPTY NODE
			</EmptyBox>
		</EmptyWrapper>
  )
}
export default EmptyNode;

const EmptyWrapper = styled.div`
	width: 175px;
	height: 100px;
`

const EmptyBox = styled.div`
	width: 125px;
	height: 50px;
	border: black 2px solid;
	background-color: rgba(0,0,0,0.2);
	font-size: 0.6em;
`