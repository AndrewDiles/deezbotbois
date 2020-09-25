import React from 'react';

import { useSelector } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';
import styled from 'styled-components';
import BattleGrid from '../Levels/BattleGrid';
import GridPopulator from '../Levels/GridPopulator';
import StyledButton from '../StyledButton/StyledButton'

import { 
	pathToCell,
	pathToAdjacentCell,
	distanceToCell,
	distanceToAdjacentToCell,
	nextStepGenerator,
	collisionVerification,
	convertPxStringToNum,
	convertNumToPxstring,
	translationGenerator
} from '../../Constants/helperFunctions';

const Test2 = () => {
	const settings = useSelector((state) => state.settings);
	const colors = useSelector(getThemeColors);
	const [cellClicked, setCellClicked] = React.useState({row: 1, col:1});
	let rows = 8;
	let columns = 12;
	const [cellColors, setCellColors] = React.useState({});
	const bot1Location = {col: 5, row:5};
	const bot2Location = {col: 4, row:7};
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
			script: {},
			attributes: {},
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
			script: {},
			attributes: {},
			events: []
		}
	];
	const [objectsToBePlaced, setObjectsToBePlaced] = React.useState(startingPositions)
	

	// console.log('cellClicked',cellClicked);
	// console.log('pathToCell',pathToCell(bot1Location,cellClicked));
	// console.log('distanceToCell', distanceToCell(bot1Location,cellClicked));
	// console.log('pathToAdjacentCell',pathToAdjacentCell(bot1Location,cellClicked));
	// console.log('distanceToAdjacentToCell', distanceToAdjacentToCell(bot1Location,cellClicked));

	function handleMoveAdj (objectsArray, indexToBeMoved, locationToMoveTo) {
		let objectBeingMoved = objectsArray[indexToBeMoved];
		let currentLandingSpot = objectBeingMoved.location;
		// console.log({currentLandingSpot},{locationToMoveTo});
		const path = pathToAdjacentCell(currentLandingSpot,locationToMoveTo);
		// console.log({path});
		if (!path || path.length === 0) return;
		let pathObstructed = false;
		let nextStep;
		let pathToTake = [];
		let cellColorsObject = {};
		path.forEach((move)=>{
			if (!pathObstructed) {
				
				nextStep = nextStepGenerator(currentLandingSpot, move);

				console.log({nextStep})

				pathObstructed = collisionVerification(nextStep, objectsArray)

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
		// console.log({pathObstructed}, {currentLandingSpot})
		const botToMove = document.getElementById(`placer${indexToBeMoved}`);
		if (botToMove) {
			botToMove.style.transition = `transform ${settings.executionSpeed}s cubic-bezier(.8,.15,.65,.9)`;
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



	function handleMoveOnto (objectsArray, indexToBeMoved, locationToMoveTo) {
		let objectBeingMoved = objectsArray[indexToBeMoved];
		let currentLandingSpot = objectBeingMoved.location;
		const path = pathToCell(currentLandingSpot,locationToMoveTo);
		console.log({path});
		if (!path || path.length === 0) return;
		let pathObstructed = false;
		let nextStep;
		path.forEach((move)=>{
			if (!pathObstructed) {
				nextStep = nextStepGenerator(currentLandingSpot, move);
				pathObstructed = collisionVerification(nextStep, objectsArray)
				if (!pathObstructed) currentLandingSpot = nextStep;
			}
		})
		console.log({pathObstructed})
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
				COL LEFT
			</StyledButton>
			<StyledButton
			handleClick = {(e) => {setCellClicked({row: cellClicked.row, col: cellClicked.col-1})}}
			>
				COL RIGHT
			</StyledButton>
			<StyledButton
			handleClick = {(e) => {handleMoveAdj(objectsToBePlaced,0,cellClicked)}}
			>
				Move ADJ
			</StyledButton>
			<StyledButton
			handleClick = {(e) => {handleMoveOnto(objectsToBePlaced,0,cellClicked)}}
			>
				Move ONTO
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