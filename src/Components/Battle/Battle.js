import React from 'react';
import { useSelector } from "react-redux";
import BattleGrid from './BattleGrid';
import GridPopulator from './GridPopulator';
import GameLogic from './GameLogic';
import styled from 'styled-components';

const Battle = ({ cellClicked, setCellClicked }) => {
	const battleInfo = useSelector((state) => state.battleInfo);
	const settings = useSelector((state) => state.settings);
	const [cellColors, setCellColors] = React.useState({});

  return (
    <Wrapper>
			<BattleGrid
			rows = {battleInfo.levelInfo.height}
			columns = {battleInfo.levelInfo.width}
			setCellClicked = {setCellClicked}
			cellClicked = {cellClicked}
			cellColors = {cellColors}
			/>
			<ShiftedWrapper
			rows = {battleInfo.levelInfo.height}
			columns = {battleInfo.levelInfo.width}
			cellSize = {settings.cellSize}
			>
				<GridPopulator
				objectsToBePlaced = {battleInfo.objectsToRender}
				>
				</GridPopulator>
			</ShiftedWrapper>
			<GameLogic/>
		</Wrapper>
  )
}

export default Battle;

const ShiftedWrapper = styled.div`
	position: relative;
	left: ${props => `-${props.cellSize*props.columns}px`};
	overflow: visible;
	pointer-events:none;
`
const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	overflow: auto;
	display : flex;
	flex-direction: row;
	justify-content: start;
	align-content: center;
	align-items: start;
	margin: 10px;
	animation: .5s ease-out 1 expandY;
`
