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
		rows = {rows}
		columns = {columns}
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
	background: ${props => props.row && props.col && props.cellColors && props.cellColors[`row${props.row}col${props.col}`] && props.cellColors[`row${props.row}col${props.col}`]};
	/* background: rgba(0,255,0,0.5);
	background: rgba(255,0,0,0.5); */
	border-color: ${props => props.cellClicked && props.colors && props.cellClicked.row === props.row && props.cellClicked.col === props.col && props.colors.hoveredText};
	border-width: ${props => props.cellClicked && props.cellClicked.row === props.row && props.cellClicked.col === props.col && '4px'};
`