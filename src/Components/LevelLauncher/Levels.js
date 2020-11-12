import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';
import styled from 'styled-components';
// import BotSelector from './BotSelector';

const Levels = ({ windowWidth, setViewingLevels }) => {
	// const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	const settings = useSelector((state) => state.settings);
	const colors = useSelector(getThemeColors);
	const width = 300;
	const lvSelHeight = 200;
	const lvDetailsHeight = 600;
	const allOtherHeights = 400;
	const gridGap = 50;

	console.log('current windowWidth is:', windowWidth);

  return (
    <div>
			<LevelSelectWrapper
			navLocation = {settings.navLocation}
			windowWidth = {windowWidth}
			width = {width}
			gridGap = {gridGap}
			>
				<LevelSelect
				height = {lvSelHeight}
				width = {width}
				>
					LEVEL SELECT
				</LevelSelect>
			</LevelSelectWrapper>

			<LevelDetailsWrapper
			navLocation = {settings.navLocation}
			windowWidth = {windowWidth}
			width = {width}
			gridGap = {gridGap}
			lvSelHeight = {lvSelHeight}
			>
				<LevelDetails
				height = {lvDetailsHeight}
				width = {width}
				navLocation = {settings.navLocation}
				windowWidth = {windowWidth}
				gridGap = {gridGap}
				lvSelHeight = {lvSelHeight}
				>
					LEVEL DETAILS
				</LevelDetails>
			</LevelDetailsWrapper>

			{/* <ZeroSizedContainer>
				<BotSelector
				height = {allOtherHeights}
				width = {width}
				>
					BOT SELECTION
				</BotSelector>
			</ZeroSizedContainer> */}

			{/* LAUNCH LEVEL */}

    </div>
  )
}

export default Levels;

const LevelSelectWrapper = styled.div`
	height: 0px;
	width: 0px;
	transform: ${props => props.navLocation === 'top' ? 
		props.windowWidth < (props.gridGap+(props.width*2)) ? `translateX(${-0.5*props.width}px)` :
		props.windowWidth < ((2*props.gridGap)+(props.width*3)) ? `translateX(${-(props.width + (props.gridGap/2))}px)` :
		`translateX(${-(props.width + (props.gridGap/2))}px)` :

		props.windowWidth < (135 + props.gridGap+(props.width*2)) ? `translateX(${-0.5*props.width}px)` :
		props.windowWidth < (135 + (2*props.gridGap)+(props.width*3)) ? `translateX(${-(props.width + (props.gridGap/2))}px)` :
		`translateX(${-(props.width + (props.gridGap/2))}px)`
		};
	transition: transform 1s ease-in-out;
`

// navLocation = {settings.navLocation}
// windowWidth = {windowWidth}
// width = {width}


const LevelSelect = styled.div`
	background-color: pink;
	width: ${props=>`${props.width}px`};
	height: ${props=>`${props.height}px`};
`
const LevelDetailsWrapper = styled.div`
	height: 0px;
	width: 0px;
	transform: ${props => props.navLocation === 'top' ? 
		props.windowWidth < (props.gridGap+(props.width*2)) ? `translate(${-0.5*props.width}px, ${props.lvSelHeight+props.gridGap}px)` :
		props.windowWidth < ((2*props.gridGap)+(props.width*3)) ? `translate(${(props.gridGap/2)}px,0px)` :
		'' :

		props.windowWidth < (135 + props.gridGap+(props.width*2)) ? `translate(${-0.5*props.width}px, ${props.lvSelHeight+props.gridGap}px)` :
		props.windowWidth < (135 + (2*props.gridGap)+(props.width*3)) ? `translate(${(props.gridGap/2)}px,0px)` :
		''
	};
	transition: transform 1s ease-in-out;
`
const LevelDetails = styled.div`
	background-color: green;
	width: ${props=>`${props.width}px`};
	height: ${props=>`${props.height}px`};
	transform: ${props => props.navLocation === 'top' ? 
		props.windowWidth < (props.gridGap+(props.width*2)) ? 'scale(1)' :
		props.windowWidth < ((2*props.gridGap)+(props.width*3)) ? 'scale(1)' :
		'scale(0)' :
		props.windowWidth < (135 + props.gridGap+(props.width*2)) ? 'scale(1)' :
		props.windowWidth < (135 + (2*props.gridGap)+(props.width*3)) ? 'scale(1)' :
		'scale(0)'
	};
	transition: transform 1s ease-in-out;
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




{/* <LevelSelectWrapper
			height = {lvSelHeight}
			width = {width}
			>
				<LevelSelect
				height = {lvSelHeight}
				width = {width}
				>
					LEVEL SELECT
				</LevelSelect>
			</LevelSelectWrapper> */}

			{/* <LevelDetailsWrapper
			height = {lvInfoHeight}
			width = {width}
			>
				<LevelDetails
				height = {lvInfoHeight}
				width = {width}
				>
					LEVEL DETAILS
				</LevelDetails>
			</LevelDetailsWrapper> */}

			{/* <BotSelectorWrapper
			height = {botSelHeight}
			width = {width}
			>
				<BotSelector
				height = {botSelHeight}
				width = {width}
				>
					BOT SELECTION
				</BotSelector>
			</BotSelectorWrapper> */}

// 			const LevelDetailsWrapper = styled.div`
// 	height: 0;
// 	width: 0;
// 	position: relative;
// 	top: 0;
// 	left: 150px;
// 	transition: top 1s, left 1s;
// 	@media (min-width: 700px) {
// 		top: 50px;
// 		left: 300px;
// 	}
// `