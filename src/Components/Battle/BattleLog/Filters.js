import React, { useState } from 'react';
import styled from 'styled-components';
import {gear} from 'react-icons-kit/fa/gear';
import StyledIcon from '../../StyledIcon/StyledIcon';
import StyledCheckbox from '../../StyledCheckbox/StyledCheckbox';

const Filters = ({ filters, setFilters}) => {
	const [gearSpinning, setGearSpinning] = useState('reset');
	const [spinningDisabled, setSpinningDisabled] = useState(0);

	// React.useEffect(()=>{
	// 	console.log(filters);
	// },
	// [JSON.stringify(filters)]
	// )

	React.useEffect(()=>{
		let pendingChange = null;
		if (gearSpinning === 'forward') {
			pendingChange = setTimeout(()=>{
				setGearSpinning('rotated');
				setSpinningDisabled(0);
			}, 500)
		} else if (gearSpinning === 'backward') {
			pendingChange = setTimeout(()=>{
				setGearSpinning('reset');
				setSpinningDisabled(0);
			}, 500)
		}
		return ()=>{
			if (pendingChange) {
				clearTimeout(pendingChange);
			}
		}
	},
	[gearSpinning]
	)

	function spinTheGear () {
		setSpinningDisabled(1);
		if (gearSpinning === 'reset') {
			setGearSpinning('forward');
		} else {
			setGearSpinning('backward');
		}
	}
  return (
    <Wrapper
		open = {filters.open}
		className = 'startFlex'
		id = 'filter'
		>
			<Options
			open = {filters.open}
			>
				<TickCheckContainer className = 'startFlex'>
					<StyledCheckbox
					sfx = 'selected'
					value = {filters.newTick}
					handleClick = {() => {setFilters({...filters, newTick: !filters.newTick})}}
					right = '2px'
					/>
					TICKS
				</TickCheckContainer>
				<ExecutionCheckContainer className = 'startFlex'>
					<StyledCheckbox
					sfx = 'selected'
					value = {filters.executions}
					handleClick = {() => {setFilters({...filters, executions: !filters.executions})}}
					right = '2px'
					/>
					EXECUTIONS
				</ExecutionCheckContainer>
				<PhaseCheckContainer className = 'startFlex'>
					<StyledCheckbox
					sfx = 'selected'
					value = {filters.phaseChange}
					handleClick = {() => {setFilters({...filters, phaseChange: !filters.phaseChange})}}
					right = '2px'
					/>
					PHASES
				</PhaseCheckContainer>
				<AttributeCheckContainer className = 'startFlex'>
					<StyledCheckbox
					sfx = 'selected'
					value = {filters.attributeChange}
					handleClick = {() => {setFilters({...filters, attributeChange: !filters.attributeChange})}}
					right = '2px'
					/>
					ATTRIBUTES
				</AttributeCheckContainer>
				<TestCheckContainer className = 'startFlex'>
					<StyledCheckbox
					sfx = 'selected'
					value = {filters.test}
					handleClick = {() => {setFilters({...filters, test: !filters.test})}}
					right = '2px'
					/>
					TESTS
				</TestCheckContainer>
				<FormulaeCheckContainer className = 'startFlex'>
					<StyledCheckbox
					sfx = 'selected'
					value = {filters.formula}
					handleClick = {() => {setFilters({...filters, formula: !filters.formula})}}
					right = '2px'
					/>
					FORMULAE
				</FormulaeCheckContainer>
				<LastTickCheckContainer className = 'startFlex'>
					<StyledCheckbox
					sfx = 'selected'
					value = {filters.lastTick}
					handleClick = {() => {setFilters({...filters, lastTick: !filters.lastTick})}}
					right = '2px'
					/>
					LAST TICK
				</LastTickCheckContainer>
				<RecordsCheckContainer className = 'startFlex'>
					<StyledCheckbox
					sfx = 'toggle'
					value = {filters.records}
					handleClick = {() => {filters.records ? setFilters({...filters, records: 0}) : setFilters({...filters, records: 1})}}
					right = '2px'
					/>
					DISPLAY RECORDS STATES
				</RecordsCheckContainer>
			</Options>
			<Gear
			open = {filters.open}
			id = 'gearContainer'
			gearSpinning = {gearSpinning}
			>
				<StyledIcon
				handleClick = {()=>{
					spinTheGear();
					setFilters({...filters, open: !filters.open})}
				}
				disabled = {spinningDisabled}
				icon = {gear}
				sfx = 'toggle'
				id = 'gearIcon'
				additionalClassName = 'darkBg'
				/>
			</Gear>
		</Wrapper>
  )
}

export default Filters;

const Wrapper = styled.div`
	height: ${props => props.open ? '60px' : '0px'};
	width: 100%;
	/* padding-left: 236px; */
	transition: height ease-in-out 0.5s;
`
const Options = styled.div`
	width: 236px;
	transform: ${props => props.open ? 'scaleX(1)' : 'scaleX(0)'};
	height: 60px;
	display: grid;
	grid-template-columns: repeat(3,81px);  /* 78 */
	padding-left: -5px;
`
const Gear = styled.div`
	/* margin-top: ${props => props.open ? '0px' : '60px'}; */
	margin-top: ${props => props.open ? '-20px' : '40px'};
	transition: margin-top ease-in-out 0.5s, transform ease-in-out 0.5s;
	transform: ${props => (props.gearSpinning === 'forward' || props.gearSpinning === 'rotated') ? 'rotate(180deg)' : 'rotate(0deg)'};
`
const TickCheckContainer = styled.div`
	color: orange;
`
const PhaseCheckContainer = styled.div`
	color: fuchsia;
`
const TestCheckContainer = styled.div`
	color: lightskyblue;
`
const AttributeCheckContainer = styled.div`
	color: limegreen;
	font-size: 6px;
`
const ExecutionCheckContainer = styled.div`
	color: mediumslateblue;
	font-size: 6px;
`
const FormulaeCheckContainer = styled.div`
	color: deeppink;
	font-size: 7px;
`
const LastTickCheckContainer = styled.div`
	color: gold;
	font-size: 7px;
	white-space: nowrap;
`
const RecordsCheckContainer = styled.div`
	color: purple;
	white-space: nowrap;
	font-size: 7px;
`