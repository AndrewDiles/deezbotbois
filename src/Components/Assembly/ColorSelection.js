import React from 'react';

import { useSelector, useDispatch } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';
import styled from 'styled-components';
import {
	changeBotColorX,
} from '../../Redux/actions';

const ColorSelection = ({ botNumberSelected }) => {
	const userInfo = useSelector((state) => state.userInfo);
	const dispatch = useDispatch();
	const [colorOptionDisplaying, setColorOptionDisplaying] = React.useState(null);
	let colors = useSelector(getThemeColors);

	React.useEffect(()=>{
		setColorOptionDisplaying(null)
	},[botNumberSelected])

	const handleClickColorSquare = (colorLocation) => {
		if (colorOptionDisplaying === colorLocation) {
			setColorOptionDisplaying(null)
		}
		else {
			setColorOptionDisplaying(colorLocation)
		}
	}
	// console.log(userInfo.availableBotColors);
	// console.log('colorOptionDisplaying',colorOptionDisplaying);

  return (
		<Wrapper>
			<ColDiv
			className = 'centeredFlex'
			>
		{Object.keys(userInfo.botBuilds[botNumberSelected].colors).map((colorLocation)=>{
			return (
				<LocationOption
				key = {colorLocation}
				>
					{colorLocation}
						<RowDiv
						className = 'centeredFlex'
						>
							<ColorSquare
							onClick = {e=>{handleClickColorSquare(colorLocation)}}
							color = {userInfo.botBuilds[botNumberSelected].colors[colorLocation]}
							colors = {colors}
							selected = {colorOptionDisplaying === colorLocation}
							/>
							<RotatedSquare
							color = {userInfo.botBuilds[botNumberSelected].colors[colorLocation]}
							opacity = {colorOptionDisplaying === colorLocation ? 1 : 0}
							/>
						</RowDiv>
						
				</LocationOption>
			)
		})}
		</ColDiv>
		<ColorOptions
			className = {'colorOptions'}
			botNumberSelected = {botNumberSelected}
			colorLocation = {colorOptionDisplaying}
			display = {colorOptionDisplaying !== null ? 'flex' : 'none'}
			backgroundColor = {colors.secondary}
			borderColor = {userInfo.botBuilds[botNumberSelected].colors[colorOptionDisplaying]}
			>
				{colorOptionDisplaying && userInfo.availableBotColors[colorOptionDisplaying].map((colorOption)=>{
					return(
						<ColorSquare
						key = {colorOption}
						colors = {colors}
						// {e=>{handleClickColorSquare(colorLocation)}}
						onClick = {e=>{dispatch(changeBotColorX(botNumberSelected,colorOptionDisplaying,colorOption))}}
						color = {colorOption}
						selected = {userInfo.botBuilds[botNumberSelected].colors[colorOptionDisplaying] === colorOption}
						/>
						// <div>
						// 	option
						// </div>
					)
				})}
			</ColorOptions>
		</Wrapper>
  )
}
export default ColorSelection;

const LocationOption = styled.div`
	width: 211px;
	font-size: 0.75em;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	text-align: center;
	/* position: relative;
	left: -25px; */
`

const ColorSquare = styled.div`
	height: 25px;
	width: 25px;
	background-color: ${props => props.color};
	/* object-fit: none; */
	flex-shrink: 0;
	border: ${props => props.selected ? `3px solid ${props.color}` : `3px solid ${props.colors.secondary}`};
	&:hover {
		cursor: ${props => props.selected ? 'not-allowed' : 'pointer'};
	}
`
const ColorOptions = styled.div`
	
	display: ${props => props.display};
	background-color: ${props => props.backgroundColor};
	border: 2px solid ${props => props.borderColor};
	/* overflow-y: auto; */
	overflow-y: scroll;
	/* overflow: scroll; */
`
const RowDiv = styled.div`
	flex-direction: row;
`
const ColDiv = styled.div`
	flex-direction: column;
`
const RotatedSquare = styled.div`
	height: 15px;
	width: 15px;
	transform: rotate(45deg);
	opacity: ${props => props.opacity};
	background-color: ${props => props.color};
	position: relative;
	left: -10px;
	pointer-events: none;
`
const Wrapper = styled.div`
	width: 100%;
	height: 225px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	text-align: center;
	padding: 2px;
`