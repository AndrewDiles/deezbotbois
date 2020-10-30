import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import styled from 'styled-components';

import { useSelector, useDispatch } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';
import StyledButton from '../StyledButton/StyledButton';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';

import {
	communicating,
	communicationsSuccessful,
	communicationsFailed,
	receiveUserInfo,
	setNavLocation,
	setColorTesting,
	setCellSize,
	updateUrl
} from '../../Redux/actions';

const AltLogin = () => {
	const dispatch = useDispatch();
	const settings = useSelector((state) => state.settings);
	const userInfo = useSelector((state) => state.userInfo);
	const colors = useSelector(getThemeColors);
	const [existingAccount, setExistingAccount] = useState(null);
	const [accountConfirmed, setAccountConfirmed] = useState(null);
	const [handle, setHandle] = useState(null);
	const [emailEntry, setEmailEntry] = useState(null);
	const [password1, setPassword1] = useState(null);
	const [password2, setPassword2] = useState(null);
	const [confirmationCode, setConfirmationCode] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null); 
	const [successMsg ,setSuccessMsg] = useState(null);
	const [secondSuccessMsg ,setSecondSuccessMsg] = useState(null);

	React.useEffect(() => {
		if (userInfo.email !== null) {
			dispatch(updateUrl('home'))
		}
	},[userInfo.email])

	React.useEffect(() => {
		let eraseSuccessMsg;
		if (successMsg) {
			eraseSuccessMsg = setTimeout(()=>{
				setSuccessMsg(null)
			},5000)
		}
		return () => clearTimeout(eraseSuccessMsg)
	},[successMsg])
	React.useEffect(() => {
		let eraseSecondSuccessMsg;
		if (secondSuccessMsg) {
			eraseSecondSuccessMsg = setTimeout(()=>{
				setSecondSuccessMsg(null)
			},5500)
		}
		return () => clearTimeout(eraseSecondSuccessMsg)
	},[secondSuccessMsg])
	React.useEffect(() => {
		let eraseErrorMsg;
		if (errorMsg) {
			eraseErrorMsg = setTimeout(()=>{
				setErrorMsg(null)
			},2000)
		}
		return () => clearTimeout(eraseErrorMsg)
	},[errorMsg])

	const resetFields = () => {
		setHandle(null);
		setEmailEntry(null);
		setPassword1(null);
		setPassword2(null);
		setConfirmationCode(null);
	}
	const testForValidEmail = (supposedEmail) => {
		// Below test function lifted from https://www.w3resource.com/javascript/form/email-validation.php
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(supposedEmail)) return (true)
		return (false)
	}
	
	// const testForInvalidNewAccountData = () => {
	// 	if (handle === null || handle === '' || !emailEntry || 
	// 	password1 === null || password1 === '' || 
	// 	password2 === null || password2 === ''
	// 	) return true;
	// 	if (password1 !== password2) return true;
	// 	if (!testForValidEmail(emailEntry)) return true;
	// 	return false;
	// }
	const testForInvalidLoginData = () => {
		if (!testForValidEmail(emailEntry)) return true;
		if (password1 === null || password1 === '') return true;
		return false
	}
	const testForInvalidFirstLoginData = () => {
		let result;
		result = testForInvalidLoginData();
		if (result) return result
		if (confirmationCode === null || confirmationCode === '' || confirmationCode.length !== 4) return true;
		let charTest = false;
		const confirmationCodeArray = Array.from(confirmationCode);
		confirmationCodeArray.forEach((character)=> {
			if (!charTest) {
				if (!(+character >= 0 && +character <= 9)) {
					charTest = true;
				}
			}
		})
		return charTest;
	}
	const handleSubmitNewAccount = () => {
		if (handle === null || handle === '') {
			setErrorMsg('Please enter a handle!');
			return;
		}
		else if (!testForValidEmail(emailEntry)) {
			setErrorMsg('Invalid Email Address!');
			return;
		}
		else if (password1 === null || password1 === '' || password2 === null || password2 === '') {
			setErrorMsg('A password may not be blank.');
			return;
		}
		else if (password1 !== password2) {
			setErrorMsg('Passwords do not match!');
			return;
		}
		else {
			dispatch(communicating());
			fetch('server/createAccount', {
				method: "POST",
    	  headers: {
    	    "Content-Type": "application/json",
    	  },
    	  body: JSON.stringify({ 
    	    email: emailEntry,
					password: password1,
					handle: handle,
					cellSize: settings.cellSize,
					navLocation: settings.navLocation
    	  }),
			}).then((res)=>{
				if (res.status === 200) {
					res.json().then((data)=>{
						resetFields();
						setAccountConfirmed(false);
						setExistingAccount(true);
						dispatch(communicationsSuccessful());
						setSuccessMsg("Account creation successful!")
						setSecondSuccessMsg("Please retrieve your confirmation number from your email.")
					})
				}
				else {
					res.json().then((data)=>{
						setErrorMsg(data.message)
						console.log(data.status, data.message)
					})
					dispatch(communicationsFailed())
				}
			})
		}
	}

	const handleLogin = () => {
		dispatch(communicating());
		fetch('server/login', {
			method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailEntry,
				password: password1,
				confirmationCode: parseInt(confirmationCode)
      }),
		}).then((res)=>{
			if (res.status === 200) {
				res.json().then((data)=>{
					dispatch(receiveUserInfo(data.userInfo));
					dispatch(setNavLocation(data.userInfo.navLocationPreference));
					dispatch(setColorTesting(data.userInfo.colorTheme));
					dispatch(setCellSize(data.userInfo.cellSizePreference));
					dispatch(communicationsSuccessful());
				})
			}
			else if (res.status === 206) {
				res.json().then((data)=>{
					setSuccessMsg(data.message);
					setAccountConfirmed(false);
					dispatch(communicationsSuccessful());
				})
			}
			else {
				res.json().then((data)=>{
					setErrorMsg(data.message)
					console.log(data.status, data.message)
				})
				dispatch(communicationsFailed())
			}
		})
	}
	
	if (settings.currentUrl === 'home') {
		return (
			<Redirect to="/home"/>
		)
	}
  return (
    <Wrapper
		navLocation = {settings.navLocation}
		profileTab = {settings.profileTab}
		colors = {colors}
		>
			<RowDiv
			className = 'centeredFlex'
			>
				Do you have an account? &ensp;
      	<StyledButton
				handleClick = {() => {resetFields();setExistingAccount(true);(setAccountConfirmed(null))}}
				selected = {existingAccount === true}
				>
					YES
				</StyledButton>
				<StyledButton
				handleClick = {() => {resetFields();setExistingAccount(false);(setAccountConfirmed(null))}}
				selected = {existingAccount === false}
				>
					NO
				</StyledButton>
			</RowDiv>
			<br/>
			{existingAccount === false &&
				<div>
					<Styledh2>
						CREATE A NEW ACCOUNT
					</Styledh2>
					<br/>
					<RowDiv>
						HANDLE: &ensp; 
						<StyledInput
						colors = {colors}
						className = "centeredInput" 
						type="text" maxLength = "24" 
						onChange = {(ev)=>{setHandle(ev.target.value)}}
						/>
						<br/>
					</RowDiv>
					<RowDiv>
						EMAIL: &ensp; 
						<StyledInput
						colors = {colors}
						className = "centeredInput" 
						type="text" maxLength = "24" 
						onChange = {(ev)=>{setEmailEntry(ev.target.value)}}
						/>
						<br/>
					</RowDiv>
					<RowDiv>
						PASSWORD: &ensp; 
						<StyledInput
						colors = {colors}
						className = "centeredInput" 
						type="text" maxLength = "24" 
						onChange = {(ev)=>{setPassword1(ev.target.value)}}
						/>
						<br/>
					</RowDiv>
					<RowDiv>
						PASSWORD: &ensp; 
						<StyledInput
						colors = {colors}
						className = "centeredInput" 
						type="text" maxLength = "24" 
						onChange = {(ev)=>{setPassword2(ev.target.value)}}
						/>
						<br/>
					</RowDiv>
					<RowDiv>
						{settings.serverStatus === 'idle' ? (
							<StyledButton
							handleClick = {() => {handleSubmitNewAccount()}}
							// disabled = {testForInvalidNewAccountData()}
							>
								SUBMIT
							</StyledButton>
						):(
							<div className = 'centeredFlex'>
								<LoadingAnimation size = {40}/>
							</div>
						)}
						<br/>
					</RowDiv>
				</div>
			}
			{existingAccount === true &&
				<div>
					<Styledh2>
					LOGIN
					</Styledh2>
					<br/>
					<RowDiv>
						EMAIL: &ensp; 
						<StyledInput
						colors = {colors}
						className = "centeredInput" 
						type="text" maxLength = "24" 
						onChange = {(ev)=>{setEmailEntry(ev.target.value)}}
						/>
						<br/>
					</RowDiv>
					<RowDiv>
						PASSWORD: &ensp; 
						<StyledInput
						colors = {colors}
						className = "centeredInput" 
						type="password" maxLength = "24"
						onChange = {(ev)=>{setPassword1(ev.target.value)}}
						/>
						<br/>
					</RowDiv>
					{accountConfirmed === false &&
						<RowDiv>
							CONFIRMATION NUMBER: &ensp; 
							<StyledInput
							colors = {colors}
							codeEntry = {true}
							className = "centeredInput" 
							type="text" maxLength = "5" 
							onChange = {(ev)=>{setConfirmationCode(ev.target.value)}}
							/>
							<br/>
						</RowDiv>
					}
					<RowDiv>
						{settings.serverStatus === 'idle' ? (
							<StyledButton
							handleClick = {() => {handleLogin()}}
							disabled = {accountConfirmed === null ? testForInvalidLoginData() : testForInvalidFirstLoginData()}
							>
								LOGIN
							</StyledButton>
						):(
							<div className = 'centeredFlex'>
								<LoadingAnimation size = {40}/>
							</div>
						)}
						<br/>
					</RowDiv>
				</div>
			}
			{errorMsg &&
				<ErrorP>
					{errorMsg}
				</ErrorP>
			}
			{successMsg &&
				<SuccessP>
					{successMsg}
				</SuccessP>
			}
			{secondSuccessMsg &&
				<SuccessP>
					{secondSuccessMsg}
				</SuccessP>
			}
    </Wrapper>
	)
}
export default AltLogin;

const Wrapper = styled.div`
	padding: ${(props) =>
		props.navLocation === "top" ? 
			props.profileTab !== 'active' ? "50px 0 0 0" : "50px 135px 0 0"
			: props.profileTab !== 'active' ? "0 135px 0 0" : "0 135px 0 135px"
			};
	color: ${props => props.colors.textColor};
	width: 100%;
	height: 100%;
	display : flex;
	flex-direction: column;
	justify-content: center;
	align-content: center;
	align-items: center;
`

const StyledInput = styled.input`
	background-color: ${props => props.colors.secondary};
	font-size:16px;
	width: ${props => props.codeEntry ? '100px' : '100%'};
	height: 25px;
	color: ${props => props.colors.textColor};
	&:hover {
		background-color: ${props => props.colors.hovered};
	}
	&:focus {
		outline-color: ${props => !props.disabled && props.colors.hoveredText};
		color: ${props => props.colors.hoveredText};
	}
`
const RowDiv = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
`

const ErrorP = styled.p`
	color: red;
	font-size: 0.6em;
`
const SuccessP = styled.p`
	color: lime;
	font-size: 0.6em;
`
const Styledh2 = styled.h2`
	text-align: center;
	width: 500px;
	@media screen and (max-width: 800px) {
			width: 400px
		}
	@media screen and (max-width: 600px) {
		width: 300px
	}
	@media screen and (max-width: 400px) {
		width: 200px
	}
`