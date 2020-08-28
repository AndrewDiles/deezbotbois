import React from 'react';

import { useSelector } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';

import styled from 'styled-components';

const Assemble = () => {
	const settings = useSelector((state) => state.settings);
	const colors = useSelector(getThemeColors);
	
  return (
    <Wrapper
		navLocation = {settings.navLocation}
		profileTab = {settings.profileTab}
		colors = {colors}
		>
      Assemble bots here
    </Wrapper>
  )
}
export default Assemble;

// pre - overflow: auto
// padding: ${(props) =>
// 	props.navLocation === "top" ? 
// 		props.profileTab !== 'active' ? "50px 0 0 0" : "50px 135px 0 0"
// 		: props.profileTab !== 'active' ? "0 135px 0 0" : "0 135px 0 135px"
// 		};
// post -overflor-y: auto
// padding: ${(props) =>
// 		props.navLocation === "top" ? 
// 			props.profileTab !== 'active' ? "50px 0 0 0" : "50px 135px 0 0"
// 			: props.profileTab !== 'active' ? "0 0 0 135px" : "0 0 0 270px"
// 			};
const Wrapper = styled.div`
	padding: ${(props) =>
		props.navLocation === "top" ? 
			props.profileTab === 'active' && "0 140px 0 0"
			: props.profileTab === 'active' ? "0 140px 0 140px" : "0 140px 0 0"
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
	overflow: auto;
	/* display : flex;
	flex-direction: row;
	justify-content: center;
	align-content: center;
	align-items: center; */
`