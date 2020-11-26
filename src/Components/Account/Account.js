import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import styled from 'styled-components';
import { getThemeColors } from '../../Redux/reducers/user-reducer';

import {
	communicating,
	communicationsSuccessful,
	communicationsFailed,
} from '../../Redux/actions';

import StyledInput from '../StyledInput/StyledInput';
import StyledIcon from '../StyledIcon/StyledIcon';
import {floppyDisk} from 'react-icons-kit/icomoon/floppyDisk'
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';

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

	useEffect(() => {
		let eraseServerErrorMsg;
		if (serverErrorMsg) {
			eraseServerErrorMsg = setTimeout(()=>{
				setServerErrorMsg(null)
			},2000)
		}
		return () => clearTimeout(eraseServerErrorMsg)
	},[serverErrorMsg])

	useEffect(() => {
		let eraseSuccessMsg;
		if (successMsg) {
			eraseSuccessMsg = setTimeout(()=>{
				setSuccessMsg(null)
			},2000)
		}
		return () => clearTimeout(eraseSuccessMsg)
	},[successMsg])

	useEffect(()=>{
		if (changeMade) return;
		if (newPassword1 !== null || newPassword2 !== null) {
			setChangeMade(true);
		}
	},[newPassword1, newPassword2])

	if (userInfo.email === undefined || userInfo.email === null) {
    return (
      <Redirect to="/home" />
    )
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
  return (
		<Wrapper
		navLocation = {settings.navLocation}
		profileTab = {settings.profileTab}
		colors = {colors}
		>
			<br/>
			CHANGE PASSWORD:
			<br/>
			<RowDiv>
				<StyledInput
				maxLength = "24"
				setValue = {setNewPassword1}
				labelName = 'NEW PASSWORD'
				margin = {5}
				width = '350'
				/>
				<StyledInput
				maxLength = "24"
				setValue = {setNewPassword2}
				labelName = 'REPEAT NEW PASSWORD'
				margin = {5}
				width = '350'
				/>
			</RowDiv>

			<br/>
			{settings.serverStatus === 'idle' ? (
				<StyledIcon
				handleClick = {saveSettings}
				padding = {5}
				disabled = {!changeMade || serverErrorMsg !== null}
				icon = {floppyDisk}
      	/>
			):(
				<div className = 'centeredFlex'>
					<LoadingAnimation size = {40}/>
				</div>
			)}

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
const Wrapper = styled.div`
	padding: ${(props) =>
		props.navLocation === "top" ? 
			props.profileTab === 'active' && "0 140px 0 0"
			: props.profileTab === 'active' ? "0 140px 0 140px" : "0 140px 0 0"
			};
	transition: padding 0.5s ease-in-out;
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
	justify-content: space-around;
	align-items: center;
	flex-wrap: wrap;
	width: 100%;
`
const ColDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	margin: 0 10px;
`