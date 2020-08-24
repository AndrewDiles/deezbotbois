import React from 'react';

import { useSelector } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';

import styled from 'styled-components';

const CompName = () => {
	const settings = useSelector((state) => state.settings);
	const colors = useSelector(getThemeColors);
	
  return (
    <Wrapper
		navLocation = {settings.navLocation}
		profileTab = {settings.profileTab}
		colors = {colors}
		>
      This is indeed a component
    </Wrapper>
  )
}
export default CompName;

const Wrapper = styled.div`
	margin: ${(props) =>
		props.navLocation === "top" ? 
			props.profileTab !== 'active' ? "50px 0 0 0" : "50px 135px 0 0"
			: props.profileTab !== 'active' ? "0 0 0 135px" : "0 0 0 270px"
			};
	color: ${props => props.colors.textColor};
	width: 100%;
	height: 100%;
	/* display : flex;
	flex-direction: row;
	justify-content: center;
	align-content: center;
	align-items: center; */
`