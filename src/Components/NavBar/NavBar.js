import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";

import styled from 'styled-components';
import {arrows_move_left} from 'react-icons-kit/linea/arrows_move_left';
import {arrows_move_top} from 'react-icons-kit/linea/arrows_move_top';

import {
  updateUrl,
	setNavLocation,
	activateProfileTab,
	deactivateProfileTab,
	hoverProfileTab
} from '../../Redux/actions';

import StyledButton from '../StyledButton/StyledButton';
import StyledIcon from '../StyledIcon/StyledIcon';
import Login from './Login';
import Profile from '../Profile/Profile';
import Bot from '../Bots/Bot';

function NavBar() {
	const [time, setTime] = React.useState(Date.now());
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const userInfo = useSelector((state) => state.userInfo);
		// dispatch(updateUrl(window.location.href));

	React.useEffect((event) => {
		const target = document.getElementById('userImg');
		if (target === null) return;
		const handleMouseOver = () => {
			if (!userInfo.imageUrl) return;
			if (settings.profileTab === 'inactive') {
				dispatch(hoverProfileTab());
			}
		}
		const handleMouseOff = () => {
			if (!userInfo.imageUrl || settings.profileTab === 'active' || settings.profileTab === 'inactive') return;
				dispatch(deactivateProfileTab());
		}
		const handleClick = () => {
			if (!userInfo.imageUrl) return;
			if (settings.profileTab === 'hovering') {
				dispatch(activateProfileTab());
			}
			else if (settings.profileTab === 'active') {
				dispatch(deactivateProfileTab());
			}
			else {
				dispatch(activateProfileTab());
			}
		}
		target.addEventListener('mouseenter',handleMouseOver);
		target.addEventListener('mouseout',handleMouseOff);
		target.addEventListener('click',handleClick);
    return ()=>{
			if (target === null) return;
      target.removeEventListener('mouseenter',handleMouseOver);
			target.removeEventListener('mouseout',handleMouseOff);
			target.removeEventListener('click',handleClick);
    }
	},[dispatch, settings.profileTab, userInfo.imageUrl]);

	React.useEffect(() => {
		const timer = setTimeout(() => {
			setTime(Date.now());
		}, 100);
		return () => clearTimeout(timer);
	});

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
      <StyledIcon
      handleClick = {toggleNavLocation}
      icon = {settings.navLocation === 'top' ? arrows_move_left : arrows_move_top}
      />
      <StyledNavLink to="/home">
        <StyledButton
          handleClick = {() => {dispatch(updateUrl('home'))}}
          >
          HOME
        </StyledButton>
      </StyledNavLink>
			{ userInfo.email !== null &&
				<StyledNavLink to="/levels">
      	  <StyledButton
      	    handleClick = {() => {dispatch(updateUrl('levels'))}}
      	    >
      	    FIGHT-EM
      	  </StyledButton>
      	</StyledNavLink>
			}
      <StyledNavLink to="/test">
        <StyledButton
          handleClick = {() => {dispatch(updateUrl('test'))}}
          >
          TEST
        </StyledButton>
      </StyledNavLink>

      <UserDiv
			id = 'userDiv'
			>
        {
          userInfo.email === null ? (
            <Login/>
          ) : (
						<>
							{userInfo.imageUrl &&
								<BorderDivForUserImg
								glow = {time - userInfo.lastLogInBitsReceived}
								>
									{userInfo.imageUrl[0] === 'h' ? (
										<UserImg
										id = 'userImg'
										src={userInfo.imageUrl}
										alt = "User's picture.  Likely of them, but perhaps not."
										/>
									) : (
										<Bot
										id = 'userImg'
										alternativeBotSize = {40}
										model = {userInfo.imageUrl}
										arm1 = {'Pewpew'}
										arm1Angle = {-45}
										/>
										)
									}
								</BorderDivForUserImg>
							}
						</>
          )
        }
      </UserDiv>
			{
				settings.profileTab === 'inactive' ? <></> : <Profile/>
			}
    </Wrapper>
  );
}

export default NavBar;
const BorderDivForUserImg = styled.div`
	display: flex;
	justify-content: center;
  align-items: center;
  align-content: center;
	width: 52px;
	height: 52px;
	border-radius: 50%;
	transition: transform .75s;
	animation: ${props => props.glow > 79200000 ? '1s linear infinite alternate glowUserImg':''};
	:hover {
		transform: scale(1.2);
		cursor: pointer;
	}
`
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
	z-index: 21;
`
const UserDiv = styled.div`
`