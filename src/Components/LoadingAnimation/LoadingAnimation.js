import React from 'react';
import styled from 'styled-components';
import Bot from "../Bots/Bot";

const LoadingAnimation = ({size, botToDisplay}) => {
	if (size === undefined) {
		size = 0;
	}
	let arm1 = 'Gun1';
	if (!botToDisplay) {
		const test1 = Math.random();
		if (test1 < 0.2) {
			arm1 = 'Gun2';
		} else if (test1 < 0.4) {
			arm1 = 'Gun3'
		} else if (test1 < 0.6) {
			arm1 = 'Hammer1'
		} else if (test1 < 0.8) {
			arm1 = 'Sword1'
		} else {
			// this should not be needed
			arm1 = 'Gun1'
		}
	}
  return (
    <Wrapper
		className = 'centeredFlex'
		>
      <BotWrapper
			size = {size}
			className = 'rotating'
      >
        <Bot
				model = {botToDisplay && botToDisplay.model || null}
				arm1 = {botToDisplay && botToDisplay.equipment.arm1 || arm1}
				arm2 = {botToDisplay && botToDisplay.equipment.arm2 || null}
				arm3 = {botToDisplay && botToDisplay.equipment.arm3 || null}
				arm1Angle = {-30}
				arm1Angle = {45}
				arm1Angle = {-150}
				alternativeBotSize = {size}
				botColors = {botToDisplay && botToDisplay.colors || null}
        />
      </BotWrapper>
		</Wrapper>
  )
}
export default LoadingAnimation;

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
`

const BotWrapper = styled.div`
  height: ${(props) => `${props.size}px`};
  width: ${(props) => `${props.size}px`};
`;