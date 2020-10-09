import React, { useState } from 'react';

import { useSelector } from "react-redux";
import { getThemeColors } from '../../../Redux/reducers/user-reducer';

import StyledIcon from '../../StyledIcon/StyledIcon';
import {plus} from 'react-icons-kit/icomoon/plus';
import {loop as swap} from 'react-icons-kit/icomoon/loop'

import styled from 'styled-components';
import Command from '../ComprehensiveAttributes/Command';

const AddIcon = ({ aiInesertionPoint }) => {
	const settings = useSelector((state) => state.settings);
	const colors = useSelector(getThemeColors);
	
  return (
    <StyledIcon
		icon = {plus}
		padding = '5'
		disabled = {aiInesertionPoint === null}
		>

    </StyledIcon>
  )
}
export default AddIcon;

const Wrapper = styled.div`
	width: 250px;
	height: 80px;
`