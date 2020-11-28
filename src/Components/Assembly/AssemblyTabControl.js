import React from 'react';
import styled from 'styled-components';
import StyledButton from '../StyledButton/StyledButton';

const AssemblyTabControl = ({ tabsDisplayed, setTabsDisplayed }) => {
	const tabToggler = (keyToChange, state, setState) => {
		let newState = {...state};
		newState[keyToChange] = !state[keyToChange];
		setState(newState);
	}
	return (
		<Wrapper>
			<StyledButton
			handleClick = {() => {tabToggler('model',tabsDisplayed,setTabsDisplayed)}}
			fontSize = '11'
			sfx = 'toggle'
			>
				{tabsDisplayed.model ? 'CLOSE MODEL' : 'OPEN MODEL'}
			</StyledButton>
			<StyledButton
			handleClick = {() => {tabToggler('equipment',tabsDisplayed,setTabsDisplayed)}}
			fontSize = '11'
			sfx = 'toggle'
			>
				{tabsDisplayed.equipment ? 'CLOSE EQUIPMENT' : 'OPEN EQUIPMENT'}
			</StyledButton>
			<StyledButton
			handleClick = {() => {tabToggler('attributes',tabsDisplayed,setTabsDisplayed)}}
			fontSize = '11'
			sfx = 'toggle'
			>
				{tabsDisplayed.attributes ? 'CLOSE ATTRIBUTES' : 'OPEN ATTRIBUTES'}
			</StyledButton>
			<StyledButton
			handleClick = {() => {tabToggler('techTree',tabsDisplayed,setTabsDisplayed)}}
			fontSize = '11'
			sfx = 'toggle'
			>
				{tabsDisplayed.techTree ? 'CLOSE TECHTREE' : 'OPEN TECHTREE'}
			</StyledButton>
			<StyledButton
			handleClick = {() => {tabToggler('ai',tabsDisplayed,setTabsDisplayed)}}
			fontSize = '11'
			sfx = 'toggle'
			>
				{tabsDisplayed.ai ? 'CLOSE AI.' : 'OPEN AI.'}
			</StyledButton>
			<StyledButton
			handleClick = {() => {tabToggler('scripts',tabsDisplayed,setTabsDisplayed)}}
			fontSize = '11'
			sfx = 'toggle'
			>
				{tabsDisplayed.scripts ? 'CLOSE NODES' : 'OPEN NODES'}
			</StyledButton>
		</Wrapper>
	)
}
export default AssemblyTabControl;
const Wrapper = styled.div`
	height: 50px;
	width: 785px;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	/* padding: 5px 0; */
	@media screen and (max-width: 1050px) {
		flex-wrap: wrap;
		width: 250px;
		height: 140px;
	}
`