import React from 'react';

import { useSelector, useDispatch } from "react-redux";
import StyledButton from '../StyledButton/StyledButton';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';

import {
	communicating,
	communicationsSuccessful,
	communicationsFailed,
	receiveBotInfo,
} from '../../Redux/actions';

const CreateNewBot = ({ setBotNumberSelected, setErrorMsg, setSuccessMsg }) => {
	const settings = useSelector((state) => state.settings);
	const userInfo = useSelector((state) => state.userInfo);
	const dispatch = useDispatch();
	const handleClickCreateNewBot = () => {
		dispatch(communicating());
			fetch('server/createNewBot', {
				method: "POST",
    	  headers: {
    	    "Content-Type": "application/json",
    	  },
    	  body: JSON.stringify({ 
					email: userInfo.email,
					botInfo: userInfo.botBuilds,
    	  }),
			}).then((res)=>{
				if (res.status === 200) {
					res.json().then((data)=>{
						dispatch(receiveBotInfo(data.botInfo))
						setBotNumberSelected(data.botInfo.length-1)
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
		handleClick = {() => {handleClickCreateNewBot()}}
		disabled = {(userInfo.botBuilds && userInfo.botBuilds.length >= 9) || settings.serverStatus !== 'idle'}
		sfx = 'confirm'
		>
			NEW BOT
		</StyledButton>
  )
}
export default CreateNewBot;