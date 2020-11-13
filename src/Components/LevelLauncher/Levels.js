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

const Levels = ({ windowWidth, selectionOptions, setSelectionOptions }) => {
	// const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	const settings = useSelector((state) => state.settings);
	const sizes = {
		width: 300,
		lvSelHeight: 200,
		lvDetailsHeight: 650,
		allOtherHeights: 400,
		gridGap: 50,
	}
	
  return (
    <div>
			<LevelSelector
			windowWidth = {windowWidth}
			sizes = {sizes}
			selectionOptions = {selectionOptions}
			setSelectionOptions = {setSelectionOptions}
			/>
			<LevelSelectorExtension
			windowWidth = {windowWidth}
			sizes = {sizes}
			selectionOptions = {selectionOptions}
			/>
			<LevelDetails
			windowWidth = {windowWidth}
			sizes = {sizes}
			selectionOptions = {selectionOptions}
			setSelectionOptions = {setSelectionOptions}
			/>
			<BotSelector
			windowWidth = {windowWidth}
			sizes = {sizes}
			selectionOptions = {selectionOptions}
			setSelectionOptions = {setSelectionOptions}
			/>
			<ViewLayout
			windowWidth = {windowWidth}
			sizes = {sizes}
			selectionOptions = {selectionOptions}
			setSelectionOptions = {setSelectionOptions}
			/>
			<ViewHostiles
			windowWidth = {windowWidth}
			sizes = {sizes}
			selectionOptions = {selectionOptions}
			setSelectionOptions = {setSelectionOptions}
			/>
			<ViewAchievements
			windowWidth = {windowWidth}
			sizes = {sizes}
			selectionOptions = {selectionOptions}
			setSelectionOptions = {setSelectionOptions}
			/>
			{/* LAUNCH LEVEL */}

    </div>
  )
}

export default Levels;
