import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components';
import StyledButton from '../../StyledButton/StyledButton';
import {
	updateUrl
} from '../../../Redux/actions';

const ViewBattleLog = ({ viewing, setViewing }) => {
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	const battleInfo = useSelector((state) => state.battleInfo);
	const settings = useSelector((state) => state.settings);
	
  return (
    <StyledButton
		handleClick = {()=>{setViewing(viewing === 'log' ? null : 'log')}}
		>
			{viewing === 'log' ? 'CLOSE \r\n LOG' : 'OPEN \r\n LOG'}
		</StyledButton>
  )
}

export default ViewBattleLog;