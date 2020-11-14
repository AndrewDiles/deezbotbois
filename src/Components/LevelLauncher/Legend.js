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
			{levelInfo.friendlies.length > 0 && 
				<LegendEntry type = 'FRIENDLY'/>
			}
			{levelInfo.hostiles.length > 0 && 
				<LegendEntry type = 'HOSTILE'/>
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