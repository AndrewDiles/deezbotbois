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
	convertNumToPxstring
} from '../../Constants/helperFunctions';

const Test2 = () => {
	const settings = useSelector((state) => state.settings);
	const colors = useSelector(getThemeColors);
	const [cellClicked, setCellClicked] = React.useState(null)
	let rows = 9;
	let columns = 10
	let bot1Location = {col: 5, row:5};
	let bot2Location = {col: 4, row:7};

	let objectsToBePlaced = [
		{
			type: 'Bot',
			location: bot1Location,
			model: 'BotRobbey',
      arm1: 'Gun1',
      arm2: 'Gun1',
      botColors: null,
      arm1Angle: 180,
      arm2Angle: 45,
		},
		{
			type: 'Bot',
			location: bot2Location,
			model: 'BotLumpey',
      arm1: 'Hammer1',
      botColors: null,
      arm1Angle: 180,
		}
	]

	// console.log('cellClicked',cellClicked);
	// console.log('pathToCell',pathToCell(bot1Location,cellClicked));
	// console.log('distanceToCell', distanceToCell(bot1Location,cellClicked));
	// console.log('pathToAdjacentCell',pathToAdjacentCell(bot1Location,cellClicked));
	// console.log('distanceToAdjacentToCell', distanceToAdjacentToCell(bot1Location,cellClicked));

	function handleMoveAdj (objectsArray, indexToBeMoved, locationToMoveTo) {
		let objectBeingMoved = objectsArray[indexToBeMoved];
		let currentLandingSpot = objectBeingMoved.location;
		const path = pathToAdjacentCell(currentLandingSpot,locationToMoveTo);
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
	/* flex-wrap: none;
	overflow: auto; */
`
const ShiftedWrapper = styled.div`
	height: ${props => `${props.cellSize*props.rows}px`};
	width: ${props => `${props.cellSize*props.columns}px`};
	position: relative;
	left: ${props => `-${props.cellSize*props.columns}px`};
`

const ColDiv = styled.div`
	flex-direction: column;
`