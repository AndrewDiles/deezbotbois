import React from 'react';
import styled from 'styled-components';
import { useSelector } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';

import Bot from "../Bots/Bot";

const Test = () => {
	const settings = useSelector((state) => state.settings);
	const colors = useSelector(getThemeColors);

  return (
    <Wrapper
		navLocation = {settings.navLocation}
		profileTab = {settings.profileTab}
		colors = {colors}
		className = 'centeredFlex'
		>
      {/* <BotTestWrapper
      size = {settings.cellSize}
      >
        <Bot
        model = 'BotBoxey'
        arm1 = 'Gun3'
        arm2 = {null}
        botColors = {null}
        arm1Angle = {null}
        arm2Angle = {null}
        />
      </BotTestWrapper> */}
      <BotTestWrapper
      size = {settings.cellSize}
      >
        <Bot
        model = 'BotLumpey'
        arm1 = 'Sword1'
        arm2 = {null}
        botColors = {null}
        arm1Angle = {111}
        arm2Angle = {null}
        />
      </BotTestWrapper>
      {/* <BotTestWrapper
      size = {settings.cellSize}
      >
        <Bot
        model = 'BotSpikey'
        arm1 = 'Hammer1'
        arm2 = {null}
        botColors = {null}
        arm1Angle = {null}
        arm2Angle = {null}
        />
      </BotTestWrapper> */}
      <BotTestWrapper
      size = {settings.cellSize}
      >
        <Bot
        model = 'BotBiggey'
        arm1 = 'Gun2'
        arm2 = 'Gun3'
        botColors = {null}
        arm1Angle = {180}
        arm2Angle = {45}
        />
      </BotTestWrapper>
      {/* <BotTestWrapper
      size = {settings.cellSize}
      >
        <Bot
        model = 'BotZippey'
        arm1 = 'Gun1'
        arm2 = {null}
        botColors = {null}
        arm1Angle = {180}
        arm2Angle = {45}
        />
      </BotTestWrapper>
      <BotTestWrapper
      size = {settings.cellSize}
      >
        <Bot
        model = 'BotJager'
        arm1 = 'Gun1'
        arm2 = {null}
        botColors = {null}
        arm1Angle = {180}
        arm2Angle = {45}
        />
      </BotTestWrapper> */}
      <BotTestWrapper
      size = {settings.cellSize}
      >
        <Bot
        model = 'BotRobbey'
        arm1 = 'Gun1'
        arm2 = 'Gun1'
        botColors = {null}
        arm1Angle = {180}
        arm2Angle = {45}
        />
      </BotTestWrapper>
			<BotTestWrapper>
				<LoadingAnimation size = '50'/>
			</BotTestWrapper>
		</Wrapper>
  )
}
export default Test;

const Wrapper = styled.div`
	padding: ${(props) =>
		props.navLocation === "top" ? 
			props.profileTab === 'active' && "0 140px 0 0"
			: props.profileTab === 'active' ? "0 140px 0 140px" : "0 140px 0 0"
			};
	transition: padding 0.5s ease-in-out;
	color: ${props => props.colors.textColor};
	width: 100%;
	height: 100%;
	/* display : flex;
	flex-direction: row;
	justify-content: center;
	align-content: center;
	align-items: center; */
	overflow: auto;
`

const BotTestWrapper = styled.div`
  height: ${(props) => `${props.size}px`};
  width: ${(props) => `${props.size}px`};
`;