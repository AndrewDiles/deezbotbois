import React from 'react';

import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';
import { useSelector } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';

import styled from 'styled-components';

const NotTheBots = () => {
	const settings = useSelector((state) => state.settings);
	const colors = useSelector(getThemeColors);
	
  return (
    <Wrapper
		navLocation = {settings.navLocation}
		profileTab = {settings.profileTab}
		colors = {colors}
		className = 'centeredFlex col'
		>
			<LoadingAnimation size = '100'/>
      <h1>
				THESE AREN'T THE BOTS YOU'RE LOOKING FOR
			</h1>
			<LoadingAnimation size = '100'/>
    </Wrapper>
  )
}
export default NotTheBots;

const Wrapper = styled.div`
	padding: ${(props) =>
		props.navLocation === "top" ? 
			props.profileTab === 'active' && "0 140px 0 0"
			: props.profileTab === 'active' ? "0 140px 0 140px" : "0 140px 0 0"
			};
	transition: padding 0.5s ease-in-out;
	color: ${props => props.colors.textColor};
	width: 100%;
	height: 100%;
	overflow: auto;
	/* display : flex;
	flex-direction: row;
	justify-content: center;
	align-content: center;
	align-items: center; */
`