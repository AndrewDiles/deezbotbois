import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import {
	firstTick,
	determineCommands,
	addNewBattleLogs
} from '../../Redux/actions';

import getNextCommand from '../../Constants/scriptHelpers/getNextCommand';


const GameLogic = () => {
	const settings = useSelector((state) => state.settings);
	const battleInfo = useSelector((state) => state.battleInfo);
	const dispatch = useDispatch();

	useEffect(()=>{
		if (battleInfo.status === 'NEW_TICK') {
			dispatch(determineCommands());
		} else if (battleInfo.status === 'DETERMINING_COMMANDS') {
			let battleLogEntriesToAdd = [];
			console.log('time to find commands');
			battleInfo.objectsToRender.forEach((bot, index)=>{
				const nextCommandResults = getNextCommand(battleInfo.objectsToRender, index, battleInfo.levelInfo);
				console.log({nextCommandResults});
				battleLogEntriesToAdd = [...battleLogEntriesToAdd, ...nextCommandResults.battleLogEntries];
				console.log({battleLogEntriesToAdd});
			})
			dispatch(addNewBattleLogs(battleLogEntriesToAdd));
		}else if (battleInfo.status === 'FIRST_TICK') {
			dispatch(firstTick());
		} 
	},[battleInfo.status])

	return null
}

export default GameLogic;