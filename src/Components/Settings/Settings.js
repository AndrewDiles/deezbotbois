import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import styled from 'styled-components';
import { getThemeColors } from '../../Redux/reducers/user-reducer';

import {
	setNavLocation,
	communicating,
	communicationsSuccessful,
	communicationsFailed,
	replaceUserInfo

} from '../../Redux/actions';

import StyledButton from '../StyledButton/StyledButton';
import StyledIcon from '../StyledIcon/StyledIcon';
import {floppyDisk} from 'react-icons-kit/icomoon/floppyDisk'
import SizeSlider from '../SizeSlider/SizeSlider';
import Bot from '../Bots/Bot';

const Settings = ({ disabled }) => {
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	const settings = useSelector((state) => state.settings);
	const [newHandle, setNewHandle] = useState(userInfo.handle);
	const [newAvImg, setNewAvImg] = useState(userInfo.imageUrl);
	const [lastTimeCellSizeWasChanged, setLastTimeCellSizeWasChanged] = useState(Date.now());
	const [botShowing, setBotShowing] = useState(false);
	const [changeMade, setChangeMade] = useState(false);
	const [serverErrorMsg, setServerErrorMsg] = useState(null);
	const colors = useSelector(getThemeColors);

	React.useEffect(() => {
		let eraseServerErrorMsg;
		if (serverErrorMsg) {
			eraseServerErrorMsg = setTimeout(()=>{
				setServerErrorMsg(null)
			},2000)
		}
		return () => clearTimeout(eraseServerErrorMsg)
	},[serverErrorMsg])

	React.useEffect(() => {
		let eraseBotFromDom;
		if (settings.cellSize !== userInfo.cellSizePreference) {
			setChangeMade(true);
			setBotShowing(true);
			setLastTimeCellSizeWasChanged(Date.now())
			eraseBotFromDom = setTimeout(()=>{
				if (Date.now() > (lastTimeCellSizeWasChanged + 2500)) {
					setBotShowing(false);
				}
			},3000)
		}
		return () => clearTimeout(eraseBotFromDom)
	},[settings.cellSize])


	if (userInfo.email === undefined || userInfo.email === null) {
    return (
      <Redirect to="/home" />
    )
	}
	const updateChangeMade = () => {
		if (changeMade) return;
		setChangeMade(true);
	}
	const changeNavLocation = (ev) => {
		if (ev.target === undefined) return;
		console.log('ev.target',ev.target)
		console.log('ev.target.value',ev.target.innerText)
		updateChangeMade();
    if (ev.target.innerText === 'TOP') {
      dispatch(setNavLocation('top'));
    }
    else {
      dispatch(setNavLocation('left'));
    }
	}
	const handleClickAvatarImgOption = (incomingAvatarImage) => {
		if (incomingAvatarImage === userInfo.imageUrl) return;
		setNewAvImg(incomingAvatarImage);
	}
	const saveSettings = () => {
		if (!changeMade) return;
		let newUserInfo = {...userInfo};
		newUserInfo.handle = newHandle;
		newUserInfo.navLocationPreference = settings.navLocation;
		newUserInfo.cellSizePreference = settings.cellSize;
		newUserInfo.imageUrl = newAvImg;
		// newUserInfo.imageUrl =
		// newUserInfo.colorTheme = 
		dispatch(communicating());
		fetch('server/replaceUserInfo', {
			method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        email: newUserInfo.email,
				userInfo: newUserInfo
      }),
		}).then((res)=>{
			if (res.status === 200) {
				res.json().then((data)=>{
					setChangeMade(false);
					dispatch(replaceUserInfo(data.userInfo));
					dispatch(communicationsSuccessful());
					// dispatch(setNavLocation(data.userInfo.navLocationPreference));  update new URL
				})
			}
			else if (res.status === 400) {
				dispatch(communicationsFailed());
				console.log('Missing data')
			}
			else if (res.status === 404) {
				dispatch(communicationsFailed());
				console.log('Could not find account')
			}
			else if (res.status === 500) {
				dispatch(communicationsFailed());
				console.log('Server error')
			}
		})
	}
	
	// TBD: Modofication of: url image, nav location, handle, color theme.... 
  return (
		<Wrapper
		navLocation = {settings.navLocation}
		profileTab = {settings.profileTab}
		colors = {colors}
		>
			<h1>
				Hello {userInfo.handle}!
			</h1>

			<Styledh5>
				Change your handle:
				<br/>
				<br/>
				<StyledInput
				color = {colors}
				hovered = {colors.hovered}
				className = "centeredInput" 
				defaultValue = {newHandle} 
				input="text" maxLength = "24" 
				onChange = {(ev)=>{updateChangeMade();setNewHandle(ev.target.value)}}
				>
				</StyledInput>
				{newHandle.length === 0 &&
					<ErrorP>
						Handle must not be empty
					</ErrorP>
				}
			</Styledh5>

			<Styledh5>
				Change the location of your navigation menu:
				<br/>
				<br/>
				<StyledButton
				selected = {settings.navLocation === 'top'}
				value = "top"
				handleClick = {(ev)=>{changeNavLocation(ev)}}
				disabled = {settings.navLocation === 'top'}

				>
					TOP
				</StyledButton>
				<StyledButton
				selected = {settings.navLocation === 'left'}
				value = "left"
				handleClick = {(ev)=>{changeNavLocation(ev)}}
				disabled = {settings.navLocation === 'left'}
				>
					LEFT
				</StyledButton>
			</Styledh5>
			
			<Styledh5>
				Change the size of your bots / battlegrid:
			</Styledh5>
			<RowDiv>
				<SizeSlider/>
				<BotDiv
				botShowing = {botShowing}
				className = 'disableClicks'
				>
					<Bot
						model = {'BotRobbey'}
						arm1 = {'Pewpew'}
						arm1Angle = {-45}
					/>
				</BotDiv>
			</RowDiv>
			<Styledh5>
				Change your avatar image:
			</Styledh5>

			<AvatarImgSelection>
				{userInfo.googleImageUrl && 
					<AvatarImgOption
					className = {'centeredFlex'}
					colors = {colors}
					selected = {userInfo.googleImageUrl === newAvImg}
					onClick={e => handleClickAvatarImgOption(userInfo.googleImageUrl)}
					>
						{/* <option style={{display: "none"}} value = {userInfo.googleImageUrl}/> */}
						<UserImg
						className = 'userImg'
						src={userInfo.googleImageUrl}
						alt = "User's picture.  Likely of them, but perhaps not."
						/>
					</AvatarImgOption>
				}
				{userInfo.availableBots.map((botName) => (
					<AvatarImgOption
					key = {botName}
					className = {'centeredFlex'}
					colors = {colors}
					selected = {botName === newAvImg}
					onClick={e => handleClickAvatarImgOption(botName)}
					>
						{/* <option style={{display: "none"}} value = {botName}/> */}
						<Bot
						className = 'userImg'
						alternativeBotSize = {40}
						model = {botName}
						arm1 = {'Pewpew'}
						arm1Angle = {-45}
						/>
					</AvatarImgOption>
				))
				}
			</AvatarImgSelection>

			<br/>

			Add color scheme changes.

			<StyledIcon
				handleClick = {saveSettings}
				padding = {5}
				disabled = {!changeMade || serverErrorMsg !== null}
      	icon = {floppyDisk}
      />
		</Wrapper>
  )
}
export default Settings;

const StyledInput = styled.input`
background-color: ${props => props.colors.secondary}
transition: background-color .75s;
&:hover {
	background-color: ${props => props.hovered};
}
`
const Wrapper = styled.div`
	padding: ${(props) =>
		props.navLocation === "top" ? 
			props.profileTab !== 'active' ? "50px 0 0 0" : "50px 135px 0 0"
			: props.profileTab !== 'active' ? "0 135px 0 0" : "0 135px 0 135px"
			};
	color: ${props => props.colors.textColor};
	width: 100%;
	height: 100%;
`
const Styledh5 = styled.h5`
	z-index: 8;
`
const ErrorP = styled.p`
	color: red;
	font-size: 0.6em;
`

const BotDiv = styled.div`
	position: absolute;
	display: ${props => !props.botShowing && 'none'};
	margin-left: 100px;
	z-index: 0;
`
const RowDiv = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 100%;
`
const AvatarImgSelection = styled.div`
	display: grid;
	grid-gap: 10px;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	width: 265px;
	margin-left: auto;
  margin-right: auto;
	@media screen and (max-width: 550px) {
    width: 155px;
		grid-template-columns: 1fr 1fr 1fr;
  }
`
const UserImg = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	z-index: 21;
`

const AvatarImgOption = styled.div`
	width: 45px;
	height: 45px;
	border-radius: 50%;
	background-color: ${props => props.selected && props.colors.selected};
	opacity: ${props => !props.selected && 0.5};
	&:hover{
		background-color: ${props => !props.selected && props.colors.hovered};
		cursor: ${props => !props.selected ? 'pointer' : 'not-allowed'};
		opacity: ${props => !props.selected && 0.8};
	}
`