import React from 'react';
import { useSelector } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';
import styled from 'styled-components';

const AttackShape = ({ shape, cellSize }) => {
	const colors = useSelector(getThemeColors);
	return (
		<Wrapper
		cellSize = {cellSize}
		color = {colors.secondary}
		>
			{shape.map((cell, index)=>(
				<Cell
				key = {index}
				color = {cell || colors.primary}
				cellSize = {cellSize}
				/>
			))}
		
		</Wrapper>
	)
}
export default AttackShape;

const Wrapper = styled.div`
	height: ${props => props.cellSize && `${5+8*props.cellSize}px`};
	width: ${props => props.cellSize && `${5+8*props.cellSize}px`};
	display: grid;
	grid-gap: 1px;
	background-color: ${props => props.color ? props.color : 'rgba(0,0,0,0.1)'};
	grid-template-columns: repeat(6, 1fr);
	grid-template-rows: repeat(6, 1fr);
`
const Cell = styled.div`
	height: 100%;
	width: 100%;
	background-color: ${props => props.color ? props.color : 'rgba(0,0,0,0.1)'};
`