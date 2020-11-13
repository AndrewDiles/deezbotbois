import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components';
import BotSelection from '../Assembly/BotSelection';
import baseBotAttributes from '../../Constants/attributes';
import { getThemeColors } from '../../Redux/reducers/user-reducer';
import { Icon } from "react-icons-kit";
import {xSquare} from 'react-icons-kit/feather/xSquare';
import {checkSquare} from 'react-icons-kit/feather/checkSquare';

const BotSelector = ({ windowWidth, sizes, selectionOptions, setSelectionOptions }) => {
	// const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	const settings = useSelector((state) => state.settings);
	const colors = useSelector(getThemeColors);
	function setBotNumberSelected (newIndex) {
		let newSelectionOptions = {...selectionOptions};
		newSelectionOptions.botNumberSelected = newIndex;
		setSelectionOptions(newSelectionOptions);
	}

  return (
		<BotSelectorWrapper
		navLocation = {settings.navLocation}
		windowWidth = {windowWidth}
		width = {sizes.width}
		gridGap = {sizes.gridGap}
		lvSelHeight = {sizes.lvSelHeight}
		lvDetailsHeight = {sizes.lvDetailsHeight}
		>
			<Selector
			height = {sizes.allOtherHeights}
			width = {sizes.width}
			className = 'centeredFlex'
			color = {colors.secondary}
			>
				<BotSelectionContainer>
					<BotSelection
					setBotNumberSelected = {setBotNumberSelected}
					botNumberSelected = {selectionOptions.botNumberSelected}
					/>
				</BotSelectionContainer>
				<BotInfo
				colors = {colors}
				>
        	<label>NAME</label>
        	<div>
						{userInfo.botBuilds[selectionOptions.botNumberSelected] && userInfo.botBuilds[selectionOptions.botNumberSelected].name}
					</div>
    		</BotInfo>
				<BotInfo
				colors = {colors}
				>
        	<label>MODEL</label>
        	<div>
					{userInfo.botBuilds[selectionOptions.botNumberSelected] && baseBotAttributes[userInfo.botBuilds[selectionOptions.botNumberSelected].model].Name.toUpperCase()}
					</div>
    		</BotInfo>
				<Verification className = 'betweenFlex'>
					AI VERIFICATION:
					<StyledIcon
					icon = {userInfo.botBuilds[selectionOptions.botNumberSelected] && userInfo.botBuilds[selectionOptions.botNumberSelected].script.length > 0 ? checkSquare : xSquare}
					pass = {userInfo.botBuilds[selectionOptions.botNumberSelected] && userInfo.botBuilds[selectionOptions.botNumberSelected].script.length > 0}
					size = {50}
					/>
				</Verification>
			</Selector>
		</BotSelectorWrapper>
  )
}

export default BotSelector;

const StyledIcon = styled(Icon)`
	color: ${props => props.pass ? 'lime' : 'red'};
`
const Verification = styled.div`
	font-size: 0.8em;
`

const BotInfo = styled.div`
	width: 100%;
	height: 50px;
	border: ${props => `3px solid ${props.colors.secondary}`};
	border-radius: 5px;
	margin: 5px 0;
	>label{
		position:relative;
  	top:-15px;
  	left:-40%;
  	background-color: ${props => props.primary};
		font-size: 0.6em;
	}
	>div{
		position: relative;
		bottom: 10px;
	}
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
const Selector = styled.div`
	/* background-color: grey; */
	flex-direction: column;
	width: ${props=>`${props.width}px`};
	height: ${props=>`${props.height}px`};
	animation: 1s ease-out 1 expandY;
	transform-origin: center top;
	padding: 5px;
	border: ${props => `5px solid ${props.color}`};
	border-radius: 10px;
`
const BotSelectionContainer = styled.div`
	width: 100%;
	height: 100px;
`