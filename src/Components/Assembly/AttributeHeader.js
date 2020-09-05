import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';

import {ic_brightness_auto} from 'react-icons-kit/md/ic_brightness_auto'
// Attribute

import {profile} from 'react-icons-kit/icomoon/profile'
// import {ic_recent_actors} from 'react-icons-kit/md/ic_recent_actors'
// Base

import {suitcase} from 'react-icons-kit/ikons/suitcase'			// Equipment
import {usb} from 'react-icons-kit/ionicons/usb'						// Tech
import {ic_exposure} from 'react-icons-kit/md/ic_exposure' 	// Change +/-
import {ic_change_history} from 'react-icons-kit/md/ic_change_history'
// Change %

import {sigma} from 'react-icons-kit/icomoon/sigma' 				// Total
import ToolTipIcon from '../ToolTip/ToolTipIcon';

const AttributeHeader = () => {
	return (
		<AttributeRow>
			<ToolTipIcon
			name = 'Attribute'
			iconImport = {ic_brightness_auto}
			selfLocation = 'left'
			/>
			<ToolTipIcon
			name = 'Base'
			iconImport = {profile}
			selfLocation = 'left'
			/>
			<ToolTipIcon
			name = 'Equipment'
			iconImport = {suitcase}
			selfLocation = 'center'
			/>
			<ToolTipIcon
			name = 'Tech'
			iconImport = {usb}
			selfLocation = 'center'
			/>
			<ToolTipIcon
			name = 'PlusMinus'
			iconImport = {ic_exposure}
			selfLocation = 'center'
			/>
			<ToolTipIcon
			name = 'PercentChange'
			iconImport = {ic_change_history}
			selfLocation = 'right'
			/>
			<ToolTipIcon
			name = 'Sum'
			iconImport = {sigma}
			selfLocation = 'right'
			/>
		</AttributeRow>
	)
}
export default AttributeHeader;

const AttributeRow = styled.div`
	display: grid;
	grid-template-columns: repeat(7,35px);
`