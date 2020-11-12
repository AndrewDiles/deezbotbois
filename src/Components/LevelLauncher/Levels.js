import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components';
// import BotSelector from './BotSelector';

const Levels = ({ windowWidth, setViewingLevels }) => {
	// const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	const settings = useSelector((state) => state.settings);
	const width = 300;
	const lvSelHeight = 200;
	const lvDetailsHeight = 650;
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

			<LevelSelectExtensionWrapper
			navLocation = {settings.navLocation}
			windowWidth = {windowWidth}
			width = {width}
			gridGap = {gridGap}
			lvSelHeight = {lvSelHeight}
			>
				<LevelSelectExtension
				navLocation = {settings.navLocation}
				windowWidth = {windowWidth}
				height = {allOtherHeights-lvSelHeight}
				width = {width}
				gridGap = {gridGap}
				>
					<button onClick={()=>{console.log('buttonclick')}}>
						LEVEL EXTENSION
					</button>
				</LevelSelectExtension>

			</LevelSelectExtensionWrapper>

			<LevelDetailsWrapper
			navLocation = {settings.navLocation}
			windowWidth = {windowWidth}
			width = {width}
			gridGap = {gridGap}
			lvSelHeight = {lvSelHeight}
			>
				<LevelDetails
				navLocation = {settings.navLocation}
				windowWidth = {windowWidth}
				height = {lvDetailsHeight}
				width = {width}
				gridGap = {gridGap}
				lvSelHeight = {lvSelHeight}
				>
					LEVEL DETAILS
				</LevelDetails>
			</LevelDetailsWrapper>

			<BotSelectorWrapper
			navLocation = {settings.navLocation}
			windowWidth = {windowWidth}
			height = {allOtherHeights}
			width = {width}
			gridGap = {gridGap}
			lvSelHeight = {lvSelHeight}
			lvDetailsHeight = {lvDetailsHeight}
			>
				<BotSelector
				height = {allOtherHeights}
				width = {width}
				>
					BOT SELECTION
				</BotSelector>
			</BotSelectorWrapper>

			<LayoutWrapper
			navLocation = {settings.navLocation}
			windowWidth = {windowWidth}
			width = {width}
			gridGap = {gridGap}
			allOtherHeights = {allOtherHeights}
			lvDetailsHeight = {lvDetailsHeight}
			lvSelHeight = {lvSelHeight}
			>
				<Layout
				navLocation = {settings.navLocation}
				windowWidth = {windowWidth}
				height = {allOtherHeights}
				width = {width}
				gridGap = {gridGap}
				>
					LAYOUT
				</Layout>
			</LayoutWrapper>

			<HostilesWrapper
			navLocation = {settings.navLocation}
			windowWidth = {windowWidth}
			width = {width}
			gridGap = {gridGap}
			allOtherHeights = {allOtherHeights}
			lvDetailsHeight = {lvDetailsHeight}
			lvSelHeight = {lvSelHeight}
			>
				<Hostiles
				navLocation = {settings.navLocation}
				windowWidth = {windowWidth}
				height = {allOtherHeights}
				width = {width}
				gridGap = {gridGap}
				>
					HOSTILES
				</Hostiles>
			</HostilesWrapper>

			<AchievementsWrapper
			navLocation = {settings.navLocation}
			windowWidth = {windowWidth}
			width = {width}
			gridGap = {gridGap}
			allOtherHeights = {allOtherHeights}
			lvDetailsHeight = {lvDetailsHeight}
			lvSelHeight = {lvSelHeight}
			>
				<Achievements
				navLocation = {settings.navLocation}
				windowWidth = {windowWidth}
				height = {allOtherHeights}
				width = {width}
				gridGap = {gridGap}
				>
					ACHIEVEMENTS
				</Achievements>
			</AchievementsWrapper>

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
const LevelSelect = styled.div`
	background-color: blue;
	width: ${props=>`${props.width}px`};
	height: ${props=> `${props.height}px`};
	animation: 1s ease-out 1 expandY;
	transform-origin: center top;
`
const LevelSelectExtensionWrapper = styled.div`
	height: 0px;
	width: 0px;
	transform: ${props => props.navLocation === 'top' ? 
		props.windowWidth < (props.gridGap+(props.width*2)) ? `translate(${-0.5*props.width}px, ${props.lvSelHeight}px)` :
		props.windowWidth < ((2*props.gridGap)+(props.width*3)) ? `translate(${-(props.width + (props.gridGap/2))}px, ${props.lvSelHeight}px)` :
		`translate(${-(props.width + (props.gridGap/2))}px, ${props.lvSelHeight}px)` :

		props.windowWidth < (135 + props.gridGap+(props.width*2)) ? `translate(${-0.5*props.width}px, ${props.lvSelHeight}px)` :
		props.windowWidth < (135 + (2*props.gridGap)+(props.width*3)) ? `translate(${-(props.width + (props.gridGap/2))}px, ${props.lvSelHeight}px)` :
		`translate(${-(props.width + (props.gridGap/2))}px, ${props.lvSelHeight}px)`
		};
	transition: transform 1s ease-in-out;
`
const LevelSelectExtension = styled.div`
	background-color: blue;
	width: ${props=>`${props.width}px`};
	height: ${props=>`${props.height}px`};
	transform: ${props => props.navLocation === 'top' ?
		props.windowWidth < ((2*props.gridGap)+(props.width*3)) ? 'scaleY(0)' :
		'scaleY(1)' :

		props.windowWidth < (135 + (2*props.gridGap)+(props.width*3)) ? 'scaleY(0)' :
		'scaleY(1)'
		};
	transition: transform 1s ease-in-out;
	animation: ${props => props.navLocation === 'top' ?
		props.windowWidth < ((2*props.gridGap)+(props.width*3)) ? '' :
		'1s ease-out 1 expandY' :

		props.windowWidth < (135 + (2*props.gridGap)+(props.width*3)) ? '' :
		'1s ease-out 1 expandY'
		};
	transform-origin: center top;
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
	background-color: mintcream;
	width: ${props=>`${props.width}px`};
	height: ${props=>`${props.height}px`};
	transform: ${props => props.navLocation === 'top' ? 
		props.windowWidth < ((2*props.gridGap)+(props.width*3)) ? 'scale(1)' :
		'scale(0)' :
		props.windowWidth < (135 + (2*props.gridGap)+(props.width*3)) ? 'scale(1)' :
		'scale(0)'
	};
	transition: transform 1s ease-in-out;
	animation: ${props => props.navLocation === 'top' ? 
		props.windowWidth < ((2*props.gridGap)+(props.width*3)) ? '1s ease-out 1 expandY' :
		'' :
		props.windowWidth < (135 + (2*props.gridGap)+(props.width*3)) ? '1s ease-out 1 expandY' :
		''
	};
	transform-origin: center top;
`
const BotSelectorWrapper = styled.div`
	height: 0px;
	width: 0px;
	transform: ${props => props.navLocation === 'top' ? 
		props.windowWidth < (props.gridGap+(props.width*2)) ? `translate(${-0.5*props.width}px, ${props.lvSelHeight+props.lvDetailsHeight+2*props.gridGap}px)` :
		props.windowWidth < ((2*props.gridGap)+(props.width*3)) ? `translate(${-(props.width + (props.gridGap/2))}px,${props.lvSelHeight+props.gridGap}px)` :
		`translate(${0.5*props.gridGap}px,0px)` :

		props.windowWidth < (135 + props.gridGap+(props.width*2)) ? `translate(${-0.5*props.width}px, ${props.lvSelHeight+props.lvDetailsHeight+2*props.gridGap}px)` :
		props.windowWidth < (135 + (2*props.gridGap)+(props.width*3)) ? `translate(${-(props.width + (props.gridGap/2))}px,${props.lvSelHeight+props.gridGap}px)` :
		`translate(${0.5*props.gridGap}px,0px)`
	};
	transition: transform 1s ease-in-out;
`
const BotSelector = styled.div`
	background-color: grey;
	width: ${props=>`${props.width}px`};
	height: ${props=>`${props.height}px`};
	animation: 1s ease-out 1 expandY;
	transform-origin: center top;
`
const LayoutWrapper = styled.div`
	height: 0px;
	width: 0px;
	transform: ${props => props.navLocation === 'top' ?
		props.windowWidth < (props.gridGap+(props.width*2)) ? `translate(${-0.5*props.width}px, ${(props.lvSelHeight + props.gridGap + props.lvDetailsHeight - props.allOtherHeights)/2}px)` :
		props.windowWidth < ((2*props.gridGap)+(props.width*3)) ? `translate(${(props.gridGap/2)}px,${(props.lvDetailsHeight - props.allOtherHeights)/2}px)` :
		`translate(${-(1.5*props.width + (props.gridGap))}px,${props.allOtherHeights+props.gridGap}px)` :

		props.windowWidth < (135 + props.gridGap+(props.width*2)) ? `translate(${-0.5*props.width}px, ${(props.lvSelHeight + props.gridGap + props.lvDetailsHeight - props.allOtherHeights)/2}px)` :
		props.windowWidth < (135 + (2*props.gridGap)+(props.width*3)) ? `translate(${(props.gridGap/2)}px,${(props.lvDetailsHeight - props.allOtherHeights)/2}px)` :
		`translate(${-(1.5*props.width + (props.gridGap))}px,${props.allOtherHeights+props.gridGap}px)`
	};
	transition: transform 1s ease-in-out;
`
const Layout = styled.div`
	background-color: orange;
	width: ${props=>`${props.width}px`};
	height: ${props=>`${props.height}px`};
	transform: ${props=> props.navLocation === 'top' ? 
		props.windowWidth < ((2*props.gridGap)+(props.width*3)) ? 'scale(0)' : `scale(1)` :
		props.windowWidth < (135 + (2*props.gridGap)+(props.width*3)) ? 'scale(0)' : `scale(1)`
	};
	transition: transform 1s ease-in-out;
	animation: ${props=> props.navLocation === 'top' ? 
		props.windowWidth < ((2*props.gridGap)+(props.width*3)) ? '' : '1s ease-out 1 expandY' :
		props.windowWidth < (135 + (2*props.gridGap)+(props.width*3)) ? '' : '1s ease-out 1 expandY'
	};
	transform-origin: center top;
`
const HostilesWrapper = styled.div`
	height: 0px;
	width: 0px;
	transform: ${props => props.navLocation === 'top' ? 
		props.windowWidth < (props.gridGap+(props.width*2)) ? `translate(${-0.5*props.width}px, ${(props.lvSelHeight + props.gridGap + props.lvDetailsHeight - props.allOtherHeights)/2}px)` :
		props.windowWidth < ((2*props.gridGap)+(props.width*3)) ? `translate(${(props.gridGap/2)}px,${(props.lvDetailsHeight - props.allOtherHeights)/2}px)` :
		`translate(${-(0.5*props.width)}px,${props.allOtherHeights+props.gridGap}px)` :

		props.windowWidth < (135 + props.gridGap+(props.width*2)) ? `translate(${-0.5*props.width}px, ${(props.lvSelHeight + props.gridGap + props.lvDetailsHeight - props.allOtherHeights)/2}px)` :
		props.windowWidth < (135 + (2*props.gridGap)+(props.width*3)) ? `translate(${(props.gridGap/2)}px,${(props.lvDetailsHeight - props.allOtherHeights)/2}px)` :
		`translate(${-(0.5*props.width)}px,${props.allOtherHeights+props.gridGap}px)`
	};
	transition: transform 1s ease-in-out;
`
const Hostiles = styled.div`
	background-color: pink;
	width: ${props=>`${props.width}px`};
	height: ${props=>`${props.height}px`};
	transform: ${props=> props.navLocation === 'top' ? 
		props.windowWidth < ((2*props.gridGap)+(props.width*3)) ? 'scale(0)' : `scale(1)` :
		props.windowWidth < (135 + (2*props.gridGap)+(props.width*3)) ? 'scale(0)' : `scale(1)`
	};
	transition: transform 1s ease-in-out;
	animation: ${props=> props.navLocation === 'top' ? 
		props.windowWidth < ((2*props.gridGap)+(props.width*3)) ? '' : '1s ease-out 1 expandY' :
		props.windowWidth < (135 + (2*props.gridGap)+(props.width*3)) ? '' : '1s ease-out 1 expandY'
	};
	transform-origin: center top;
`
const AchievementsWrapper = styled.div`
	height: 0px;
	width: 0px;
	transform: ${props => props.navLocation === 'top' ? 
		props.windowWidth < (props.gridGap+(props.width*2)) ? `translate(${-0.5*props.width}px, ${(props.lvSelHeight + props.gridGap + props.lvDetailsHeight - props.allOtherHeights)/2}px)` :
		props.windowWidth < ((2*props.gridGap)+(props.width*3)) ? `translate(${(props.gridGap/2)}px,${(props.lvDetailsHeight - props.allOtherHeights)/2}px)` :
		`translate(${(0.5*props.width + (props.gridGap))}px,${props.allOtherHeights+props.gridGap}px)` :

		props.windowWidth < (135 + props.gridGap+(props.width*2)) ? `translate(${-0.5*props.width}px, ${(props.lvSelHeight + props.gridGap + props.lvDetailsHeight - props.allOtherHeights)/2}px)` :
		props.windowWidth < (135 + (2*props.gridGap)+(props.width*3)) ? `translate(${(props.gridGap/2)}px,${(props.lvDetailsHeight - props.allOtherHeights)/2}px)` :
		`translate(${(0.5*props.width + (props.gridGap))}px,${props.allOtherHeights+props.gridGap}px)`
	};
	transition: transform 1s ease-in-out;
`
const Achievements = styled.div`
	background-color: green;
	width: ${props=>`${props.width}px`};
	height: ${props=>`${props.height}px`};
	transform: ${props=> props.navLocation === 'top' ? 
		props.windowWidth < ((2*props.gridGap)+(props.width*3)) ? 'scale(0)' : `scale(1)` :
		props.windowWidth < (135 + (2*props.gridGap)+(props.width*3)) ? 'scale(0)' : `scale(1)`
	};
	transition: transform 1s ease-in-out;
	animation: ${props=> props.navLocation === 'top' ? 
		props.windowWidth < ((2*props.gridGap)+(props.width*3)) ? '' : `1s ease-out 1 expandY` :
		props.windowWidth < (135 + (2*props.gridGap)+(props.width*3)) ? '' : `1s ease-out 1 expandY`
	};
	transform-origin: center top;
`