import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';

const ScrollingSpacer = () => {
	const settings = useSelector((state) => state.settings);
  return (
		<SpacerWrapper
		navLocation = {settings.navLocation}
		>
			<Spacer/>
		</SpacerWrapper>
  )
}

export default ScrollingSpacer;
const SpacerWrapper = styled.div`
	width: 0;
	height: 0;
	transform: translate(-150px, 1350px);
	@media screen and (min-width: ${props => props.navLocation === 'top' ? 
		'650px': '785px'}
	) {
		transform: translate(-150px, 650px);
  }
	@media screen and (min-width: ${props => props.navLocation === 'top' ? 
		'1000px': '1135px'}
	) {
		transform: translate(-150px, 850px);
  }
`
const Spacer = styled.div`
	height: 50px;
	width: 300px;
`