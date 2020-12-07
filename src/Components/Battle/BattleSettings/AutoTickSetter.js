import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { toggleAutoTick } from '../../../Redux/actions';
import LabeledContainer from '../../LabeledContainer/LabeledContainer';
import StyledIcon from '../../StyledIcon/StyledIcon';
import {xSquare} from 'react-icons-kit/feather/xSquare';
import {checkSquare} from 'react-icons-kit/feather/checkSquare';

const AutoTickSetter = () => {
	const dispatch = useDispatch();
	// const userInfo = useSelector((state) => state.userInfo);
	// const battleInfo = useSelector((state) => state.battleInfo);
	const settings = useSelector((state) => state.settings);
	
	//TODO: Return to set disabled
	// icon buttons to be disabled if in a turn or if on auto
  return (
		<LabeledContainer
		label = 'AUTO'
		>
			<StyledIcon
			handleClick = {()=>{dispatch(toggleAutoTick())}}
			padding = {5}
			icon = {settings.autoTick ? checkSquare : xSquare}
			disabled = {false}
			sfx = 'toggle'
			/>
		</LabeledContainer>
  )
}

export default AutoTickSetter;