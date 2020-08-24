import React from 'react';
import { useSelector, useDispatch } from "react-redux";

import {
	increaseBitCount,
	communicating,
	communicationsSuccessful,
	communicationsFailed
} from '../../Redux/actions';

import styled from 'styled-components';

import StyledIcon from '../StyledIcon/StyledIcon';
import {gift} from 'react-icons-kit/icomoon/gift';
import StyledButton from '../StyledButton/StyledButton';

const Gift = ({ time }) => {
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);

	const handleClickOnGift = () => {
		console.log('grats, clicked on the gift');
		dispatch(increaseBitCount(1,time));
	}
	let timeUntilGift = 79200000 - time + userInfo.lastLogInBitsReceived;
	if (timeUntilGift < 0) {
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
			displayedRemainingTime = `${Math.floor(timeUntilGift/3600000)} HOURS UNTIL BIT`;
		}
		else if (timeUntilGift > 3600000) {
			displayedRemainingTime = `1 HOUR UNTIL BIT`;
		}
		else if (timeUntilGift > 120000) {
			displayedRemainingTime = `${Math.floor(timeUntilGift/60000)} MINS UNTIL BIT`;
		}
		else if (timeUntilGift < 60000 ) {
			displayedRemainingTime = `${Math.floor(timeUntilGift/1000)} SECS UNTIL BIT`;
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