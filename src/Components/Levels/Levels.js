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

const Levels = ({ disabled }) => {
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	const settings = useSelector((state) => state.settings);

	if (userInfo.email === undefined || userInfo.email === null) {
    return (
      <Redirect to="/home" />
    )
	}

  return (
		<div>
    	Levels go here XD
		</div>
  )
}
export default Levels;