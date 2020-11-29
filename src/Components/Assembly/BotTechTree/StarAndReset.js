import React from 'react';
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import { resetTechTree } from '../../../Redux/actions';
import Star from '../../Star/Star';
import StyledButton from '../../StyledButton/StyledButton';
const StarAndReset = ({starInfo, botNumberSelected}) => {
	const dispatch = useDispatch();
	const handleClick = () => {
		dispatch(resetTechTree(botNumberSelected))
	}
  return (
		<Wrapper>
			<RowDiv
			className = 'centeredFlex'
			>
				<ColDiv
				className = 'centeredFlex'
				>
					{starInfo.availableGold} / {starInfo.maxGold}
					<Star 
					color = 'gold'
					size = {25}
					/>
				</ColDiv>
			</RowDiv>
			<RowDiv
			className = 'centeredFlex'
			>
				<ColDiv
				className = 'centeredFlex'
				>
					{starInfo.availableBlue} / {starInfo.maxBlue}
					<Star
					color = 'blue'
					size = {25}
					/>
				</ColDiv>
			</RowDiv>
			<RowDiv>
				<StyledButton
				width = '75'
				fontSize = '12'
				handleClick = {handleClick}
				sfx = 'toggle'
				>
					RESET
				</StyledButton>
			</RowDiv>
		</Wrapper>
  )
}
export default StarAndReset;

const Wrapper = styled.div`
	height: 60px;
	width: 100%;
	padding: 5px;
	display: flex;
	flex-direction: row;
	align-items: center;
	text-align: center;
	justify-content: space-between;
`
const RowDiv = styled.div`
	flex-direction: row;
`
const ColDiv = styled.div`
	flex-direction: column;
	font-size: 8px;
`