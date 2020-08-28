import React, { useState } from 'react';
import styled from 'styled-components';

import { useSelector } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';
import StyledButton from '../StyledButton/StyledButton';

const AltLogin = () => {
	const settings = useSelector((state) => state.settings);
	const colors = useSelector(getThemeColors);
	const [existingAccount, setExistingAccount] = useState(null);
	const [accountConfirmed, setAccountConfirmed] = useState(null);
	const [handle, setNewHandle] = useState(null);
	
	const selectExistingAccount = (value) => {
		setExistingAccount(value);
		console.log(value, existingAccount)
	}
  return (
    <Wrapper
		navLocation = {settings.navLocation}
		profileTab = {settings.profileTab}
		colors = {colors}
		>
			<RowDiv
			className = {'centeredFlex'}
			>
				Do you have an account? &ensp;
      	<StyledButton
				handleClick = {() => {setExistingAccount(true);(setAccountConfirmed(null))}}
				selected = {existingAccount === true}
				>
					YES
				</StyledButton>
				<StyledButton
				handleClick = {() => {setExistingAccount(false);(setAccountConfirmed(null))}}
				selected = {existingAccount === false}
				>
					NO
				</StyledButton>
			</RowDiv>
			<br/>
			{existingAccount === true &&
				<RowDiv
				className = {'centeredFlex'}
				>
					Have you confirmed it? &ensp;
					<StyledButton
					handleClick = {() => {setAccountConfirmed(true)}}
					selected = {accountConfirmed === true}
					>
						YES
					</StyledButton>
					<StyledButton
					handleClick = {() => {setAccountConfirmed(false)}}
					selected = {accountConfirmed === false}
					>
						NO
					</StyledButton>
				</RowDiv>
			}
			{existingAccount === false &&
				<RowDiv>
					<h2>
						CREATE A NEW ACCOUNT
					</h2>
					<br/>
					HANDLE: &ensp; 
					<StyledInput
					colors = {colors}
					className = "centeredInput" 
					input="text" maxLength = "24" 
					onChange = {(ev)=>{setNewHandle(ev.target.value)}}
					/>
					<br/>
				</RowDiv>
			}
			{existingAccount === true && accountConfirmed === true &&
				<RowDiv>
					<h2>
						LOGIN
					</h2>
					<br/>
					EMAIL: &ensp; 
					{/* <StyledInput
					colors = {colors}
					className = "centeredInput" 
					input="text" maxLength = "24" 
					onChange = {(ev)=>{setNewHandle(ev.target.value)}}
					/> */}
					<br/>
				</RowDiv>
			}
			{existingAccount === true && accountConfirmed === false &&
				<RowDiv>
					<h2>
						FIRST LOGIN
					</h2>
					<br/>
					EMAIL: &ensp; 
					{/* <StyledInput
					colors = {colors}
					className = "centeredInput" 
					input="text" maxLength = "24" 
					onChange = {(ev)=>{setNewHandle(ev.target.value)}}
					/> */}
					<br/>
				</RowDiv>
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
	flex-direction: row;
	justify-content: center;
	align-content: center;
	align-items: center;
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
	color: ${props => props.colors.textColor};
	&:hover {
		background-color: ${props => props.colors.hovered};
	}
`
const RowDiv = styled.div``