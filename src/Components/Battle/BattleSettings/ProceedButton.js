import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components';

import {
	updateUrl,
	launchBattle,
	nextTick
} from '../../../Redux/actions';

import StyledButton from '../../StyledButton/StyledButton';

const ProceedButton = () => {
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	const battleInfo = useSelector((state) => state.battleInfo);
	const settings = useSelector((state) => state.settings);

	const viewResults = () => {

	}
	const beginBattle = () => {
		dispatch(launchBattle())
	}
	const incrementTick = () => {
		dispatch(nextTick())
	}
	
  return (
    <StyledButton
		handleClick = {battleInfo.battleHasOutcome ? viewResults : battleInfo.status === 'AWAITING_USER_INPUT' ? battleInfo.tick === 0 ? beginBattle : incrementTick : ()=>{}}
		sfx = {battleInfo.battleHasOutcome ? 'toggle' : battleInfo.status === 'AWAITING_USER_INPUT' ? battleInfo.tick === 0 ? 'confirm' : 'selected' : 'disabled'}
		>
			{battleInfo.battleHasOutcome ? 'VIEW RESULTS' : battleInfo.tick === 0 ? 'BEGIN BATTLE' : 'NEXT TICK'}
		</StyledButton>
  )
}

export default ProceedButton;