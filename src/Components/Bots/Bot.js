import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';

import {defaultBotColors} from '../../Constants/colorSchemes';

// bot imports:
import BotBoxey from './BotBoxey';
import BotLumpey from './BotLumpey';
import BotSpikey from './BotSpikey';
import BotBiggey from './BotBiggey';
import BotZippey from './BotZippey';
import BotJager from './BotJager';
import BotRobbey from './BotRobbey';

// arms imports:
import Pewpew from '../Arms/Pewpew/Pewpew';



const Bot = ( { model, arm1, arm2, botColors, arm1Angle, arm2Angle } ) => {
  const settings = useSelector((state) => state.settings);

  if (!botColors) botColors = defaultBotColors;

  let SelectedBot = null;
  switch(model) {
    case 'BotBoxey' : {
      SelectedBot = BotBoxey
    }
    break;
    case 'BotLumpey' : {
      SelectedBot = BotLumpey;
    }
    break;
    case 'BotSpikey' : {
      SelectedBot = BotSpikey;
    }
    break;
    case 'BotBiggey' : {
      SelectedBot = BotBiggey;
    }
    break;
    case 'BotZippey' : {
      SelectedBot = BotZippey;
    }
    break;
    case 'BotJager' : {
      SelectedBot = BotJager;
    }
    break;
    case 'BotRobbey' : {
      SelectedBot = BotRobbey;
    }
    break;
    default:{
    }
  }

  let SelectedArm1, SelectedArm2 = null;
  switch(arm1) {
    case 'Pewpew' : {
      SelectedArm1 = Pewpew;
    }
    break;
    default:{
    }
  }
  switch(arm2) {
    case 'Pewpew' : {
      SelectedArm2 = Pewpew;
    }
    break;
    default:{
    }
  }

  return (
    <Wrapper
    cellSize = {settings.cellSize}
    >
      <SelectedBot
      botColors = {botColors}
      cellSize = {settings.cellSize}
      >
        <SelectedArm1
        botColors = {botColors}
        cellSize = {settings.cellSize}
        armAngle = {arm1Angle}
        >

        </SelectedArm1>
        {SelectedArm2 &&
          <SelectedArm2
          botColors = {botColors}
          cellSize = {settings.cellSize}
          armAngle = {arm2Angle}
          >
          </SelectedArm2>
        }
      </SelectedBot>
    </Wrapper>
      )
}
export default Bot;
const Wrapper = styled.div`
  height: ${props => `${props.cellSize}px`};
  width: ${props => `${props.cellSize}px`};
`