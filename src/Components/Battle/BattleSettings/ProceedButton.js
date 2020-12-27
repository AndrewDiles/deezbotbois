import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components';

import {
	updateUrl,
	launchBattle,
	nextTick
} from '../../../Redux/actions';

import StyledButton from '../../StyledButton/StyledButton';
import LoadingAnimation from '../../LoadingAnimation/LoadingAnimation';

const ProceedButton = () => {
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	const battleInfo = useSelector((state) => state.battleInfo);
	const settings = useSelector((state) => state.settings);
	const viewResults = () => {
		// open modal to view new records, collect rewards and return to level select screen
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
		disabled = {battleInfo.status !== 'AWAITING_USER_INPUT'}
		>
			{battleInfo.status === 'AWAITING_USER_INPUT' ? (
				battleInfo.battleHasOutcome ? 'VIEW RESULTS' : battleInfo.status !== 'AWAITING_USER_INPUT' ? 'IN PROGRESS' :battleInfo.tick === 0 ? 'BEGIN BATTLE' : 'NEXT TICK'
			):(
				<LoadingAnimation
				size = {40}
				botToDisplay = {battleInfo.objectsToRender[0]}
				/>
			)}
			
		</StyledButton>
  )
}

export default ProceedButton;