import React from 'react';

import { useSelector, useDispatch } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';

import StyledButton from '../StyledButton/StyledButton';

import {
	communicating,
	communicationsSuccessful,
	communicationsFailed,
	receiveBotInfo,
} from '../../Redux/actions';

const SaveBots = ({ disabled, botInfo, setErrorMsg, setSuccessMsg }) => {
	const settings = useSelector((state) => state.settings);
	const userInfo = useSelector((state) => state.userInfo);
	const dispatch = useDispatch();
	const handleSaveBots = () => {
		dispatch(communicating());
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
  return (
    <StyledButton
			handleClick = {() => {handleSaveBots()}}
			disabled = {disabled || settings.serverStatus !== 'idle'}
			>
				SAVE BOTS
		</StyledButton>
  )
}
export default SaveBots;