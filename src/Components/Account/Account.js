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
} from '../../Redux/actions';

import StyledIcon from '../StyledIcon/StyledIcon';
import {floppyDisk} from 'react-icons-kit/icomoon/floppyDisk'

const Account = () => {

	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	const settings = useSelector((state) => state.settings);
	const [changeMade, setChangeMade] = useState(false);
	const [newPassword1, setNewPassword1] = useState(null);
	const [newPassword2, setNewPassword2] = useState(null);
	const [serverErrorMsg, setServerErrorMsg] = useState(null);
	const [successMsg, setSuccessMsg] = useState(null);
	let colors = useSelector(getThemeColors);

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
		let eraseSuccessMsg;
		if (successMsg) {
			eraseSuccessMsg = setTimeout(()=>{
				setSuccessMsg(null)
			},2000)
		}
		return () => clearTimeout(eraseSuccessMsg)
	},[successMsg])

	if (userInfo.email === undefined || userInfo.email === null) {
    return (
      <Redirect to="/home" />
    )
	}

	const updateChangeMade = () => {
		if (changeMade) return;
		setChangeMade(true);
	}
	
	const saveSettings = () => {
		if (!changeMade) return;
		if (newPassword1 !== newPassword2) {
			setServerErrorMsg("New passwords must match!");
			return;
		}
		else if (newPassword2 === "google") {
			setServerErrorMsg('Password may not be the word "google"!');
			return;
		}
		let newAuthInfo = {
			email : userInfo.email,
			password: newPassword1,
			confirmed: true
		};
		dispatch(communicating());
		fetch('server/changePassword', {
			method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
				authInfo: newAuthInfo
      }),
		}).then((res)=>{
			if (res.status === 200) {
				res.json().then((data)=>{
					setChangeMade(false);
					dispatch(communicationsSuccessful());
					setSuccessMsg("Password change successful!")
				})
			}
			else if (res.status === 400) {
				dispatch(communicationsFailed());
				setServerErrorMsg(res.message);
				console.log('Missing data')
			}
			else if (res.status === 403) {
				dispatch(communicationsFailed());
				setServerErrorMsg(res.message);
				console.log('Attempt denied')
			}
			else if (res.status === 404) {
				dispatch(communicationsFailed());
				setServerErrorMsg(res.message);
				console.log('Could not find account')
			}
			else if (res.status === 500) {
				dispatch(communicationsFailed());
				setServerErrorMsg(res.message);
				console.log('Server error')
			}
		})
	}
	
	// TBD: Modofication of: nav location, color theme.... 
  return (
		<Wrapper
		navLocation = {settings.navLocation}
		profileTab = {settings.profileTab}
		colors = {colors}
		>
			<br/>
			Change login password:
			<br/>
			<RowDiv>
				<ColDiv>
					<StyledInput
					colors = {colors}
					className = "centeredInput"
					input="text" maxLength = "24" 
					onChange = {(ev)=>{updateChangeMade();setNewPassword1(ev.target.value)}}
					>
					</StyledInput>
					New password
					<br/>
				</ColDiv>
				<ColDiv>
					<StyledInput
					colors = {colors}
					className = "centeredInput" 
					input="text" maxLength = "24" 
					onChange = {(ev)=>{updateChangeMade();setNewPassword2(ev.target.value)}}
					>
					</StyledInput>
					Repeat new password
					<br/>
				</ColDiv>
			</RowDiv>

			<br/>

			<StyledIcon
				handleClick = {saveSettings}
				padding = {5}
				disabled = {!changeMade || serverErrorMsg !== null}
      	icon = {floppyDisk}
      />
			<ErrorP>
				{serverErrorMsg}
			</ErrorP>
			<SuccessP>
				{successMsg}
			</SuccessP>
		</Wrapper>
  )
}
export default Account;

const StyledInput = styled.input`
	background-color: ${props => props.colors.secondary};
	color: ${props => props.colors.textColor};
	&:hover {
		background-color: ${props => props.colors.hovered};
	}
`
const Wrapper = styled.div`
	padding: ${(props) =>
		props.navLocation === "top" ? 
			props.profileTab === 'active' && "0 140px 0 0"
			: props.profileTab === 'active' ? "0 140px 0 140px" : "0 140px 0 0"
			};
	color: ${props => props.colors.textColor};
	width: 100%;
	height: 100%;
	overflow: auto;
`
const ErrorP = styled.p`
	color: red;
	font-size: 0.6em;
`
const SuccessP = styled.p`
	color: lime;
	font-size: 0.6em;
`

const RowDiv = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 100%;
	@media screen and (max-width: 800px) {
		flex-wrap: wrap;
	}
`
const ColDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	margin: 0 10px;
`