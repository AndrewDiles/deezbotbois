import React from 'react';
import styled from 'styled-components';

const EmptyNode = () => {
  return (
		<EmptyWrapper className = 'centeredFlex'>
			NODE # 1
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
	flex-direction: column;
	font-size: 0.6em;
`

const EmptyBox = styled.div`
	width: 125px;
	height: 50px;
	border: black 3px double;
	background-color: rgba(0,0,0,0.2);
	font-size: 0.6em;
`