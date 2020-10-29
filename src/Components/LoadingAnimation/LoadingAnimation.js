import React from 'react';
import styled from 'styled-components';

import Bot from "../Bots/Bot";

const LoadingAnimation = () => {
	const [size, setSize] = React.useState(1);

	React.useEffect(()=>{
		let wrapper = document.getElementById('loadingWrapper');
		console.log(wrapper);
		console.log(wrapper.getBoundingClientRect());
		// getBoundingClientRect()
	},[])

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

  return (
    <Wrapper className = 'centeredFlex' id = 'loadingWrapper'>
      <BotTestWrapper
      size = {size}
      >
        <Bot
        model = {model}
        arm1 = {arm1}
        arm2 = {null}
        botColors = {null}
        arm1Angle = {-30}
				arm2Angle = {null}
				alternativeBotSize = {size}
        />
      </BotTestWrapper>
		</Wrapper>
  )
}
export default LoadingAnimation;

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
`

const BotTestWrapper = styled.div`
  height: ${(props) => `${props.size}px`};
  width: ${(props) => `${props.size}px`};
`;