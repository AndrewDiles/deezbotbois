import React from 'react';
import { useSelector, useDispatch } from "react-redux";

import {
	increaseBitCount,
	communicating,
	communicationsSuccessful,
	communicationsFailed
} from '../../Redux/actions';

import StyledIcon from '../StyledIcon/StyledIcon';
import {gift} from 'react-icons-kit/icomoon/gift';
import StyledButton from '../StyledButton/StyledButton';

const Gift = ({ time }) => {
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);

	const handleClickOnGift = () => {
		console.log('grats, clicked on the gift');
		dispatch(communicating());
		fetch('server/increaseBitCount', {
			method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        email: userInfo.email,
				time: time,
      }),
		}).then((res)=>{
			if (res.status === 200) {
				res.json().then((data)=>{
					dispatch(increaseBitCount(1,time));
					dispatch(communicationsSuccessful());
				})
			}
			else if (res.status === 400) {
				dispatch(communicationsFailed());
			}
			else if (res.status === 404) {
				dispatch(communicationsFailed());
			}
			else if (res.status === 500) {
				dispatch(communicationsFailed());
			}
		})
	}
	let timeUntilGift = 79200000 - time + userInfo.lastLogInBitsReceived;
	if (timeUntilGift <= 0) {
	return (
		<StyledIcon
    handleClick = {handleClickOnGift}
		icon = {gift}
		glowing = 'indeeditglows'
		padding = {5}
    />
	)
	}
	else {
		let displayedRemainingTime;
		if (timeUntilGift > 2*3600000) {
			displayedRemainingTime = `${Math.floor(timeUntilGift/3600000)} HRS TO NEXT BIT`;
		}
		else if (timeUntilGift > 3600000) {
			displayedRemainingTime = `1 HOUR TO NEXT BIT`;
		}
		else if (timeUntilGift > 120000) {
			displayedRemainingTime = `${Math.floor(timeUntilGift/60000)} MINS TO NEXT BIT`;
		}
		else if (timeUntilGift > 1000 ) {
			displayedRemainingTime = `${Math.floor(timeUntilGift/1000)} SECS TO NEXT BIT`;
		}
		else {
			displayedRemainingTime = `${Math.floor(timeUntilGift)} mS TO NEXT BIT`;
		}
			return (
			<StyledButton
			disabled = {true}
			>
				{displayedRemainingTime}
			</StyledButton>
		)
	}
}
export default Gift;