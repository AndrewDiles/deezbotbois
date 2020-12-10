import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import StyledButton from '../../StyledButton/StyledButton';
import { deactivateProfileTab } from '../../../Redux/actions';

const InspectCellButton = ({ viewing, setViewing }) => {
	const dispatch = useDispatch();
	const settings = useSelector((state) => state.settings);
	
  return (
    <StyledButton
		handleClick = {()=>{setViewing(viewing === 'cell' ? null : 'cell'); dispatch(deactivateProfileTab())}}
		sfx = 'toggle'
		>
			{viewing === 'cell' ? 'CLOSE INSPECTOR' : 'OPEN INSPECTOR'}
		</StyledButton>
  )
}

export default InspectCellButton;