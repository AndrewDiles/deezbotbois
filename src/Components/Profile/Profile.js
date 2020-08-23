import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from 'styled-components';

import {
	updateUrl,
	deactivateProfileTab,
} from '../../Redux/actions';

import StyledButton from '../StyledButton/StyledButton';
import Logout from '../NavBar/Logout';

const Profile = ({ disabled }) => {
	const dispatch = useDispatch();
	const settings = useSelector((state) => state.settings);

	if (settings.profileTab === 'inactive') {
		return (<></>)
	}

  return (
    <ProfileWrapper
		navLocation = {settings.navLocation}
		profileTab = {settings.profileTab}
		>
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
	right: ${props=>props.navLocation === 'top' ? '0' : ''};
	top: ${props=>props.navLocation === 'top' ? '50px' : ''};
	left: ${props=>props.navLocation === 'top' ? '' : '125px'};
	bottom: ${props=>props.navLocation === 'top' ? '' : '0'};
	background-color: ${
		props=>props.profileTab !== 'inactive' &&
		props.profileTab === 'active' ? 'blue' : 'purple'
	};
	display : flex;
	flex-direction: column;
	justify-content: right;
	z-index: 20;
`
const StyledNavLink = styled(NavLink)`
  width: 100px;
`