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
import Pewpew from '../Arms/Pewpew';
import Poppop from '../Arms/Poppop';
import Powpow from '../Arms/Powpow';
import Bonkbonk from '../Arms/Bonkbonk';

// Popper
// bonkbonk
// bangbang
// boomboom

// Rattat
// Riggity
// Ziggity
// Vewvew
// Xewxew
// Zewzew
// Zipper
// Zapper



const Bot = ( { model, arm1, arm2, botColors, arm1Angle, arm2Angle, alternativeBotSize } ) => {
  const settings = useSelector((state) => state.settings);
	// console.log('model',model);
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
  function armsSelection(armsString, armNumber) {
    // This function assumes 2 is the maximum number of weapons a bot can carry
    switch(armsString) {
      case 'Pewpew' : {
        armNumber === 1 ? SelectedArm1 = Pewpew : SelectedArm2 = Pewpew;
      }
      break;
      case 'Poppop' : {
        armNumber === 1 ? SelectedArm1 = Poppop : SelectedArm2 = Poppop;
      }
      break;
      case 'Powpow' : {
        armNumber === 1 ? SelectedArm1 = Powpow : SelectedArm2 = Powpow;
      }
      break;
      case 'Bonkbonk' : {
        armNumber === 1 ? SelectedArm1 = Bonkbonk : SelectedArm2 = Bonkbonk;
      }
      break;
      default:{
      }
    }
  }
  armsSelection(arm1, 1);
  armsSelection(arm2, 2);

  return (
    <Wrapper
    cellSize = {alternativeBotSize || settings.cellSize}
    >
      <SelectedBot
      botColors = {botColors}
      cellSize = {alternativeBotSize || settings.cellSize}
      >
        <SelectedArm1
        botColors = {botColors}
        cellSize = {alternativeBotSize || settings.cellSize}
        armAngle = {arm1Angle}
        >

        </SelectedArm1>
        {SelectedArm2 &&
          <SelectedArm2
          botColors = {botColors}
          cellSize = {alternativeBotSize || settings.cellSize}
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