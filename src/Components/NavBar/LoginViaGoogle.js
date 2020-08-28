import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GoogleLogin from 'react-google-login';
import styled from 'styled-components';
import {REACT_APP_AUTH0_CLIENT_ID} from '../../authInfo';

import {
	communicating,
	communicationsSuccessful,
	communicationsFailed,
	receiveUserInfo,
	setNavLocation,
	setColorTesting
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
					dispatch(communicationsSuccessful());
					dispatch(setNavLocation(data.userInfo.navLocationPreference));
					dispatch(setColorTesting(data.userInfo.colorTheme));
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

  return (
    <StyledGoogleLogin
      buttonText = "LOGIN"
      clientId = {REACT_APP_AUTH0_CLIENT_ID}
      onSuccess = {(res)=>{handleSuccessfulGoogleLogin(res)}}
      onFailure = {(res)=>{console.log(res)}}
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
`