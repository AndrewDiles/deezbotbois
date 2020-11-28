import React from 'react';
import styled from 'styled-components';
import StyledButton from '../StyledButton/StyledButton';

const ComprehensiveTabControl = ({ masterAttributesTabDisplayed, setMasterAttributesTabDisplayed, aiNodeTreeTabDisplayed, setAiNodeTreeTabDisplayed }) => {
	return (
		<Wrapper>
			<ButtonWrapper>
				<StyledButton
				handleClick = {() => {setMasterAttributesTabDisplayed(!masterAttributesTabDisplayed)}}
				fontSize = '12'
				width = {250}
				sfx = 'toggle'
				>
					{masterAttributesTabDisplayed ? 'CLOSE COMPREHESIVE ATTRIBUTES' : 'VIEW COMPREHESIVE ATTRIBUTES'}
				</StyledButton>
			</ButtonWrapper>
			<ButtonWrapper>
				<StyledButton
				handleClick = {() => {setAiNodeTreeTabDisplayed(!aiNodeTreeTabDisplayed)}}
				fontSize = '12'
				width = {250}
				sfx = 'toggle'
				>
					{aiNodeTreeTabDisplayed ? 'CLOSE AI DECISION-NODE TREE' : 'VIEW AI DECISION-NODE TREE'}
				</StyledButton>
			</ButtonWrapper>
		</Wrapper>
	)
}
export default ComprehensiveTabControl;
const Wrapper = styled.div`
	height: 50px;
	width: 505px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 5px 0;
	@media screen and (max-width: 1050px) {
		flex-wrap: wrap;
		height: 95px;
		width: 250px;
		padding: 0;
	}
`
const ButtonWrapper = styled.div`
	height: 40px;
	width: 250px;
`