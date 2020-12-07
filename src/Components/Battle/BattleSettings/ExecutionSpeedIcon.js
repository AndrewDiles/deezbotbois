import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setExecutionSpeed } from '../../../Redux/actions';
import StyledIcon from '../../StyledIcon/StyledIcon';

const ExecutionSpeedIcon = ({ icon, value}) => {
	const dispatch = useDispatch();
	// const userInfo = useSelector((state) => state.userInfo);
	// const battleInfo = useSelector((state) => state.battleInfo);
	const settings = useSelector((state) => state.settings);
	
  return (
		//TODO: Return to set disabled
		// icon buttons to be disabled if in a turn or if on auto
		<StyledIcon
		handleClick = {()=>{dispatch(setExecutionSpeed(value))}}
		padding = {5}
		icon = {icon}
		selected = {value === settings.executionSpeed}
		disabled = {false}
		sfx = 'selected'
		/>
  )
}

export default ExecutionSpeedIcon;