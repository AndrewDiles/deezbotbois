import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { getThemeColors } from '../../../Redux/reducers/user-reducer';
import styled from 'styled-components';
import StyledIcon from '../../StyledIcon/StyledIcon';
import StyledCheckbox from '../../StyledCheckbox/StyledCheckbox';

const Records = ({ open}) => {
	const battleInfo = useSelector((state) => state.battleInfo);
	const userInfo = useSelector((state) => state.userInfo);
	const colors = useSelector(getThemeColors);

  return (
    <Wrapper
		className = 'startFlex col'
		open = {open}
		>
			<h2>
				RECORDS AND ACHIEVEMENTS
			</h2>
			<Row
			bottomBar = {true}
			colors = {colors}
			>
				<br/>
				<P
				size = {7}
				>
					CURRENT
				</P>
				<P
				size = {7}
				>
					BEST
				</P>
			</Row>
			<Row>
				<p>
					TICK #
				</p>
				<Highlightable
				colors = {colors}
				best = {userInfo.levelProgress[battleInfo.levelInfo.levelNumber] ? userInfo.levelProgress[battleInfo.levelInfo.levelNumber][0].minTicks >= battleInfo.tick : true}
				>
					{battleInfo.tick}
				</Highlightable>
				<Highlightable
				colors = {colors}
				best = {userInfo.levelProgress[battleInfo.levelInfo.levelNumber] ? userInfo.levelProgress[battleInfo.levelInfo.levelNumber][0].minTicks <= battleInfo.tick : false}
				>
					{userInfo.levelProgress[battleInfo.levelInfo.levelNumber] ? userInfo.levelProgress[battleInfo.levelInfo.levelNumber][0].minTicks : 'N/A'}
				</Highlightable>
			</Row>
			<Row>
				<p>
					DAMAGE TAKEN
				</p>
				<Highlightable
				colors = {colors}
				best = {userInfo.levelProgress[battleInfo.levelInfo.levelNumber] ? userInfo.levelProgress[battleInfo.levelInfo.levelNumber][0].minDamageTaken >= battleInfo.recordTracker.totalDamageTaken : true}
				>
					{battleInfo.recordTracker.totalDamageTaken}
				</Highlightable>
				<Highlightable
				colors = {colors}
				best = {userInfo.levelProgress[battleInfo.levelInfo.levelNumber] ? userInfo.levelProgress[battleInfo.levelInfo.levelNumber][0].minDamageTaken <= battleInfo.recordTracker.totalDamageTaken : false}
				>
					{userInfo.levelProgress[battleInfo.levelInfo.levelNumber] ? userInfo.levelProgress[battleInfo.levelInfo.levelNumber][0].minDamageTaken : 'N/A'}
				</Highlightable>
			</Row>
			<Row>
				<p>
					DAMAGE DEALT
				</p>
				<Highlightable
				colors = {colors}
				best = {userInfo.levelProgress[battleInfo.levelInfo.levelNumber] ? userInfo.levelProgress[battleInfo.levelInfo.levelNumber][0].maxDamageDealt <= battleInfo.recordTracker.totalDamageDealt : true}
				>
					{battleInfo.recordTracker.totalDamageTaken}
				</Highlightable>
				<Highlightable
				colors = {colors}
				best = {userInfo.levelProgress[battleInfo.levelInfo.levelNumber] ? userInfo.levelProgress[battleInfo.levelInfo.levelNumber][0].maxDamageDealt >= battleInfo.recordTracker.totalDamageDealt : false}
				>
					{userInfo.levelProgress[battleInfo.levelInfo.levelNumber] ? userInfo.levelProgress[battleInfo.levelInfo.levelNumber][0].maxDamageDealt : 'N/A'}
				</Highlightable>
			</Row>
		</Wrapper>
  )
}

export default Records;

const Wrapper = styled.div`
	width: 100%;
	margin-top: ${props => props.open ? '15px' : '75px'};
	transition: margin-top 0.5s ease-in-out;
`
const Row = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: 126px 1fr 1fr 1fr;
	border-bottom: ${props => props.bottomBar && `2px dashed ${props.colors.textColor}`};
`
const Highlightable = styled.p`
	color: ${props => props.best ? props.colors.hoveredText : props.colors.textColor};
`
const P = styled.p`
	font-size: ${props => `${props.size}px`};
`