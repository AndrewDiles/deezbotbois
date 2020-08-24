import React from 'react';
import styled from 'styled-components';
import { useSelector } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';

import Bot from "../Bots/Bot";

const Test = () => {
	const settings = useSelector((state) => state.settings);
	const colors = useSelector(getThemeColors);

  return (
    <Wrapper
		navLocation = {settings.navLocation}
		profileTab = {settings.profileTab}
		colors = {colors}
		>
      <BotTestWrapper
      size = {settings.cellSize}
      >
        <Bot
        model = 'BotBoxey'
        arm1 = 'Powpow'
        arm2 = {null}
        botColors = {null}
        arm1Angle = {null}
        arm2Angle = {null}
        />
      </BotTestWrapper>
      <BotTestWrapper
      size = {settings.cellSize}
      >
        <Bot
        model = 'BotLumpey'
        arm1 = 'Pewpew'
        arm2 = {null}
        botColors = {null}
        arm1Angle = {156}
        arm2Angle = {null}
        />
      </BotTestWrapper>
      <BotTestWrapper
      size = {settings.cellSize}
      >
        <Bot
        model = 'BotSpikey'
        arm1 = 'Bonkbonk'
        arm2 = {null}
        botColors = {null}
        arm1Angle = {null}
        arm2Angle = {null}
        />
      </BotTestWrapper>
      <BotTestWrapper
      size = {settings.cellSize}
      >
        <Bot
        model = 'BotBiggey'
        arm1 = 'Poppop'
        arm2 = 'Powpow'
        botColors = {null}
        arm1Angle = {180}
        arm2Angle = {45}
        />
      </BotTestWrapper>
      <BotTestWrapper
      size = {settings.cellSize}
      >
        <Bot
        model = 'BotZippey'
        arm1 = 'Pewpew'
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
        arm1 = 'Pewpew'
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
        model = 'BotRobbey'
        arm1 = 'Pewpew'
        arm2 = 'Pewpew'
        botColors = {null}
        arm1Angle = {180}
        arm2Angle = {45}
        />
      </BotTestWrapper>
		</Wrapper>
  )
}
export default Test;

const Wrapper = styled.div`
	margin: ${(props) =>
		props.navLocation === "top" ? 
			props.profileTab !== 'active' ? "50px 0 0 0" : "50px 135px 0 0"
			: props.profileTab !== 'active' ? "0 0 0 135px" : "0 0 0 270px"
			};
	color: ${props => props.colors.textColor};
	width: 100%;
	height: 100%;
	display : flex;
	flex-direction: row;
	justify-content: center;
	align-content: center;
	align-items: center;
`

const BotTestWrapper = styled.div`
  height: ${(props) => `${props.size}px`};
  width: ${(props) => `${props.size}px`};
`;