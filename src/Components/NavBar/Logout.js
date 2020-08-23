import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StyledButton from '../StyledButton/StyledButton';

import {
	logOut,
	deactivateProfileTab
} from '../../Redux/actions';

function Logout() {
  const dispatch = useDispatch();

  return (
    <StyledButton
      handleClick = {()=>{dispatch(logOut());dispatch(deactivateProfileTab())}}
      >
				LOG OUT
    </StyledButton>
  );
}
export default Logout;