import React from 'react';
import styled from 'styled-components';
import Bot from "../Bots/Bot";
import { waspColors, lindyBColors, kermitColors, eliteColors, linenColors } from '../../Constants/colorSchemes';

const LoadingAnimation = ({size}) => {
	if (size === undefined) {
		size = 0;
	}

	const test1 = Math.random();
	let arm1 = 'Gun1';
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
	const test2 = Math.random();
	let model = 'BotBoxey';
	if (test2 < 0.12) {
		model = 'BotLumpey'
	} else if (test2 < 0.24) {
		model = 'BotSpikey'
	} else if (test2 < 0.36) {
		model = 'BotBiggey'
	} else if (test2 < 0.48) {
		model = 'BotZippey'
	} else if (test2 < 0.6) {
		model = 'BotJager'
	} else if (test2 < 0.72) {
		model = 'BotRobbey'
	} else {
		// this should not be needed
		model = 'BotBoxey'
	}
	const test3 = Math.random();
	let botColors = null;
	if (test3 < 0.15) {
		botColors = waspColors;
	} else if (test3 < 0.3) {
		botColors = lindyBColors;
	} else if (test3 < 0.45) {
		botColors = kermitColors;
	} else if (test3 < 0.6) {
		botColors = eliteColors;
	} else if (test3 < 0.75) {
		botColors = linenColors;
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
        model = {model}
        arm1 = {arm1}
        arm2 = {null}
        botColors = {botColors}
        arm1Angle = {-30}
				arm2Angle = {null}
				alternativeBotSize = {size}
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