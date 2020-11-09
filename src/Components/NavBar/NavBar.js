import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getThemeColors } from '../../Redux/reducers/user-reducer';
import {
	setNavLocation,
	activateProfileTab,
	deactivateProfileTab,
	hoverProfileTab
} from '../../Redux/actions';
import NavLinkButton from './NavLinkButton';
import NavLinkIcon from './NavLinkIcon';
import StyledIcon from '../StyledIcon/StyledIcon';
import {arrows_move_left} from 'react-icons-kit/linea/arrows_move_left';
import {arrows_move_top} from 'react-icons-kit/linea/arrows_move_top';
import LoginViaGoogle from './LoginViaGoogle';
import Profile from '../Profile/Profile';
import Bot from '../Bots/Bot';

function NavBar() {
	const [time, setTime] = React.useState(Date.now());
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
	const userInfo = useSelector((state) => state.userInfo);
	let colors = useSelector(getThemeColors);
	if (settings.currentUrl === 'settings') colors = settings.colorsTesting;

	React.useEffect(() => {
		const targets = document.getElementsByClassName('userImg');
		if (targets === null || targets.length === 0) return;
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
				dispatch(hoverProfileTab());
			}
			else {
				dispatch(activateProfileTab());
			}
		}
			targets[0].addEventListener('mouseenter',handleMouseOver);
			targets[0].addEventListener('mouseleave',handleMouseOff);
			targets[0].addEventListener('click',handleClick);
		
    return ()=>{
			if (targets === null || targets.length === 0) return;
			targets[0].removeEventListener('mouseenter',handleMouseOver);
			targets[0].removeEventListener('mouseleave',handleMouseOff);
			targets[0].removeEventListener('click',handleClick);
    }
	},[dispatch, settings.profileTab, settings.navLocation, userInfo.imageUrl]);

	// Notice: the timer causes the navBar to re-render every .5 seconds
	React.useEffect(() => {
		const timer = setInterval(() => {
			setTime(Date.now());
		}, 500);
		return () => clearInterval(timer);
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
		colors = {colors}
    >
			<RowDiv>
      	<StyledIcon
				handleClick = {toggleNavLocation}
				padding = {5}
				icon = {settings.navLocation === 'top' ? arrows_move_left : arrows_move_top}
      	/>
				{userInfo.imageUrl && settings.navLocation === 'left' &&
					<BorderDivForUserImg
					navLocation = {settings.navLocation}
					glow = {time - userInfo.lastLogInBitsReceived}
					>
						{userInfo.imageUrl[0] === 'h' ? (
							<UserImg
							className = 'userImg'
							src={userInfo.imageUrl}
							alt = "User's picture.  Likely of them, but perhaps not."
							/>
						) : (
							<BotWrapper
							className = 'userImg'
							>
								<Bot
								// className = 'userImg'
								alternativeBotSize = {40}
								model = {userInfo.imageUrl}
								arm1 = {'Gun1'}
								arm1Angle = {-45}
								botColors='default'
								/>
							</BotWrapper>
						)
						}
					</BorderDivForUserImg>
				}
			</RowDiv>

			{['home','rules','test','test2'].map((destination) =>{
				return (
					<div key = {destination}>
						<NavLinkButton destination = {destination}/>
						<NavLinkIcon destination = {destination}/>
					</div>
				)
			})}

      <UserDiv
			id = 'userDiv'
			>
        {userInfo.email === null ? (
					settings.navLocation === 'top' ? (
						<TopLogInWrapper>
							<NavLinkButton destination = {'altLogin'} innerText = 'ALT LOGIN'/>
							<NavLinkIcon destination = {'altLogin'}/>
							<LoginViaGoogle/>
						</TopLogInWrapper>
					) : (
						<ColDiv>
							<NavLinkButton destination = {'altLogin'} innerText = 'ALT LOGIN'/>
							<LoginViaGoogle/>
						</ColDiv>
					)
        ) : (
					<>
						{userInfo.imageUrl && settings.navLocation === 'top' &&
							<BorderDivForUserImg
							navLocation = {settings.navLocation}
							glow = {time - userInfo.lastLogInBitsReceived}
							>
								{userInfo.imageUrl[0] === 'h' ? (
									<UserImg
									className = 'userImg'
									src={userInfo.imageUrl}
									alt = "User's picture.  Likely of them, but perhaps not."
									/>
								) : (
									<BotWrapper
									className = 'userImg'
									>
										<Bot
										alternativeBotSize = {40}
										model = {userInfo.imageUrl}
										arm1 = {'Gun1'}
										arm1Angle = {-45}
										botColors='default'
										/>
									</BotWrapper>
								)}
							</BorderDivForUserImg>
						}
					</>
        )}
      </UserDiv>
			{settings.profileTab === 'inactive' &&
				<Profile time = {time}/>
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
  width: ${props => props.navLocation === 'top' ? '100%' : '135px'};
  height: ${props => props.navLocation === 'top' ? '50px' : '100%'};
  position: fixed;
  display: flex;
  flex-direction: ${props => props.navLocation === 'top' ? 'row' : 'column'};
  justify-content: space-between;
  align-items: ${props => props.navLocation === 'top' ? 'center' : 'left'};
  align-content: ${props => props.navLocation === 'top' ? 'center' : 'left'};
  box-shadow: ${props => props.navLocation === 'top' ? '0 8px 6px -6px black' : '8px 0 6px -6px black'};
  z-index: 10;
	background-color: ${props => props.colors.primary};
	color: ${props => props.colors.textColor};
`
const UserImg = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	z-index: 21;
`
const UserDiv = styled.div`
`
const RowDiv = styled.div`
	display: flex;
	align-content: center;
	text-align: center;
	flex-direction: row;
	justify-content: space-between;
`
const TopLogInWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-content: right;
	justify-content: space-between;
	width: 260px;
	@media (max-width: 900px) {
		width: 90px;
	}
`
const ColDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-content: left;
`

const BotWrapper = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	z-index: 21;
`