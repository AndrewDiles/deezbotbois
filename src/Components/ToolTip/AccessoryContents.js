import React from 'react';
import styled from 'styled-components';
import { useSelector } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';


const AccessoryContents = ({ accessoryInfo }) => {
	const colors = useSelector(getThemeColors);
	return (
		<ToolTipContents
		color = {colors.hoveredText}
		>
			<Name>
				{accessoryInfo.name}
			</Name>
			<Potency>
				{accessoryInfo.potency}
			</Potency>
			<Description>
				{accessoryInfo.description}
			</Description>
			<Effect1Type>
				{Object.keys(accessoryInfo)[3]}
			</Effect1Type>
			<Effect1Value>
				{accessoryInfo[Object.keys(accessoryInfo)[3]]}
			</Effect1Value>
			<Effect2Type>
				{Object.keys(accessoryInfo)[4]}
			</Effect2Type>
			<Effect2Value>
				{accessoryInfo[Object.keys(accessoryInfo)[4]]}
			</Effect2Value>
		</ToolTipContents>
	)
}
export default AccessoryContents;

const ToolTipContents = styled.div`
	/* height: 100%; */
	color: ${props => props.color};
	height: 60px;
	width: 100%;
	font-size: 10px;
	display: grid;
	grid-template-columns: 45% 10% 45%;
  grid-template-rows: 30% 30% 20% 20%;
	padding: 2px;
`
const Potency = styled.div`
	font-size: 0.6em;
	font-weight: 200;
	grid-column-start: 3;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 1;
	align-self: start;
	justify-self: end;
`
const Name = styled.div`
	font-size: 1.1em;
	font-weight: 200;
	/* grid-column-start: 1;
  grid-column-end: 2;*/
  /* grid-row-start: 1; 
  grid-row-end: 1;  */
	grid-column: 2 / 2;
  grid-row: 1 / 1;
	align-self: center;
	justify-self: center;
	white-space: nowrap;
`
const Effect1Type = styled.div`
	font-size: 0.8em;
	font-weight: 200;
	grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 3;
  grid-row-end: 3;
	align-self: center;
	justify-self: center;
`
const Effect1Value = styled.div`
	font-size: 0.6em;
	grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 4;
  grid-row-end: 4;
	align-self: center;
	justify-self: center;
`
const Effect2Type = styled.div`
	font-size: 0.8em;
	font-weight: 200;
	grid-column-start: 3;
  grid-column-end: 3;
  grid-row-start: 3;
  grid-row-end: 3;
	align-self: center;
	justify-self: center;
`
const Effect2Value = styled.div`
	font-size: 0.6em;
	grid-column-start: 3;
  grid-column-end: 3;
  grid-row-start: 4;
  grid-row-end: 4;
	align-self: center;
	justify-self: center;
`
const Description = styled.div`
	font-size: 0.65em;
	/* grid-column-start: 2;
  grid-column-end: 2; */
	grid-column: 1 / last-line;
  grid-row-start: 2;
  grid-row-end: 2;
	align-self: center;
	justify-self: center;
	/* white-space: nowrap; */
`