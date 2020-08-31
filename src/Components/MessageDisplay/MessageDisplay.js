import React, { useEffect } from 'react';
import styled from 'styled-components';

const MessageDisplay = ({type, msg, setMsg, textSize}) => {

	useEffect(() => {
		let eraseMsg;
		if (msg && setMsg) {
			eraseMsg = setTimeout(()=>{
				setMsg(null)
			},2000)
		}
		return () => clearTimeout(eraseMsg)
	},[msg])
	
  return (
		<MessageP
		type = {type}
		textSize = {textSize}
		>
			{msg}
		</MessageP>
  )
}
export default MessageDisplay;

const MessageP = styled.p`
	white-space: nowrap;
	color: ${props => props.type === 'error' && 'red'};
	color: ${props => props.type === 'success' && 'lime'};
	font-size: ${props => props.textSize ? props.textSize : '0.6em'};
`