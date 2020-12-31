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
	test: 1,
	executions: 1,
	formula: 1
}

const BattleLog = ({ viewing }) => {
	const battleInfo = useSelector((state) => state.battleInfo);
	const [hovering, setHovering] = useState(0);
	const [filters, setFilters] = useState(baseFilters);
	let colors = useSelector(getThemeColors);

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
						return filters.newTick ? (
							<NewTick key = {index}>
								*** TICK # {logEntry.number} ***
							</NewTick>
					) : (null)}

					if (logEntry.type === 'phaseChange') {
						return filters.phaseChange ? (
							<Phase key = {index}>
								{logEntry.content}
							</Phase>
						) : (null)
					}

					if (logEntry.type === 'testing-bot') {
						return filters.test ? (
							<Bot key = {index}>
								- TESTING {logEntry.name} -
							</Bot>
						) : (null)
					}

					if (logEntry.type === 'test-fail') {
						return filters.test ? (
							<UnMet key = {index}>
								{logEntry.content}
							</UnMet>
						) : (null)
					}

					if (logEntry.type === 'test-pass') {
						return filters.test ? (
							<Met key = {index}>
								{logEntry.content}
							</Met>
						) : (null)
					}
					if (logEntry.type === 'action-determined') {
						return filters.test ? (
							<CommandToBe key = {index}>
								{logEntry.content}
							</CommandToBe>
						) : (null)
					}
					if (logEntry.type === 'new-initiative') {
						return filters.executions ? (
							<Bot key = {index}>
								{logEntry.content}
							</Bot>
						) : (null)
					}
					if (logEntry.type === 'execution') {
						return filters.executions ? (
							<Command key = {index}>
								{logEntry.content}
							</Command>
						) : (null)
					}
					if (logEntry.type === 'attribute-change') {
						return filters.attributeChange ? (
							<Attribute key = {index}>
								{logEntry.content}
							</Attribute>
						) : (null)
					}
					if (logEntry.type === 'damage-calculation') {
						return filters.formula ? (
							<Formula key = {index}>
								{logEntry.content}
							</Formula>
						) : (null)
					}

					
					if (logEntry.type === 'invalid') {
						return filters.test ? (
							<Invalid key = {index}>
								{logEntry.content}
							</Invalid>
						) : (null)
					}
					if (logEntry.type === 'empty') {
						return filters.test ? (
							<Empty key = {index}>
								{logEntry.content}
							</Empty>
						) : (null)
					}
					if (logEntry.type === 'battle-init') {
						return (
							<Initial key = {index} filtersOpen = {filters.open}>
								{battleInfo.challenge ? 'CHALLENGE' : 'LEVEL'} INITIALIZATION {battleInfo.challenge ? `\r\nCHALLENGE #${battleInfo.challenge}` : `\r\nLEVEL #${battleInfo.levelInfo.levelNumber} - ${battleInfo.levelInfo.levelName}`}
							</Initial>
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
const CommandToBe = styled.p`
	color: mediumslateblue;
`
const Command = styled.p`
	color: mediumslateblue;
	font-size: 1.1em;
`
const Formula = styled.p`
	color: deeppink;
	font-size: 0.8em;
`
const Invalid = styled.p`
	color: red;
`
const Attribute = styled.p`
	color: limegreen;
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