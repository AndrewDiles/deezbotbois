import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import StyledButton from '../../StyledButton/StyledButton';
import { deactivateProfileTab } from '../../../Redux/actions';

const ViewBattleLog = ({ viewing, setViewing }) => {
	const dispatch = useDispatch();
	const settings = useSelector((state) => state.settings);
	
  return (
    <StyledButton
		handleClick = {()=>{setViewing(viewing === 'log' ? null : 'log'); dispatch(deactivateProfileTab())}}
		sfx = 'toggle'
		>
			{viewing === 'log' ? 'CLOSE \r\n LOG' : 'OPEN \r\n LOG'}
		</StyledButton>
  )
}

export default ViewBattleLog;