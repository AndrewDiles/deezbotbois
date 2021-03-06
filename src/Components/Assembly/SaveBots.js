import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import StyledButton from '../StyledButton/StyledButton';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';

import {
	communicating,
	communicationsSuccessful,
	communicationsFailed,
	receiveBotInfo,
	replaceAttributes
} from '../../Redux/actions';

const SaveBots = ({ botNumberSelected, disabled, setErrorMsg, setSuccessMsg, setBotSnapshot, attributes }) => {
	const settings = useSelector((state) => state.settings);
	const userInfo = useSelector((state) => state.userInfo);
	const botInfo = userInfo.botBuilds;
	const dispatch = useDispatch();
	const handleSaveBots = () => {
		dispatch(communicating());
		dispatch(replaceAttributes(botNumberSelected, attributes));
		//TODO: Remove console log when done making bots to play game with
		// if (userInfo.email === 'andrewdiles@gmail.com') console.log('current bot:',JSON.stringify(botInfo[botNumberSelected]));
			fetch('server/updateBotBuilds', {
				method: "POST",
    	  headers: {
    	    "Content-Type": "application/json",
    	  },
    	  body: JSON.stringify({ 
					email: userInfo.email,
					botBuilds: botInfo,
    	  }),
			}).then((res)=>{
				if (res.status === 200) {
					res.json().then((data)=>{
						dispatch(receiveBotInfo(data.botBuilds))
						setBotSnapshot(JSON.parse(JSON.stringify(data.botBuilds)))
						setSuccessMsg(data.message)
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
    <StyledButton
		handleClick = {() => {handleSaveBots()}}
		disabled = {disabled || settings.serverStatus !== 'idle'}
		sfx = 'confirm'
		>
			SAVE BOTS
		</StyledButton>
  )
}
export default SaveBots;