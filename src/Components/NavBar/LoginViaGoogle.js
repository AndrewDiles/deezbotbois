import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GoogleLogin from 'react-google-login';
import styled from 'styled-components';
import {REACT_APP_AUTH0_CLIENT_ID} from '../../authInfo';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';

import {
	communicating,
	communicationsSuccessful,
	communicationsFailed,
	receiveUserInfo,
	setNavLocation,
	setColorTesting,
	setCellSize
} from '../../Redux/actions';

function LoginViaGoogle() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  const handleSuccessfulGoogleLogin = (res) => {
		let googleRes = res.profileObj;
		// console.log('res',res);
		dispatch(communicating());
		fetch('server/googleLogIn', {
			method: "POST",
      headers: {
				"Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        email: googleRes.email,
				name: googleRes.name,
				imageUrl: googleRes.imageUrl,
				cellSize: settings.cellSize,
				navLocation: settings.navLocation
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
			else if (res.status === 400) {
				dispatch(communicationsFailed());
				console.log('Missing data')
			}
			else if (res.status === 500) {
				dispatch(communicationsFailed());
				console.log('Server error')
			}
		})
  }
	if (settings.serverStatus !== 'idle') {
		return (
			<div className = 'baseButtonSize'>
				<LoadingAnimation
				size = {40}
				/>
			</div>
		)
	}
  return (
    <StyledGoogleLogin
			buttonText = "LOGIN"
			navlocation = {settings.navLocation}
			onClick = {()=>dispatch(communicating())}
      clientId = {REACT_APP_AUTH0_CLIENT_ID}
      onSuccess = {(res)=>{handleSuccessfulGoogleLogin(res)}}
      onFailure = {(res)=>{console.log(res); dispatch(communicationsFailed())}}
			cookiePolicy = {"single_host_origin"}
      >
    </StyledGoogleLogin>
  );
}
export default LoginViaGoogle;

const StyledGoogleLogin = styled(GoogleLogin)`
  border-radius: 5px !important;
  height: 40px !important;
  overflow: hidden !important;
	margin-top: 5px !important;
	transition: color .75s, border .75s !important;
	&:hover{
		color: #000 !important;
		border: black 2px solid !important;
	}
	@media (max-width: 900px) {
		width: ${props => props.navlocation === 'top' && '40px'};
	}
`