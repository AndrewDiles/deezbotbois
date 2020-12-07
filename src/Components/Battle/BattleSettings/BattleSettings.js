import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import styled from 'styled-components';

import {
	updateUrl,
	setExecutionSpeed,
} from '../../../Redux/actions';

import StyledButton from '../../StyledButton/StyledButton';

import ProceedButton from './ProceedButton';
import AutoTickSetter from './AutoTickSetter';
import ExecutionSpeedSettings from './ExecutionSpeedSettings';

const BattleSettings = ({ setGameLaunched }) => {
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	const battleInfo = useSelector((state) => state.battleInfo);
	const settings = useSelector((state) => state.settings);
	
  return (
    <Wrapper>
			<div>
				VIEW BATTLE LOG
			</div>
			<div>
				VIEW CELL
			</div>
			<div>
				<ProceedButton/>
				<AutoTickSetter/>
			</div>
			<ExecutionSpeedSettings/>
		</Wrapper>
  )
}

export default BattleSettings;

const Wrapper = styled.div`
	width: 100%;
	display : flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	align-content: center;
	align-items: start;
	margin: 10px;
	>div{
		margin: 5px;
	}
`
