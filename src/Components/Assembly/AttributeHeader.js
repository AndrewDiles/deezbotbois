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
import StyledIcon from '../StyledIcon/StyledIcon';

const AttributeHeader = () => {
	return (
		<AttributeRow>
			<StyledIcon
			value = {'Attribute'}
			// handleClick = {()=>{handleRotateBot('left')}}
			// padding = {5}
			icon = {ic_brightness_auto}
			size = {15}
    	/>
			<StyledIcon
			value = {'Base'}
			// handleClick = {()=>{handleRotateBot('left')}}
			// padding = {5}
			icon = {profile}
			size = {15}
    	/>
			<StyledIcon
			value = {'Equipment'}
			// handleClick = {()=>{handleRotateBot('left')}}
			// padding = {5}
			icon = {suitcase}
			size = {15}
    	/>
			<StyledIcon
			value = {'Tech'}
			// handleClick = {()=>{handleRotateBot('left')}}
			// padding = {5}
			icon = {usb}
			size = {15}
    	/>
			<StyledIcon
			value = {'PlusMinus'}
			// handleClick = {()=>{handleRotateBot('left')}}
			// padding = {5}
			icon = {ic_exposure}
			size = {15}
    	/>
			<StyledIcon
			value = {'PercentChange'}
			// handleClick = {()=>{handleRotateBot('left')}}
			// padding = {5}
			icon = {ic_change_history}
			size = {15}
    	/>
			<StyledIcon
			value = {'Sum'}
			// handleClick = {()=>{handleRotateBot('left')}}
			// padding = {5}
			icon = {sigma}
			size = {15}
    	/>
		</AttributeRow>
	)
}
export default AttributeHeader;

const AttributeRow = styled.div`
	display: grid;
	grid-template-columns: repeat(7,35px);
`