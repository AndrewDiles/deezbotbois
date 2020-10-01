import React from 'react';
import styled from 'styled-components';
import StyledButton from '../StyledButton/StyledButton';

const ComprehensiveTabControl = ({ comprehensiveTabDisplayed, setComprehensiveTabDisplayed }) => {
	return (
		<Wrapper>
			<StyledButton
			handleClick = {() => {setComprehensiveTabDisplayed(!comprehensiveTabDisplayed)}}
			fontSize = '12'
			width = {250}
			>
				{comprehensiveTabDisplayed ? 'CLOSE COMPREHESIVE ATTRIBUTES' : 'VIEW COMPREHESIVE ATTRIBUTES'}
			</StyledButton>
		</Wrapper>
	)
}
export default ComprehensiveTabControl;
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