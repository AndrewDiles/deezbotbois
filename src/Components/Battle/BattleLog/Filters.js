import React from 'react';
import styled from 'styled-components';
import {gear} from 'react-icons-kit/fa/gear';
import StyledIcon from '../../StyledIcon/StyledIcon';

const Filters = ({ filters, setFilters}) => {
	const [gearSpinning, setGearSpinning] = React.useState(0);

	React.useEffect(()=>{
		console.log(filters);
	},
	// [JSON.stringify(filters)]
	)

	function spinTheGear () {
		const gearContainer = document.getElementById('gearContainer');
		if (gearContainer) {
			setGearSpinning(1);
		}
		setTimeout(()=>{
			if (gearContainer) {
				setGearSpinning(0);
			}
		},500)
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
					<input 
					type = "checkbox" 
					checked = {filters.newTick} 
					onChange = {() => {
						setFilters({...filters, newTick: !filters.newTick})
					}}/>
					TICKS
				</TickCheckContainer>
				<ExecutionCheckContainer className = 'startFlex'>
					<input 
					type = "checkbox" 
					checked = {filters.executions} 
					onChange = {() => {
						setFilters({...filters, executions: !filters.executions})
					}}/>
					EXECUTIONS
				</ExecutionCheckContainer>
				<PhaseCheckContainer className = 'startFlex'>
					<input 
					type = "checkbox" 
					checked = {filters.phaseChange} 
					onChange = {() => {
						setFilters({...filters, phaseChange: !filters.phaseChange})
					}}/>
					PHASES
				</PhaseCheckContainer>
				<AttributeCheckContainer className = 'startFlex'>
					<input 
					type = "checkbox" 
					checked = {filters.attributeChange} 
					onChange = {() => {
						setFilters({...filters, attributeChange: !filters.attributeChange})
					}}/>
					ATTRIBUTES
				</AttributeCheckContainer>
				<TestCheckContainer className = 'startFlex'>
					<input 
					type = "checkbox" 
					checked = {filters.test} 
					onChange = {() => {
						setFilters({...filters, test: !filters.test})
					}}/>
					TESTS
				</TestCheckContainer>
				<FormulaeCheckContainer className = 'startFlex'>
					<input 
					type = "checkbox" 
					checked = {filters.formula} 
					onChange = {() => {
						setFilters({...filters, formula: !filters.formula})
					}}/>
					FORMULAE
				</FormulaeCheckContainer>
			</Options>
			<Gear
			open = {filters.open}
			id = 'gearContainer'
			className = {gearSpinning && 'gearSpin'}
			>
				<StyledIcon
				handleClick = {()=>{
					spinTheGear();
					setFilters({...filters, open: !filters.open})}
				}
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
	height: ${props => props.open ? '40px' : '0px'};
	width: 100%;
	/* padding-left: 236px; */
	transition: height ease-in-out 0.5s;
`
const Options = styled.div`
	width: 236px;
	transform: ${props => props.open ? 'scaleX(1)' : 'scaleX(0)'};
	height: 40px;
	display: grid;
	grid-template-columns: repeat(3,81px);  /* 78 */
	padding-left: -5px;
`
const Gear = styled.div`
	margin-top: ${props => props.open ? '0px' : '40px'};
	transition: margin-top ease-in-out 0.5s;
`
const TickCheckContainer = styled.div`
	color: gold;
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