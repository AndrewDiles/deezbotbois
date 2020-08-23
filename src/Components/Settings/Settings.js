import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import styled from 'styled-components';

import {
	updateUrl,
	deactivateProfileTab,
} from '../../Redux/actions';

import StyledButton from '../StyledButton/StyledButton';
import SizeSlider from '../SizeSlider/SizeSlider';
import Logout from '../NavBar/Logout';

const Settings = ({ disabled }) => {
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	const settings = useSelector((state) => state.settings);

	if (userInfo.email === undefined || userInfo.email === null) {
    return (
      <Redirect to="/home" />
    )
	}

	// Allow modofication of cell size, url image, nav location, handle, color theme.... 
  return (
		<Wrapper>
    	<div>
				Settings
			</div>
			<SizeSlider/>
		</Wrapper>
  )
}
export default Settings;

const Wrapper = styled.div`
`