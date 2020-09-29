import React from 'react';
import { useSelector } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';
import styled from 'styled-components';
import { incrementerArrayGenerator } from '../../Constants/helperFunctions';

const BattleGrid = ({ rows, columns, setCellClicked, cellClicked, cellColors}) => {
	// const userInfo = useSelector((state) => state.userInfo);
	const settings = useSelector((state) => state.settings);
	const colors = useSelector(getThemeColors);

	// default size is 12 x 12
	if (!rows) rows = 12;
	if (!columns) columns = 12;
	const rowArray = incrementerArrayGenerator(rows);
	const colArray = incrementerArrayGenerator(columns);

  return (
    <Grid
		cellSize = {settings.cellSize}
		colors = {colors}
		rows = {rows+2}
		columns = {columns+2}
		// below was range before barriers were included
		// rows = {rows}
		// columns = {columns}
		>
			{colArray.map((col)=>(
				<CellWrapper key = {col}>
					{rowArray.map((row)=>{
						// console.log('making a cell')
						return (
							<Cell
							key = {`col${col} row${row}`}
							id = {`col${col} row${row}`}
							cellSize = {settings.cellSize}
							col = {col}
							row = {row}
							wallRow = {rows+1}
							wallColumn = {columns+1}
							cellClicked = {cellClicked}
							colors = {colors}
							onClick = {() => setCellClicked({col: col, row: row})}
							cellColors = {cellColors}
							borderDisabled = {settings.borderDisabled}
							/>
						)
					})}
				</CellWrapper>
			))}
    </Grid>
  )
}

export default BattleGrid;
const Grid = styled.div`
	display: grid;
	grid-gap: 0px;
	grid-template-rows: ${props => `repeat(${props.rows}, ${props.cellSize}px)`};
	grid-template-columns: ${props => `repeat(${props.columns}, ${props.cellSize}px)`};
`
const CellWrapper = styled.div`
	/* z-index:1; */
`
const Cell = styled.div`
	height: ${props => `${props.cellSize}px`};
	width: ${props => `${props.cellSize}px`};
	border: ${props => !props.borderDisabled && props.colors && `1px solid ${props.colors.textColor}`};
	background-image: ${props => props.colors && `radial-gradient(${props.colors.primary},${props.colors.secondary})`};
	background: ${props => props.row !== undefined && props.col !== undefined && props.cellColors !== undefined &&
	props.cellColors[`row${props.row}col${props.col}`] !== undefined ? props.cellColors[`row${props.row}col${props.col}`] :
	(props.row === 0 || props.col === 0 || props.row === props.wallRow || props.col === props.wallColumn) && 'rgba(80,24,24,.2)'};
	border-color: ${props => props.cellClicked && props.colors && props.cellClicked.row === props.row && props.cellClicked.col === props.col && props.colors.hoveredText};
	border-width: ${props => props.cellClicked && props.cellClicked.row === props.row && props.cellClicked.col === props.col && '4px'};
`