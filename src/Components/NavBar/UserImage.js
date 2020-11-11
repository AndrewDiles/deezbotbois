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
				<UserImg
				className = 'userImg'
				src={userInfo.imageUrl}
				alt = "User's picture.  Likely of them, but perhaps not."
				/>
			) : (
				<BotWrapper
				className = 'userImg'
				>
					<Bot
					// className = 'userImg'
					alternativeBotSize = {40}
					model = {userInfo.imageUrl}
					arm1 = {'Gun1'}
					arm1Angle = {-45}
					botColors='default'
					/>
				</BotWrapper>
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
const UserImg = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	z-index: 21;
`
const BotWrapper = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	z-index: 21;
`