import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components';
import StyledButton from '../StyledButton/StyledButton';

import {
	communicating,
	communicationsSuccessful,
	communicationsFailed,
	receiveBotInfo,
} from '../../Redux/actions';

const DeleteBot = ({ setBotNumberSelected, botNumberSelected, setErrorMsg, setSuccessMsg, setBotSnapshot }) => {
	const settings = useSelector((state) => state.settings);
	const userInfo = useSelector((state) => state.userInfo);
	const [confirmOpen, setConfirmOpen] = React.useState(false);
	const dispatch = useDispatch();

	React.useEffect(() => {
		let closeTimer;
		if (confirmOpen) {
			closeTimer = setTimeout(()=>{
				if (setConfirmOpen) {
					setConfirmOpen(null)
				}
			},5000)
		}
		return () => clearTimeout(closeTimer)
	},[confirmOpen])

	const handleDeleteBot = () => {
		dispatch(communicating());
			fetch('server/removeBot', {
				method: "DELETE",
    	  headers: {
    	    "Content-Type": "application/json",
    	  },
    	  body: JSON.stringify({ 
					email: userInfo.email,
					index: botNumberSelected,
    	  }),
			}).then((res)=>{
				if (res.status === 200) {
					res.json().then((data)=>{
						dispatch(receiveBotInfo(data.botBuilds))
						setBotSnapshot(JSON.parse(JSON.stringify(data.botBuilds)))
						setSuccessMsg(data.message)
						if (botNumberSelected !==0) {
							setBotNumberSelected(botNumberSelected-1);
						}
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
		<RowDivCenter
		className = 'centeredFlex'
		>
    	<StyledButton
			handleClick = {() => {setConfirmOpen(true)}}
			disabled = {settings.serverStatus !== 'idle'}
			sfx = 'selected'
			>
				DISMANTLE BUILD
			</StyledButton>
			{confirmOpen &&
				<StyledButton
				handleClick = {() => {handleDeleteBot();setConfirmOpen(false)}}
				disabled = {settings.serverStatus !== 'idle'}
				sfx = 'confirm'
				>
					CONFIRM REMOVAL
				</StyledButton>
			}
		</RowDivCenter>
  )
}
export default DeleteBot;

const RowDivCenter = styled.div`
	/* width: ${props => props.cellSize && `${4*props.cellSize}px`}; */
	width: 250px;
	flex-direction: row;
`