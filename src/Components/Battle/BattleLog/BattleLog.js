import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { getThemeColors } from '../../../Redux/reducers/user-reducer';
import styled from 'styled-components';
import Filters from './Filters';
const baseFilters = {
	open: 0,
	newTick: 1,
	phaseChange: 1,
	attributeChange: 1,
	
}

const BattleLog = ({ viewing }) => {
	const battleInfo = useSelector((state) => state.battleInfo);
	const [hovering, setHovering] = useState(0);
	const [filters, setFilters] = useState({})
	let colors = useSelector(getThemeColors);

	//TODO: Add filters to remove testing jargin, damage formulae, etc.
	
  return (
    <Wrapper className = 'startFlex col'>
			<Tab
			viewing = {viewing}
			colors = {colors}
			hovering = {hovering}
			/>
			<LogContainer
			viewing = {viewing}
			colors = {colors}
			hovering = {hovering}
			onMouseEnter = {()=>{setHovering(1)}}
			onMouseLeave = {()=>{setHovering(0)}}
			>
				<Filters
				filters = {filters}
				setFilters = {setFilters}
				/>
				{battleInfo.battleLog.map((logEntry, index)=>{
					if (logEntry.type === 'newTick') {
						return (
							<NewTick key = {index}>
								-- NEW TICK # {logEntry.number} --
							</NewTick>
						)
					}
					if (logEntry.type === 'phaseChange') {
						return (
							<Phase key = {index}>
								{logEntry.content}
							</Phase>
						)
					}
					if (logEntry.type === 'testing-bot') {
						return (
							<Bot key = {index}>
								-- TESTING {logEntry.name} --
							</Bot>
						)
					}
					if (logEntry.type === 'test-fail') {
						return (
							<UnMet key = {index}>
								{logEntry.content}
							</UnMet>
						)
					}
					if (logEntry.type === 'test-pass') {
						return (
							<Met key = {index}>
								{logEntry.content}
							</Met>
						)
					}
					if (logEntry.type === 'action-determined') {
						return (
							<CommandToBe key = {index}>
								{logEntry.content}
							</CommandToBe>
						)
					}
					if (logEntry.type === 'battle-init') {
						return (
							<Initial key = {index} filtersOpen = {filters.open}>
								{battleInfo.challenge ? 'CHALLENGE' : 'LEVEL'} INITIALIZATION {battleInfo.challenge ? `\r\nCHALLENGE #${battleInfo.challenge}` : `\r\nLEVEL #${battleInfo.levelInfo.levelNumber} - ${battleInfo.levelInfo.levelName}`}
							</Initial>
						)
					}
					if (logEntry.type === 'invalid') {
						return (
							<Invalid key = {index}>
								{logEntry.content}
							</Invalid>
						)
					}
					if (logEntry.type === 'empty') {
						return (
							<Empty key = {index}>
								{logEntry.content}
							</Empty>
						)
					}
					return (
						<p key = {index}>
							unspecified action type: 
							{logEntry}
						</p>
					)
				})}
			</LogContainer>
		</Wrapper>
  )
}

export default BattleLog;
const LogContainer = styled.div`
	height: ${props => props.viewing === 'log' ? '450px' : '0px'};
	margin-top: ${props => props.viewing === 'log' ? '0px' : '20px'};
	width: 300px;
	background-color: rgb(0,10,0);
	position: relative;
	top: -10px;
	left: 75px;
	z-index: 10;
	transition: height 0.5s ease-in-out;
	font-size: 0.5em;
	overflow-y: auto;
	border: ${props => props.viewing === 'log' && `4px double ${props.hovering ? props.colors.hoveredText : props.colors.secondary}`};
	border-radius: 5px;
	padding: 0 8px;
	>p{
		display: ${props => props.viewing !== 'log' && 'none'};
		animation: 0.5s ease-out expandYHalfDelay;
	}
	>div{
		display: ${props => props.viewing !== 'log' && 'none'};
		animation: 0.5s ease-out expandYHalfDelay;
	}
`
const Tab = styled.div`
	height: 20px;
	width: 20px;
	background-color: ${props => props.hovering ? props.colors.hoveredText : props.colors.secondary};
	transform: rotate(45deg);
	display: ${props => props.viewing !== 'log' && 'none'};
	animation: 0.2s ease-out expandY;
`
const Bot = styled.p`
	color: deepskyblue;
	font-size: 1.2em;
`
const UnMet = styled.p`
	color: orangered;
	font-size: 0.8em;
`
const Met = styled.p`
	color: lime;
	font-size: 0.8em;
`
const NewTick = styled.p`
	color: gold;
	font-size: 1.4em;
`
const Phase = styled.p`
	color: fuchsia;
	font-size: 1.3em;
`
const Empty = styled.p`
	color: chocolate;
`
const Initial = styled.p`
	color: orange;
	font-size: 1.4em;
	font-weight: 600;
	padding-right: ${props => props.filtersOpen ? '0px' : '40px'};
	transition: padding-right 0.5s ease-in-out;
`
const CommandToBe = styled.div`
	color: lightskyblue;
`
const Invalid = styled.p`
	color: red;
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