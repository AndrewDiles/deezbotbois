import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';
import styled from 'styled-components';
// import BotSelector from './BotSelector';

const Levels = ({ setViewingLevels }) => {
	// const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	const settings = useSelector((state) => state.settings);
	const colors = useSelector(getThemeColors);
	const width = 300;
	const lvSelHeight = 200;
	const lvInfoHeight = 600;
	const botSelHeight = 400;

  return (
    <Wrapper>
			{/* LAUNCH LEVEL */}

			<LevelSelectWrapper
			height = {lvSelHeight}
			width = {width}
			>
				<LevelSelect
				height = {lvSelHeight}
				width = {width}
				>
					LEVEL SELECT
				</LevelSelect>
			</LevelSelectWrapper>

			<LevelDetailsWrapper
			height = {lvInfoHeight}
			width = {width}
			>
				<LevelDetails
				height = {lvInfoHeight}
				width = {width}
				>
					LEVEL DETAILS
				</LevelDetails>
			</LevelDetailsWrapper>

			<BotSelectorWrapper
			height = {botSelHeight}
			width = {width}
			>
				<BotSelector
				height = {botSelHeight}
				width = {width}
				>
					BOT SELECTION
				</BotSelector>
			</BotSelectorWrapper>

    </Wrapper>
  )
}

export default Levels;

const Wrapper = styled.div`
/* width: 250px; */
/* display : flex;
flex-direction: column;
align-content: center;
align-items: center;
justify-content: flex-start; */
`
const LevelSelectWrapper = styled.div`
	height: 0;
	width: 0;
	position: relative;
	top: 0;
	left: ${props => `${-props.width/2}px`};
	transition: top 1s, left 1s;
	@media (min-width: 700px) {
		top: 50px;
		left: ${props => `${1.5*props.width}px`};
	}
`
const LevelSelect = styled.div`
	background-color: pink;
	width: ${props=>`${props.width}px`};
	height: ${props=>`${props.height}px`};
`
const LevelDetailsWrapper = styled.div`
	height: 0;
	width: 0;
	position: relative;
	top: 0;
	left: 150px;
	transition: top 1s, left 1s;
	@media (min-width: 700px) {
		top: 50px;
		left: 300px;
	}
`
const LevelDetails = styled.div`
	background-color: green;
	width: ${props=>`${props.width}px`};
	height: ${props=>`${props.height}px`};
`
const BotSelectorWrapper = styled.div`
	height: 0;
	width: 0;
	position: relative;
	top: 600px;
	left: 0;
	transition: top 1s, left 1s;
	@media (min-width: 700px) {
		top: 800px;
		left: -150px;
	}
`
const BotSelector = styled.div`
	background-color: grey;
	width: ${props=>`${props.width}px`};
	height: ${props=>`${props.height}px`};
`
// const Wrapper = styled.div`
// display: grid;
// grid-gap: 10px;
// transition: .5s grid-template-areas;
// /* width: 250px; */
// /* display : flex;
// flex-direction: column;
// align-content: center;
// align-items: center;
// justify-content: flex-start; */

// @media (min-width: 768px) {
// 		grid-template-areas:
// 		'. select .'
// 		'. details .'
// 		'. bot .';
// 	}
// @media (min-width: 900px) {
// 		grid-template-areas: 
// 		'select select . .'
// 		'. details details .'
// 		'. . bot bot';
// 	}
// 	@media (min-width: 1000px) {
// 		grid-template-areas: 
// 		'select select details details'
// 		'. bot bot .';
// 	}

// `

// const LevelSelect = styled.div`
// 	background-color: pink;
// 	width: 300px;
// 	height: 400px;
// 	grid-area: select;
// `
// const LevelDetails = styled.div`
// 	background-color: green;
// 	width: 300px;
// 	grid-area: details;
// 	height: 600px;
// `
// const BotSelector = styled.div`
// 	background-color: grey;
// 	width: 300px;
// 	height: 600px;
// 	grid-area: bot;
// `

// // .footer {
// // 	grid-area: footer;
// // 	height: 100px;
// // 	background-color: midnightblue;
// // }

// // @media (min-width: 768px) {
// // 	.container {
// // 			grid-template-areas:
// // 			'nav nav nav'
// // 			'aside main main'
// // 			'aside footer footer';
// // 	}