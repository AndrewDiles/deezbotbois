import React from 'react';
import { useDispatch } from 'react-redux';
import StyledButton from '../StyledButton/StyledButton';

import {
	logOut,
	deactivateProfileTab,
	resetColorTesting,
	setVolume
} from '../../Redux/actions';

function Logout() {
  const dispatch = useDispatch();

  return (
    <StyledButton
      handleClick = {()=>{
				dispatch(logOut());
				dispatch(setVolume(0));
				dispatch(deactivateProfileTab());
				dispatch(resetColorTesting());
			}}
      >
				LOG OUT
    </StyledButton>
  );
}
export default Logout;