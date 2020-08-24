import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import styled from 'styled-components';

import {
	updateUrl,
	deactivateProfileTab,
	setNavLocation
} from '../../Redux/actions';

import StyledButton from '../StyledButton/StyledButton';
import SizeSlider from '../SizeSlider/SizeSlider';
import Logout from '../NavBar/Logout';
import Bot from '../Bots/Bot';

const Settings = ({ disabled }) => {
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	const settings = useSelector((state) => state.settings);
	const [newHandle, setNewHandle] = useState(userInfo.handle);

	if (userInfo.email === undefined || userInfo.email === null) {
    return (
      <Redirect to="/home" />
    )
	}
	const changeNavLocation = (ev) => {
		if (ev.target === undefined) return;
		console.log('ev.target',ev.target)
		console.log('ev.target.value',ev.target.innerText)
    if (ev.target.innerText === 'TOP') {
      dispatch(setNavLocation('top'));
    }
    else {
      dispatch(setNavLocation('left'));
    }
  }

	// TBD: Modofication of: url image, nav location, handle, color theme.... 
  return (
		<Wrapper>
			<h1>
				Hello {userInfo.handle}!
			</h1>

			<Styledh5>
				Change your handle:
				<br/>
				<br/>
				<input className = "centeredInput" defaultValue = {newHandle} input="text" maxLength = "24" onChange = {(ev)=>{setNewHandle(ev.target.value)}}>
				</input>
			</Styledh5>

			<Styledh5>
				Change the location of your navigation menu:
				<br/>
				<br/>
				<StyledButton
				value = "top"
				handleClick = {(ev)=>{changeNavLocation(ev)}}
				>
					TOP
				</StyledButton>
				<StyledButton
				value = "left"
				handleClick = {(ev)=>{changeNavLocation(ev)}}
				>
					LEFT
				</StyledButton>
			</Styledh5>
			
			<Styledh5>
				Change the size of your bots / battlegrid:
			</Styledh5>
			<br/>
			<br/>
			<RowDiv>
				<SizeSlider/>
				<BotDiv
				className = 'disableClicks'
				>
					<Bot
						model = {'BotRobbey'}
						arm1 = {'Pewpew'}
						arm1Angle = {-45}
					/>
				</BotDiv>
			</RowDiv>

		</Wrapper>
  )
}
export default Settings;

const Wrapper = styled.div`
	background: lime;
	color: black;
	width: 100%;
	height: 100%;
`
const Styledh5 = styled.h5`
	z-index: 8;
`

const BotDiv = styled.div`
	position:absolute;
	margin-left: 100px;
	z-index: 5;
`
const RowDiv = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 100%;
`