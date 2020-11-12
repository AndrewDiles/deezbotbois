import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Bot from '../Bots/Bot';

function UserImage({ time }) {
  const settings = useSelector((state) => state.settings);
	const userInfo = useSelector((state) => state.userInfo);

  return (
		<Wrapper
		className = 'centeredFlex'
		navLocation = {settings.navLocation}
		glow = {time - userInfo.lastLogInBitsReceived}
		>
			{userInfo.imageUrl[0] === 'h' ? (
				<img
				className = 'userImg'
				src={userInfo.imageUrl}
				alt = "User's picture.  Likely of them, but perhaps not."
				/>
			) : (
				<div className = 'userImg'>
					<Bot
					alternativeBotSize = {40}
					model = {userInfo.imageUrl}
					botColors='default'
					/>
				</div>
			)
			}
		</Wrapper>
	)
}

export default UserImage;
const Wrapper = styled.div`
	width: 52px;
	height: 52px;
	border-radius: 50%;
	transition: transform .75s;
	animation: ${props => props.glow > 79200000 ? '1s linear infinite alternate glowUserImg':''};
	:hover {
		transform: scale(1.2);
		cursor: pointer;
	}
`