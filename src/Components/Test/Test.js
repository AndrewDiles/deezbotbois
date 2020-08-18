import React from 'react';
import styled from 'styled-components';
import { useSelector } from "react-redux";

import Bot from "../Bots/Bot";

const Test = () => {
  const settings = useSelector((state) => state.settings);

  return (
    <>
      <BotTestWrapper
      size = {settings.cellSize}
      >
        <Bot
        model = 'BotBoxey'
        arm1 = 'Pewpew'
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
        arm1 = 'Pewpew'
        arm2 = {null}
        botColors = {null}
        arm1Angle = {90}
        arm2Angle = {null}
        />
      </BotTestWrapper>
      <BotTestWrapper
      size = {settings.cellSize}
      >
        <Bot
        model = 'BotBiggey'
        arm1 = 'Pewpew'
        arm2 = 'Pewpew'
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
    </>
  )
}
export default Test;

const BotTestWrapper = styled.div`
  height: ${(props) => `${props.size}px`};
  width: ${(props) => `${props.size}px`};
`;