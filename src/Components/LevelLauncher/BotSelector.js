import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import BotSelection from '../Assembly/BotSelection';
import baseBotAttributes from '../../Constants/attributes';
import { getThemeColors } from '../../Redux/reducers/user-reducer';
import { Icon } from "react-icons-kit";
import {xSquare} from 'react-icons-kit/feather/xSquare';
import {checkSquare} from 'react-icons-kit/feather/checkSquare';

const BotSelector = ({ selectionOptions, setSelectionOptions }) => {
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
		>
			<Selector
			className = 'startFlex'
			color = {colors.secondary}
			>
				<Title>
					YOUR BOT INFO
				</Title>
				<br/>
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
					pass = {userInfo.botBuilds[selectionOptions.botNumberSelected] && userInfo.botBuilds[selectionOptions.botNumberSelected].script.length > 0 ? 1 : 0}
					size = {50}
					/>
				</Verification>
			</Selector>
		</BotSelectorWrapper>
  )
}

export default BotSelector;

const Title = styled.div`
	margin: 10px 0;
	font-size: 18px;
`

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
	transform: translate(-150px, 950px);
	@media screen and (min-width: ${props => props.navLocation === 'top' ? 
		'650px': '785px'}
	) {
		transform: translate(-325px, 250px);
  }
	@media screen and (min-width: ${props => props.navLocation === 'top' ? 
		'1000px': '1135px'}
	) {
		transform: translate(25px, 0px);
  }
	transition: transform .75s ease-in-out;
`
const Selector = styled.div`
	/* background-color: grey; */
	flex-direction: column;
	width: 300px;
	height: 400px;
	animation: .75s ease-out 1 expandY;
	transform-origin: center top;
	padding: 5px;
	border: ${props => `5px solid ${props.color}`};
	border-radius: 10px;
`
const BotSelectionContainer = styled.div`
	width: 100%;
	height: 100px;
`