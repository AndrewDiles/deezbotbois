import React from 'react';
import { useSelector } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';
import styled from 'styled-components';
import LegendEntry from './LegendEntry';

const Legend = ({ levelInfo }) => {
	const colors = useSelector(getThemeColors);

  return (
		<DisplayWrapper className = 'centeredFlex'>
			{levelInfo.userBots.length > 0 && 
				<LegendEntry type = 'YOUR BOT'/>
			}
			{levelInfo.friendly.length > 0 && 
				<LegendEntry type = 'FRIENDLY'/>
			}
			{levelInfo.hostile.length > 0 &&
				<LegendEntry type = {levelInfo.hostile2.length === 0 ? 'HOSTILE' : 'HOSTILE T1'}/>
			}
			{levelInfo.hostile2.length > 0 &&
				<LegendEntry type = 'HOSTILE T2'/>
			}
			{levelInfo.hostile3.length > 0 &&
				<LegendEntry type = 'HOSTILE T3'/>
			}
		</DisplayWrapper>
  )
}

export default Legend;

const DisplayWrapper = styled.div`
	height: 100px;
	width: 100%;
	padding: 5px;
	flex-direction: column;
`