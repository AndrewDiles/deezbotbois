import React, { useEffect } from 'react';
import styled from 'styled-components';

const MessageDisplay = ({type, msg, setMsg}) => {

	useEffect(() => {
		let eraseMsg;
		if (msg) {
			eraseMsg = setTimeout(()=>{
				setMsg(null)
			},2000)
		}
		return () => clearTimeout(eraseMsg)
	},[msg])
	
  return (
		<MessageP
		type = {type}
		>
			{msg}
		</MessageP>
  )
}
export default MessageDisplay;

const MessageP = styled.p`
	color: ${props => props.type === 'error' && 'red'};
	color: ${props => props.type === 'success' && 'lime'};
	font-size: 0.6em;
`