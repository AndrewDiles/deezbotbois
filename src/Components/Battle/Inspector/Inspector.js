import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import { getThemeColors } from '../../../Redux/reducers/user-reducer';
import { verifyCellIsInBounds, findObjectOnCell } from '../../../Constants/helperFunctions';
import Wall from './BorderWall';

const Inspector = ({ viewing, cellClicked }) => {
	const battleInfo = useSelector((state) => state.battleInfo);
	const [hovering, setHovering] = useState(0);
	const [cellContents, setCellContents] = useState('borderWall');
	let colors = useSelector(getThemeColors);
	
	useEffect(()=>{
		if (!verifyCellIsInBounds(cellClicked, battleInfo.levelInfo.height, battleInfo.levelInfo.width)) {
			setCellContents('borderWall')
		} else {
			setCellContents(findObjectOnCell(cellClicked, battleInfo.objectsToRender))
		}
	},[cellClicked])

  return (
    <Wrapper className = 'startFlex col'>
			<Tab
			viewing = {viewing}
			colors = {colors}
			hovering = {hovering}
			/>
			<InspectorContainer
			viewing = {viewing}
			colors = {colors}
			hovering = {hovering}
			onMouseEnter = {()=>{setHovering(1)}}
			onMouseLeave = {()=>{setHovering(0)}}
			cellContents = {cellContents}
			>
				<h2>
					ROW: {cellClicked.row} COL: {cellClicked.col}
				</h2>
				<h3>
					THE SELECTED CELL CONTAINS:
				</h3>
				{cellContents === 'borderWall' ? (
					<Wall cellClicked = {cellClicked}/>
				):(
					cellContents === null ? (
						'NOTHING'
					):(
						'found something'
					)
				)}
			</InspectorContainer>
		</Wrapper>
  )
}

export default Inspector;
const InspectorContainer = styled.div`
	height: ${props => props.viewing === 'cell' ? props.cellContents ? '450px' : '100px' : '0px'};
	margin-top: ${props => props.viewing === 'cell' ? '0px' : '20px'};
	width: 300px;
	background-color: ${props => props.colors.primary};
	position: relative;
	top: -10px;
	left: -70px;
	z-index: 10;
	transition: height 0.5s ease-in-out;
	font-size: 0.5em;
	overflow-x: auto;
	border: ${props => props.viewing === 'cell' && `5px solid ${props.hovering ? props.colors.hoveredText : props.colors.secondary}`};
	border-radius: 5px;
	padding: 0 8px;
	>p{
		display: ${props => props.viewing !== 'cell' && 'none'};
		animation: 0.5s ease-out expandYHalfDelay;
	}
`
const Tab = styled.div`
	height: 20px;
	width: 20px;
	background-color: ${props => props.viewing === 'cell' && props.hovering ? props.colors.hoveredText : props.colors.secondary};
	transform: rotate(45deg);
	display: ${props => props.viewing !== 'cell' && 'none'};
	animation: 0.2s ease-out expandY;
	:hover {
		background-color: ${props => props.colors.hoveredText};
	}
`
const Wrapper = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: start;
	text-align: start;
	position: relative;
	top: 275px;
	left: -70px;
	width: 0px;
	height: 500px;
	overflow: visible;
`