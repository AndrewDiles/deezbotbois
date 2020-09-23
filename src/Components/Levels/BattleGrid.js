import React from 'react';
import { useSelector } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';
import styled from 'styled-components';
import { incrementerArrayGenerator } from '../../Constants/helperFunctions';

const BattleGrid = ({ rows, columns, setCellClicked, cellClicked}) => {
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
			{rowArray.map((row)=>(
				<>
					{colArray.map((col)=>{
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
							/>
						)
					})}
				</>
			))}
    </Grid>
  )
}


// {shape.map((cell, index)=>(
// 	<Cell
// 	key = {index}
// 	color = {cell || colors.primary}
// 	cellSize = {cellSize}
// 	/>
// ))}

export default BattleGrid;

const Grid = styled.div`
	display: grid;
	grid-gap: 0px;
	/* grid-template-columns: ${props => `repeat(${props.columns}, minmax(${props.cellSize}px, auto)`};
	grid-template-rows: ${props => `repeat(${props.rows}, minmax(${props.cellSize}px, auto)`}; */
	/* grid-template-columns: ${props => `repeat(${props.columns}, minmax(${props.cellSize}px, auto))`};
	grid-template-rows: ${props => `repeat(${props.rows}, minmax(${props.cellSize}px, auto))`}; */
	grid-template-columns: ${props => `repeat(${props.columns}, minmax(${props.cellSize}px, 1fr))`};
	grid-template-rows: ${props => `repeat(${props.rows}, minmax(${props.cellSize}px, 1fr))`};
	/* grid-template-columns: repeat(8, minmax(75px, 1fr));
	grid-template-rows: repeat(8, minmax(75px, 1fr)); */
	/* grid-template-columns: ${props => `repeat(${props.columns}, minmax(${props.cellSize}px, ${100/props.columns}vw))`};
	grid-template-columns: ${props => `repeat(${props.columns}, minmax(${props.cellSize}px, ${100/props.rows}vh))`}; */
	/* grid-template-rows: ${props => `repeat(${props.rows}, ${props.cellSize}px)`};
	grid-template-columns: ${props => `repeat(${props.columns}, ${props.cellSize}px)`}; */
	/* overflow: auto; */
`
const Cell = styled.div`
	height: ${props => `${props.cellSize}px`};
	width: ${props => `${props.cellSize}px`};
	border: ${props => props.colors && `1px solid ${props.colors.secondary}`};
	/* background-color: purple; */
	background-image: ${props => props.colors && `radial-gradient(${props.colors.primary},${props.colors.secondary})`};
	border-color: ${props => props.cellClicked && props.cellClicked.row === props.row && props.cellClicked.col === props.col && 'orange'};
`