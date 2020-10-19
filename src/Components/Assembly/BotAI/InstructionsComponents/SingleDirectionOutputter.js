import React from 'react';
import StyledIcon from '../../../StyledIcon/StyledIcon';
import {arrowUpLeft} from 'react-icons-kit/icomoon/arrowUpLeft';
import {arrowUp} from 'react-icons-kit/icomoon/arrowUp';
import {arrowUpRight} from 'react-icons-kit/icomoon/arrowUpRight';
import {arrowLeft} from 'react-icons-kit/icomoon/arrowLeft';
import {arrowRight} from 'react-icons-kit/icomoon/arrowRight';
import {arrowDownLeft} from 'react-icons-kit/icomoon/arrowDownLeft';
import {arrowDown} from 'react-icons-kit/icomoon/arrowDown';
import {arrowDownRight} from 'react-icons-kit/icomoon/arrowDownRight';
import {question} from 'react-icons-kit/icomoon/question'

const SingleDirectionOutputter = ({ direction }) => {
	let iconImport = null;
	switch(direction) {
		case 'UL' : {
			iconImport = arrowUpLeft;
			break;
		}
		case 'U' : {
			iconImport = arrowUp;
			break;
		}
		case 'UR' : {
			iconImport = arrowUpRight;
			break;
		}
		case 'R' : {
			iconImport = arrowRight;
			break;
		}
		case 'DR' : {
			iconImport = arrowDownRight;
			break;
		}
		case 'D' : {
			iconImport = arrowDown;
			break;
		}
		case 'DL' : {
			iconImport = arrowDownLeft;
			break;
		}
		case 'L' : {
			iconImport = arrowLeft;
			break;
		}
		default : {
			iconImport = question;
		}
	}

	return (
		<StyledIcon
		padding = {2}
		size = {20}
		icon = {iconImport}
		selected = {true}
		/>
	)
}
export default SingleDirectionOutputter;