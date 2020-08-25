import React from 'react';

import { useSelector } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';

import styled from 'styled-components';

const Rules = () => {
	const settings = useSelector((state) => state.settings);
	const colors = useSelector(getThemeColors);
	
  return (
    <Wrapper
		navLocation = {settings.navLocation}
		profileTab = {settings.profileTab}
		colors = {colors}
		>
      A lot of rules will go here.
			<br/>
			Ranging from:
			<br/>
			- The nature of the game
			<br/>
			- The order of resolution of action types / bot priority cycling
			<br/>
			- Equipment, accessories, skill tree planning
			<br/>
			- The script based protocols
			<br/>
			- Attributes of bots
			<br/>
			- Damage formulas

    </Wrapper>
  )
}
export default Rules;

const Wrapper = styled.div`
	padding: ${(props) =>
		props.navLocation === "top" ? 
			props.profileTab !== 'active' ? "50px 0 0 0" : "50px 135px 0 0"
			: props.profileTab !== 'active' ? "0 135px 0 0" : "0 135px 0 135px"
			};
	color: ${props => props.colors.textColor};
	width: 100%;
	height: 100%;
	display : flex;
	flex-direction: row;
	justify-content: center;
	align-content: center;
	align-items: center;
	color: ${props => props.colors.textColor};
	width: 100%;
	height: 100%;
	/* display : flex;
	flex-direction: row;
	justify-content: center;
	align-content: center;
	align-items: center; */
`