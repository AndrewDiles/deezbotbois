import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components';

import {
	updateUrl
} from '../../../Redux/actions';

import StyledButton from '../../StyledButton/StyledButton';

const ProceedButton = () => {
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	const battleInfo = useSelector((state) => state.battleInfo);
	const settings = useSelector((state) => state.settings);
	
  return (
    <StyledButton>
			{battleInfo.tick === 0 ? 'BEGIN' : 'NEXT TICK'}
		</StyledButton>
  )
}

export default ProceedButton;