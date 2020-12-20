import React from 'react';
import styled from 'styled-components';
import {gear} from 'react-icons-kit/fa/gear';
import StyledIcon from '../../StyledIcon/StyledIcon';

const Filters = ({ filters, setFilters}) => {
	React.useEffect(()=>{
		const gearIcon = document.getElementById('gearIcon');
		if (gearIcon) {
			gearIcon.className = 'darkBg';
		}
	},[])
	function spinTheGear () {
		const gearContainer = document.getElementById('gearContainer');
		if (gearContainer) {
			gearContainer.className = 'gearSpin'
			console.log('made the gear spin')
		}
		setTimeout(()=>{
			if (gearContainer) {
				gearContainer.className = ''
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
				Options will go here
			</Options>
			<Gear
			open = {filters.open}
			id = 'gearContainer'
			// className = 'rotating'
			>
				<StyledIcon
				handleClick = {()=>{
					// spinTheGear();
					setFilters({...filters, open: !filters.open})}}
				icon = {gear}
				sfx = 'toggle'
				id = 'gearIcon'
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
`
const Gear = styled.div`
	margin-top: ${props => props.open ? '0px' : '40px'};
	transition: margin-top ease-in-out 0.5s;
`