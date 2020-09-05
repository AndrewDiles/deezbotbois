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
import Gun1 from '../Arms/Gun1';
import Gun2 from '../Arms/Gun2';
import Gun3 from '../Arms/Gun3';
import Hammer1 from '../Arms/Hammer1';

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



const Bot = ( { model, arm1, arm2, botColors, arm1Angle, arm2Angle, alternativeBotSize, faded } ) => {
  const settings = useSelector((state) => state.settings);
	if (!model) {
		return (
			<NoBot 
			cellSize = {alternativeBotSize || settings.cellSize}
			/>
		)
	}
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

  let SelectedArm1, SelectedArm2, SelectedArm3 = null;
  function armsSelection(armsString, armNumber) {
    // This function assumes 2 is the maximum number of weapons a bot can carry
    switch(armsString) {
      case 'Gun1' : {
        armNumber === 1 ? SelectedArm1 = Gun1 : armNumber === 2 ? SelectedArm2 = Gun1 : SelectedArm3 = Gun1;
      }
      break;
      case 'Gun2' : {
        armNumber === 1 ? SelectedArm1 = Gun2 : armNumber === 2 ? SelectedArm2 = Gun2 : SelectedArm3 = Gun2;
      }
      break;
      case 'Gun3' : {
        armNumber === 1 ? SelectedArm1 = Gun3 : armNumber === 2 ? SelectedArm2 = Gun3 : SelectedArm3 = Gun3;
      }
      break;
      case 'Hammer1' : {
        armNumber === 1 ? SelectedArm1 = Hammer1 : armNumber === 2 ? SelectedArm2 = Hammer1 : SelectedArm3 = Hammer1;
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
		faded = {faded}
    >
      <SelectedBot
      botColors = {botColors}
      cellSize = {alternativeBotSize || settings.cellSize}
      >
				{SelectedArm1 &&  
					<SelectedArm1
					botColors = {botColors}
					cellSize = {alternativeBotSize || settings.cellSize}
					armAngle = {arm1Angle}
					/>
				}
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
	opacity: ${props => props.faded === true && 0.5};
`
const NoBot = styled.div`
	height: ${props => `${props.cellSize}px`};
  width: ${props => `${props.cellSize}px`};
	background: rgba(0,0,0,0.2);
`