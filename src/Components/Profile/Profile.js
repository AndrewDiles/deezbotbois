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
import SizeSlider from '../SizeSlider/SizeSlider';

const Profile = ({ time, disabled }) => {
	const dispatch = useDispatch();
	const settings = useSelector((state) => state.settings);
	let colors = useSelector(getThemeColors);
	if (settings.currentUrl === 'settings') colors = settings.colorsTesting;

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
			<StyledNavLink to="/assembly" tabIndex="-1">
        <StyledButton
					handleClick = {() => {dispatch(updateUrl('assembly'))}}
					selected = {settings.currentUrl === 'assembly'}
					disabled = {settings.currentUrl === 'assembly'}
      	  >
      	  BUILD-EM
        </StyledButton>
    	</StyledNavLink>
			<StyledNavLink to="/levels" tabIndex="-1">
        <StyledButton
					handleClick = {() => {dispatch(updateUrl('levels'))}}
					selected = {settings.currentUrl === 'levels'}
					disabled = {settings.currentUrl === 'levels'}
      	  >
      	  FIGHT-EM
        </StyledButton>
    	</StyledNavLink>
			{settings.currentUrl !== 'settings' &&
					<SizeSlider/>
			}
			<StyledNavLink to="/settings" tabIndex="-1">
        <StyledButton
					handleClick = {() => {dispatch(updateUrl('settings'))}}
					selected = {settings.currentUrl === 'settings'}
					disabled = {settings.currentUrl === 'settings'}
          >
          SETTINGS
        </StyledButton>
      </StyledNavLink>
			<StyledNavLink to="/account" tabIndex="-1">
        <StyledButton
					handleClick = {() => {dispatch(updateUrl('account'))}}
					selected = {settings.currentUrl === 'account'}
					disabled = {settings.currentUrl === 'account'}
          >
          ACCOUNT
        </StyledButton>
      </StyledNavLink>
			<StyledNavLink to={settings.currentUrl} tabIndex="-1">
			<StyledButton 
        handleClick = {() => {dispatch(deactivateProfileTab())}}
        >
        COLLAPSE
      </StyledButton>
			</StyledNavLink>
			<StyledNavLink to={settings.currentUrl} tabIndex="-1">
			<Logout/>
			</StyledNavLink>
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
	opacity: ${props => props.profileTab === 'hovering' && '0.5'};
	;
	box-shadow: ${props => props.profileTab === 'active' ? 
		props.navLocation === 'top' ? '0 2px 6px black, -2px 0px 6px black' : '0px 2px 6px black, 2px 0px 6px black' : 
		props.navLocation === 'top' ? '0 2px 6px silver, -2px 0px 6px silver' : '0px 2px 6px silver, 2px 0px 6px silver'
	};
	margin: ${props=>props.navLocation === 'top' ? '5px 0 0 0' : '0 0 0 5px'};
	flex-direction: column;
	z-index: 20;
`
const StyledNavLink = styled(NavLink)`
  width: 125px;
	height: 40px;
	margin: 5px;
	border-radius: 5px;
  border: 1px solid transparent;
	line-height: 10px;
`