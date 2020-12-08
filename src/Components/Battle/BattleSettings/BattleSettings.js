import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import styled from 'styled-components';

import {
	updateUrl,
	setExecutionSpeed,
} from '../../../Redux/actions';

import StyledButton from '../../StyledButton/StyledButton';

import ViewBattleLogButton from './ViewBattleLogButton';
import InspectCellButton from './InspectCellButton';
import ProceedButton from './ProceedButton';
import AutoTickSetter from './AutoTickSetter';
import ExecutionSpeedSettings from './ExecutionSpeedSettings';

const BattleSettings = ({ setGameLaunched }) => {
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	const battleInfo = useSelector((state) => state.battleInfo);
	const settings = useSelector((state) => state.settings);
	const [viewing, setViewing] = React.useState(null);
	
	// TODO: Create a modal that only exists if viewing is: log, cell, or end

  return (
    <Wrapper className = 'centeredFlex'>
			<ButtonContainer
			className = 'centeredFlex'
			shrink = {1}
			>
				<ViewBattleLogButton
				viewing = {viewing}
				setViewing = {setViewing}
				/>
				<InspectCellButton
				viewing = {viewing}
				setViewing = {setViewing}
				/>
			</ButtonContainer>
			<ButtonContainer className = 'centeredFlex'>
				<ProceedButton/>
				<AutoTickSetter/>
			</ButtonContainer>
			<ExecutionSpeedSettings/>
		</Wrapper>
  )
}

export default BattleSettings;

const Wrapper = styled.div`
	width: 100%;
	flex-wrap: wrap;
	>div{
		margin: 5px;
	}
	animation: .5s ease-out 1 expandY;
`
const ButtonContainer = styled.div`
	height: 82px;
	padding: 0 5px;
	>div{
		margin: 0 5px;
	}
	>button{
		margin: 0 5px;
	}
	@media screen and (max-width: 546px) {
		height: ${props => props.shrink && '50px'};
  }
`
