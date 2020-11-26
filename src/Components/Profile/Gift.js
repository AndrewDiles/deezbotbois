import React from 'react';
import { useSelector, useDispatch } from "react-redux";

import {
	increaseBitCount,
	communicating,
	communicationsSuccessful,
	communicationsFailed
} from '../../Redux/actions';

import styled from 'styled-components';

import Star from '../Star/Star';
import StyledIcon from '../StyledIcon/StyledIcon';
import {gift} from 'react-icons-kit/icomoon/gift';
import StyledButton from '../StyledButton/StyledButton';

const Gift = ({ time }) => {
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	const [starDisplaying, setStarDisplaying] = React.useState(false);

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
					setStarDisplaying(true);
					setTimeout(()=>{setStarDisplaying(false)},2500);
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
		sfx = 'confirm'
    />
	)
	}
	else {
		let displayedRemainingTime;
		if (timeUntilGift > 3600000) {
			displayedRemainingTime = `${Math.floor(timeUntilGift/3600000)}+ HRS TO NEXT BIT`;
		}
		else if (timeUntilGift > 120000) {
			displayedRemainingTime = `${Math.floor(timeUntilGift/60000)}+ MINS TO NEXT BIT`;
		}
		else if (timeUntilGift > 1000 ) {
			displayedRemainingTime = `${Math.floor(timeUntilGift/1000)} SECS TO NEXT BIT`;
		}
		else {
			displayedRemainingTime = `${Math.floor(timeUntilGift)} mS TO NEXT BIT`;
		}
			return (
				<StyledDiv>
				<StyledButton
				disabled = {true}
				>
				{displayedRemainingTime}
				</StyledButton>
				{ starDisplaying &&
					<Star
					color = 'blue'
					animated = {1}
					/>
				}
			</StyledDiv>
		)
		
	}
}
export default Gift;

const StyledDiv = styled.div`
	width: auto;
	height: auto;
`