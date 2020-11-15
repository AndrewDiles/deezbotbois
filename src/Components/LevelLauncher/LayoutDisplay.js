import React from 'react';
import { useSelector } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';
import styled from 'styled-components';
import testContents from '../../Constants/levels/searchForCellContents';

const LayoutDisplay = ({ levelInfo }) => {
	// const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	const colors = useSelector(getThemeColors);
	const [cells, setCells] = React.useState([]);

	React.useEffect(()=>{
		let newCells = [];
		for (let row = 1; row <= levelInfo.height; row++) {
			for (let col = 1; col <= levelInfo.width; col++) {
				const location = {row: row, col: col};
				newCells.push(location);
			}
		}
		setCells(newCells);
	},[levelInfo])

  return (
		<DisplayWrapper className = 'evenlyFlex'>
			<Grid
			levelInfo = {levelInfo}
			>
				{cells.map((cell)=>{
					return(
						<Cell
						key = {`r${cell.row}c${cell.col}`}
						colors = {colors}
						levelInfo = {levelInfo}
						contents = {testContents(cell,levelInfo)}
						/>
					)
				})}
			</Grid>
		</DisplayWrapper>
  )
}

export default LayoutDisplay;

const DisplayWrapper = styled.div`
	height: 250px;
	width: 100%;
	margin-bottom: 5px;
`
const Grid = styled.div`
	display: grid;
	width: 200px;
	height: 200px;
	grid-template-columns: ${props => `repeat(${props.levelInfo.width}, ${props.levelInfo.width > props.levelInfo.height ? `${200/props.levelInfo.width}px` : `${200/props.levelInfo.width}px`})`};
	grid-template-rows: ${props => `repeat(${props.levelInfo.height}, ${props.levelInfo.width > props.levelInfo.height ? `${200/props.levelInfo.width}px` : `${200/props.levelInfo.width}px`})`};
`
const Cell = styled.div`
	height: ${props => props.levelInfo.width > props.levelInfo.height ? `${200/props.levelInfo.width}px` : `${200/props.levelInfo.width}px`};
	width: ${props => props.levelInfo.width > props.levelInfo.height ? `${200/props.levelInfo.width}px` : `${200/props.levelInfo.width}px`};
	background-color: ${props => props.contents === 'hostile' ? 'red' : props.contents === 'friendly' ? 'lime' : props.contents === 'userBot' ? 'blue' : `${props.colors.primary}`};
	border: ${props => `1px solid ${props.colors.secondary}`};
`