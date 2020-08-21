import React from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from 'styled-components';
import {arrows_move_left} from 'react-icons-kit/linea/arrows_move_left';
import {arrows_move_top} from 'react-icons-kit/linea/arrows_move_top';

import {
  updateUrl,
  setNavLocation
} from '../../Redux/actions';

import StyledButton from '../StyledButton/StyledButton';
import StyledIcon from '../StyledIcon/StyledIcon';
import SizeSlider from '../SizeSlider/SizeSlider'

function NavBar() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const userInfo = useSelector((state) => state.userInfo);
    // dispatch(updateUrl(window.location.href));

  const toggleNavLocation = () => {
    console.log('clicked the toggle button');
    if (settings.navLocation === 'top') {
      dispatch(setNavLocation('left'));
    }
    else {
      dispatch(setNavLocation('top'));
    }
  }
  const login = () => {
    console.log('gapi',window.gapi.auth2);
      // var auth2 = window.gapi.auth2.getAuthInstance();
      // auth2.signIn().then(function () {
      //   console.log('User signed in.');
      // });
  }
  const logout = () => {
      var auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
  }

  return (
    <Wrapper
    navLocation = {settings.navLocation}
    >
      <div>
        <StyledIcon
        handleClick = {toggleNavLocation}
        icon = {settings.navLocation === 'top' ? arrows_move_left : arrows_move_top}
        >
        </StyledIcon>
      </div>
      <SizeSlider>
        
      </SizeSlider>
      <div>
        {
          userInfo.email === null ? (
            <StyledButton
            handleClick = {login}
            >
              LOG IN
            </StyledButton>
            // <div class="g-signin2" data-onsuccess="onSignIn"></div>
          ) : (
            <StyledButton
            handleClick = {logout}
            >
              LOG OUT
            </StyledButton>
          )
        }
      </div>
    </Wrapper>
  );
}

export default NavBar;

const Wrapper = styled.nav`
  width: ${props => props.navLocation === 'top' ? '100%' : '125px'};
  height: ${props => props.navLocation === 'top' ? '50px' : '100%'};
  position: fixed;
  display: flex;
  flex-direction: ${props => props.navLocation === 'top' ? 'row' : 'column'};
  justify-content: space-between;
  align-items: center;
  align-content: center;
  box-shadow: ${props => props.navLocation === 'top' ? '0 8px 6px -6px black' : '8px 0 6px -6px black'};
  z-index: 10;
`