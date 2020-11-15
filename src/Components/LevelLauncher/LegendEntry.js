import React from 'react';
import { useSelector } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';
import styled from 'styled-components';
import LegendEntry from './LegendEntry';

const Legend = ({ type }) => {
	const colors = useSelector(getThemeColors);

  return (
		<EntryWrapper className = 'centeredFlex'>
			<ColoredCell
			type = {type}
			/>
			<Description>
				= {type}
			</Description>
		</EntryWrapper>
  )
}

export default Legend;
const Description = styled.div`
	width: 160px;
	margin-left: 15px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	text-align: center;
	/* font-size: 1.6em; */
`
const EntryWrapper = styled.div`
	height: 30px;
	width: 100%;
	font-size: 1em;
`
const ColoredCell = styled.div`
	height: 20px;
	width : 20px;
	background-color: ${props => props.type === 'YOUR BOT' ? 'blue' : props.type === 'FRIENDLY' ? 'lime' : 'red'};
`