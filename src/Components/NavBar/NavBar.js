import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";

import styled from 'styled-components';
import {arrows_move_left} from 'react-icons-kit/linea/arrows_move_left';
import {arrows_move_top} from 'react-icons-kit/linea/arrows_move_top';

import {
  updateUrl,
	setNavLocation
} from '../../Redux/actions';

import StyledButton from '../StyledButton/StyledButton';
import StyledIcon from '../StyledIcon/StyledIcon';
import SizeSlider from '../SizeSlider/SizeSlider';
import Login from './Login';
import Logout from './Logout';

function NavBar() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const userInfo = useSelector((state) => state.userInfo);
		// dispatch(updateUrl(window.location.href));
		console.log('userInfo',userInfo)
	console.log('userInfo.imageUrl',userInfo.imageUrl)
  const toggleNavLocation = () => {
    if (settings.navLocation === 'top') {
      dispatch(setNavLocation('left'));
    }
    else {
      dispatch(setNavLocation('top'));
    }
  }

  return (
    <Wrapper
    navLocation = {settings.navLocation}
    >
      {/* <div> */}
        <StyledIcon
        handleClick = {toggleNavLocation}
        icon = {settings.navLocation === 'top' ? arrows_move_left : arrows_move_top}
        >
        </StyledIcon>
      {/* </div> */}

      <StyledNavLink to="/home">
        <StyledButton
          handleClick = {() => {dispatch(updateUrl('home'))}}
          >
          HOME
        </StyledButton>
      </StyledNavLink>
      <StyledNavLink to="/test">
        <StyledButton
          handleClick = {() => {dispatch(updateUrl('test'))}}
          >
          TEST
        </StyledButton>
      </StyledNavLink>

      <SizeSlider>
        
      </SizeSlider>

      <div>
        {
          userInfo.email === null ? (
            <Login/>
          ) : (
						<>
							{userInfo.imageUrl &&
								<UserImg
								src={userInfo.imageUrl}
								alt = "User's picture.  Likely of them, but perhaps not."
								/>
							}
            	<Logout/>
						</>
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
const StyledNavLink = styled(NavLink)`
  width: 100px;
`
const UserImg = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 50%;
`