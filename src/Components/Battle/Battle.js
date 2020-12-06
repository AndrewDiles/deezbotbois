import React from 'react';
import { 
	useSelector, 
	// useDispatch 
} from "react-redux";
import { 
	// NavLink, 
	Redirect 
} from "react-router-dom";
import { getThemeColors } from '../../Redux/reducers/user-reducer';
import styled from 'styled-components';

// import {
// 	updateUrl,
// 	deactivateProfileTab,
// } from '../../Redux/actions';

// import StyledButton from '../StyledButton/StyledButton';

const Battle = ({ disabled }) => {
	// const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	const settings = useSelector((state) => state.settings);
	const colors = useSelector(getThemeColors);

	if (userInfo.email === undefined || userInfo.email === null) {
    return (
      <Redirect to="/home" />
    )
	}

  return (
    <>
			Battle Grid and Battle Options
		</>
  )
}

export default Battle;

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
	display : flex;
	flex-direction: row;
	justify-content: center;
	align-content: center;
	align-items: center;
`
