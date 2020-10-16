import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';

import styled from 'styled-components';
import BattleGrid from '../Levels/BattleGrid';
import GridPopulator from '../Levels/GridPopulator';
import StyledButton from '../StyledButton/StyledButton';

// import {ic_grid_on} from 'react-icons-kit/md/ic_grid_on';
// import {ic_grid_off} from 'react-icons-kit/md/ic_grid_off'

import { 
	pathToCell,
	pathToAdjacentCell,
	// distanceToCell,
	// distanceToAdjacentToCell,
	nextStepGenerator,
	collisionVerification,
	// convertPxStringToNum,
	// convertNumToPxstring,
	translationGenerator,
	generateScanResults,
	illuminateScannedCells,
	filterScanResults
} from '../../Constants/helperFunctions';

import {
	toggleBorder
} from '../../Redux/actions';

const Test2 = () => {
	const dispatch = useDispatch();
	const settings = useSelector((state) => state.settings);
	const colors = useSelector(getThemeColors);
	const [cellClicked, setCellClicked] = React.useState({row: 1, col:1});
	let rows = 8;
	let columns = 12;
	const [cellColors, setCellColors] = React.useState({});
	const bot1Location = {col: 5, row:5};
	const bot2Location = {col: 4, row:7};
	const bot3Location = {col: 7, row:5};
	const startingPositions = [
		{
			type: 'Bot',
			location: bot1Location,
			model: 'BotRobbey',
      arm1: 'Gun1',
      arm2: 'Gun1',
      botColors: null,
      arm1Angle: 180,
			arm2Angle: 45,
			techTree: [],
			script: [],
			attributes: {
				ScanDistance: 3,
			},
			team: 1,
			events: []
		},
		{
			type: 'Bot',
			location: bot2Location,
			model: 'BotLumpey',
      arm1: 'Hammer1',
      botColors: null,
			arm1Angle: 180,
			techTree: [],
			script: [],
			attributes: {
				ScanDistance: 3,
			},
			team: 2,
			events: []
		},
		{
			type: 'Bot',
			location: bot3Location,
			model: 'BotZippey',
      arm1: 'Sword1',
      botColors: null,
			arm1Angle: -45,
			techTree: [],
			script: [],
			attributes: {
				ScanDistance: 3,
			},
			team: 2,
			events: []
		}
	];
	const [objectsToBePlaced, setObjectsToBePlaced] = React.useState(startingPositions)
	
	function handleMove (objectsArray, indexToBeMoved, locationToMoveTo, pathFunction) {
		let objectBeingMoved = objectsArray[indexToBeMoved];
		let currentLandingSpot = objectBeingMoved.location;
		const path = pathFunction(currentLandingSpot,locationToMoveTo);
		if (!path || path.length === 0) return;
		let pathObstructed = false;
		let nextStep;
		let pathToTake = [];
		let cellColorsObject = {};
		path.forEach((move)=>{
			if (!pathObstructed) {
				nextStep = nextStepGenerator(currentLandingSpot, move);
				pathObstructed = collisionVerification(nextStep, objectsArray, rows, columns)
				if (!pathObstructed) {
					currentLandingSpot = nextStep;
					pathToTake.push(move);
					cellColorsObject[`row${nextStep.row}col${nextStep.col}`] = 'rgba(0,255,0,0.5)';
				}
				else {
					cellColorsObject[`row${nextStep.row}col${nextStep.col}`] = 'rgba(255,0,0,0.5)';
				}
			}
		})
		if (settings.executionSpeed > 0) {
			const botToMove = document.getElementById(`placer${indexToBeMoved}`);
			if (botToMove) {
				if (pathObstructed) botToMove.style.transition = `transform ${settings.executionSpeed}s cubic-bezier(.75,.25,1,1.5)`;
				else botToMove.style.transition = `transform ${settings.executionSpeed}s cubic-bezier(.75,.25,.5,1)`;
				setCellColors(cellColorsObject);
			}

			setTimeout(()=>{
				const botToMove = document.getElementById(`placer${indexToBeMoved}`);
				if (botToMove) {
					botToMove.style.transform = translationGenerator(pathToTake,settings.cellSize);
				}
			},25)

			setTimeout(()=>{
				const botMoved = document.getElementById(`placer${indexToBeMoved}`);
				if (botMoved) {
					botMoved.style.transition = '0s';
				}

			},settings.executionSpeed*975)

			setTimeout(()=>{
				const botMoved = document.getElementById(`placer${indexToBeMoved}`);
				if (botMoved) {
					botMoved.style.transform = 'translate3d(0px,0px,0px)';
					let newObjectsPlacement = [...objectsToBePlaced];
					newObjectsPlacement[indexToBeMoved].location = currentLandingSpot;
					setObjectsToBePlaced(newObjectsPlacement);
					setCellColors({});
				}
			},settings.executionSpeed*1000)
		}
		else {
			let newObjectsPlacement = [...objectsToBePlaced];
			newObjectsPlacement[indexToBeMoved].location = currentLandingSpot;
			setObjectsToBePlaced(newObjectsPlacement);
		}
	}

	function handleScan (indexOfScanner, ScanDistance, maxRows, maxCols, objectsToBePlaced) {
		let scanResults = generateScanResults(indexOfScanner, ScanDistance, maxRows, maxCols, objectsToBePlaced);
		console.log({scanResults});

		illuminateScannedCells(scanResults,settings.executionSpeed, setCellColors);
		setTimeout(()=>{
			// potential memory leak
			setCellColors({});
		},settings.executionSpeed*1000)

		let filteredResults = filterScanResults(scanResults)
		console.log(filteredResults);
	}

  return (
    <Wrapper
		navLocation = {settings.navLocation}
		profileTab = {settings.profileTab}
		colors = {colors}
		>
			<ColDiv className = 'centeredFlex'>
			<StyledButton
			handleClick = {(e) => {setCellClicked({row: cellClicked.row-1, col: cellClicked.col})}}
			>
				ROW UP
			</StyledButton>
			<StyledButton
			handleClick = {(e) => {setCellClicked({row: cellClicked.row+1, col: cellClicked.col})}}
			>
				ROW DOWN
			</StyledButton>
			<StyledButton
			handleClick = {(e) => {setCellClicked({row: cellClicked.row, col: cellClicked.col+1})}}
			>
				COL RIGHT
			</StyledButton>
			<StyledButton
			handleClick = {(e) => {setCellClicked({row: cellClicked.row, col: cellClicked.col-1})}}
			>
				COL LEFT
			</StyledButton>
			<StyledButton
			handleClick = {(e) => {handleMove(objectsToBePlaced,0,cellClicked, pathToAdjacentCell)}}
			>
				Move ADJ
			</StyledButton>
			<StyledButton
			handleClick = {(e) => {handleMove(objectsToBePlaced,0,cellClicked, pathToCell)}}
			>
				Move ONTO
			</StyledButton>
			<StyledButton
			handleClick = {(e) => {dispatch(toggleBorder())}}
			>
				TOGGLE BORDER
			</StyledButton>
			<StyledButton
			handleClick = {(e) => {handleScan(0, objectsToBePlaced[0].attributes.ScanDistance, rows, columns, objectsToBePlaced)}}
			// /(indexOfScanner, ScanDistance, maxRows, maxCols, objectsToBePlaced) {
			>
				PERFORM SCAN
			</StyledButton>
			</ColDiv>
			<BattleGrid
			rows = {rows}
			columns = {columns}
			setCellClicked = {setCellClicked}
			cellClicked = {cellClicked}
			cellColors = {cellColors}
			/>
			<ShiftedWrapper
			rows = {rows}
			columns = {columns}
			cellSize = {settings.cellSize}
			>
				<GridPopulator
				objectsToBePlaced = {objectsToBePlaced}
				>
				</GridPopulator>
			</ShiftedWrapper>
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
`
const ShiftedWrapper = styled.div`
	/* height: ${props => `${props.cellSize*props.rows}px`};
	width: ${props => `${props.cellSize*props.columns}px`}; */
	position: relative;
	left: ${props => `-${props.cellSize*props.columns}px`};
	overflow: visible;
	pointer-events:none;
`

const ColDiv = styled.div`
	flex-direction: column;
`