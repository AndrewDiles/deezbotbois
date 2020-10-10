import React, { useState } from 'react';

import { useSelector } from "react-redux";
import { getThemeColors } from '../../../Redux/reducers/user-reducer';

import StyledIcon from '../../StyledIcon/StyledIcon';
import {plus} from 'react-icons-kit/icomoon/plus';
import {loop as swap} from 'react-icons-kit/icomoon/loop'

import styled from 'styled-components';
import Command from '../ComprehensiveAttributes/Command';

const InsertionIcon = ({ aiAndScripts, decisionName }) => {
	const settings = useSelector((state) => state.settings);
	const colors = useSelector(getThemeColors);
	// console.log(decisionName)
  return (
    <StyledIcon
		icon = {plus}
		padding = '5'
		disabled = {aiAndScripts === null}
		>

    </StyledIcon>
  )
}
export default InsertionIcon;

const Wrapper = styled.div`
	width: 250px;
	height: 80px;
`