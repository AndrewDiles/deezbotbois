import React from 'react';

import { useSelector } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';
import styled from 'styled-components';
import BattleGrid from '../Levels/BattleGrid';
import ObjectPlacer from '../Levels/ObjectPlacer';
import Bot from "../Bots/Bot";

import { pathToCell, pathToAdjacentCell } from '../../Constants/helperFunctions';

const Test2 = () => {
	const settings = useSelector((state) => state.settings);
	const colors = useSelector(getThemeColors);
	const [cellClicked, setCellClicked] = React.useState(null)
	let botLocation = {col: 5, row:5};

	console.log('cellClicked',cellClicked)
	// console.log('pathToCell',pathToCell(botLocation,cellClicked))
	console.log('pathToAdjacentCell',pathToAdjacentCell(botLocation,cellClicked));
  return (
    <Wrapper
		navLocation = {settings.navLocation}
		profileTab = {settings.profileTab}
		colors = {colors}
		>
			<NoSizedContainer>
				<BattleGrid
				rows = {9}
				columns = {10}
				setCellClicked = {setCellClicked}
				cellClicked = {cellClicked}
				/>
			</NoSizedContainer>
			<NoSizedContainer>
				<ObjectPlacer
				location = {botLocation}
				>
				<Bot
        model = 'BotRobbey'
        arm1 = 'Gun1'
        arm2 = 'Gun1'
        botColors = {null}
        arm1Angle = {180}
        arm2Angle = {45}
        />
				</ObjectPlacer>
			</NoSizedContainer>
    </Wrapper>
  )
}
export default Test2;

const Wrapper = styled.div`
	padding: ${(props) =>
		props.navLocation === "top" ? 
			props.profileTab === 'active' && "0 140px 0 0"
			: props.profileTab === 'active' ? "0 140px 0 140px" : "0 140px 0 0"
			};
	color: ${props => props.colors.textColor};
	width: 100%;
	height: 100%;
	overflow: auto;
	display : flex;
	flex-direction: row;
	justify-content: start;
	align-content: center;
	align-items: start;
	margin: 10px;
	/* flex-wrap: none;
	overflow: auto; */
`

const NoSizedContainer = styled.div`
	height: 0;
	width: 0;
	/* overflow: auto; */
`