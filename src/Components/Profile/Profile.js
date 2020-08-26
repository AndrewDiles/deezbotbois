import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from 'styled-components';
import { getThemeColors } from '../../Redux/reducers/user-reducer';

import {
	updateUrl,
	deactivateProfileTab,
} from '../../Redux/actions';

import StyledButton from '../StyledButton/StyledButton';
import Logout from '../NavBar/Logout';
import Gift from './Gift';

const Profile = ({ time, disabled }) => {
	const dispatch = useDispatch();
	const settings = useSelector((state) => state.settings);
	const colors = useSelector(getThemeColors);

	if (settings.profileTab === 'inactive') {
		return (<></>)
	}

  return (
    <ProfileWrapper
		navLocation = {settings.navLocation}
		profileTab = {settings.profileTab}
		notSelected = {colors.notSelected}
		className = {'centeredFlex'}
		>
			<Gift
			time = {time}
			>
			</Gift>
			<StyledNavLink to="/settings">
        <StyledButton
          handleClick = {() => {dispatch(updateUrl('settings'))}}
          >
          SETTINGS
        </StyledButton>
      </StyledNavLink>

			<StyledButton
        handleClick = {() => {dispatch(deactivateProfileTab())}}
        >
        CLOSE USER BAR
      </StyledButton>
			<Logout/>
		</ProfileWrapper>
  )
}
export default Profile;

const ProfileWrapper = styled.div`
	position: absolute;
	width: 135px;
	right: ${props=>props.navLocation === 'top' ? '0' : ''};
	top: ${props=>props.navLocation === 'top' ? '50px' : '0'};
	left: ${props=>props.navLocation === 'top' ? '' : '135px'};
	background-color: ${
		props=>props.profileTab !== 'inactive' &&
		props.profileTab === 'active' ? '' : `${props.notSelected}`
	};
	box-shadow: ${props => props.profileTab === 'active' ? 
		props.navLocation === 'top' ? '0 2px 6px black, -2px 0px 6px black' : '0px 2px 6px black, 2px 0px 6px black' : 
		props.navLocation === 'top' ? '0 2px 6px silver, -2px 0px 6px silver' : '0px 2px 6px silver, 2px 0px 6px silver'
	};
	margin: ${props=>props.navLocation === 'top' ? '5px 0 0 0' : '0 0 0 5px'};
	flex-direction: column;
	z-index: 20;
`
const StyledNavLink = styled(NavLink)`
  width: 100%;
`