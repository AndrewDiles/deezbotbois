import React from 'react';
import styled from 'styled-components';
import StyledButton from '../StyledButton/StyledButton';

const AssemblyTabControl = ({ tabsDisplayed, setTabsDisplayed }) => {
	// model: true, equipment: false, attributes: false, techTree: false, ai: false, scripts: false});

	const tabToggler = (keyToChange, state, setState) => {
		let newState = {...state};
		newState[keyToChange] = !state[keyToChange];
		setState(newState);
		// console.log('clicked, changed to:',newState)
	}
	return (
		<Wrapper>
			<StyledButton
			handleClick = {() => {tabToggler('model',tabsDisplayed,setTabsDisplayed)}}
			fontSize = '12'
			>
				{tabsDisplayed.model ? 'CLOSE MODEL' : 'OPEN MODEL'}
			</StyledButton>
			<StyledButton
			handleClick = {() => {tabToggler('equipment',tabsDisplayed,setTabsDisplayed)}}
			fontSize = '12'
			>
				{tabsDisplayed.equipment ? 'CLOSE EQUIPMENT' : 'OPEN EQUIPMENT'}
			</StyledButton>
			<StyledButton
			handleClick = {() => {tabToggler('attributes',tabsDisplayed,setTabsDisplayed)}}
			fontSize = '12'
			>
				{tabsDisplayed.attributes ? 'CLOSE ATTRIBUTES' : 'OPEN ATTRIBUTES'}
			</StyledButton>
			<StyledButton
			handleClick = {() => {tabToggler('techTree',tabsDisplayed,setTabsDisplayed)}}
			fontSize = '12'
			>
				{tabsDisplayed.techTree ? 'CLOSE TECHTREE' : 'OPEN TECHTREE'}
			</StyledButton>
			<StyledButton
			handleClick = {() => {tabToggler('ai',tabsDisplayed,setTabsDisplayed)}}
			fontSize = '12'
			>
				{tabsDisplayed.ai ? 'CLOSE AI.' : 'OPEN AI.'}
			</StyledButton>
			<StyledButton
			handleClick = {() => {tabToggler('scripts',tabsDisplayed,setTabsDisplayed)}}
			fontSize = '12'
			>
				{tabsDisplayed.scripts ? 'CLOSE NODES' : 'OPEN NODES'}
			</StyledButton>
		</Wrapper>
	)
}
export default AssemblyTabControl;
const Wrapper = styled.div`
	height: 40px;
	width: 750px;
	display: flex;
	align-items: center;
	justify-content: center;
	@media screen and (max-width: 1050px) {
		flex-wrap: wrap;
		height: 120px;
		width: 250px
	}
`
// const Wrapper = styled.div`
	/* display: grid;
	grid-gap: 20px;
	grid-template-columns: repeat(6, 125px);
	width: 1550px;
	margin-left: auto;
  margin-right: auto;
	@media screen and 
	(max-width: ${props => props.navLocation === 'top' ? '1600px' : '1730px'}) {
		width: 1030px;
		grid-template-columns: repeat(2, 125px);
  }
	@media screen and 
	(max-width: ${props => props.navLocation === 'top' ? '1150px' : '1280px'}) {
    width: 510px;
		grid-template-columns: repeat(2, 1fr);
  }
	@media screen and
	(max-width: ${props => props.navLocation === 'top' ? '700px' : '830px'}) {
    width: 250px;
		grid-template-columns: 1fr;
  } */
// `