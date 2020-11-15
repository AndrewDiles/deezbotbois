import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import LevelSelector from './LevelSelector';
import LevelSelectorExtension from './LevelSelectorExtension';
import BotSelector from './BotSelector';
import LevelDetails from './LevelDetails';
import ViewLayout from './ViewLayout';
import ViewHostiles from './ViewHostiles';
import ViewAchievements from './ViewAchievements';

const Levels = ({ selectionOptions, setSelectionOptions }) => {
	// const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	const settings = useSelector((state) => state.settings);
	
  return (
    <div>
			<LevelSelector
			selectionOptions = {selectionOptions}
			setSelectionOptions = {setSelectionOptions}
			/>
			<LevelSelectorExtension
			selectionOptions = {selectionOptions}
			/>
			<LevelDetails
			selectionOptions = {selectionOptions}
			setSelectionOptions = {setSelectionOptions}
			/>
			<BotSelector
			selectionOptions = {selectionOptions}
			setSelectionOptions = {setSelectionOptions}
			/>
			<ViewLayout
			selectionOptions = {selectionOptions}
			setSelectionOptions = {setSelectionOptions}
			/>
			<ViewHostiles
			selectionOptions = {selectionOptions}
			/>
			<ViewAchievements
			selectionOptions = {selectionOptions}
			setSelectionOptions = {setSelectionOptions}
			/>
			{/* TODO: Add a moving component that is invisible and allows the user to scroll lower? */}
			{/* LAUNCH LEVEL */}
    </div>
  )
}

export default Levels;
