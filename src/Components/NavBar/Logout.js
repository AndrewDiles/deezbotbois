import React from 'react';
import { useDispatch } from 'react-redux';
import StyledButton from '../StyledButton/StyledButton';

import {
	logOut,
	deactivateProfileTab,
	resetColorTesting,
	setMusic,
	setSfx
} from '../../Redux/actions';

function Logout() {
  const dispatch = useDispatch();

  return (
    <StyledButton
		sfx = 'disabled'
    handleClick = {()=>{
			dispatch(logOut());
			dispatch(setMusic(false));
			dispatch(setSfx(false));
			dispatch(deactivateProfileTab());
			dispatch(resetColorTesting());
		}}
    >
			LOG OUT
    </StyledButton>
  );
}
export default Logout;