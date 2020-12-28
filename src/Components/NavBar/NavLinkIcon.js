import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import styled from 'styled-components';
import { updateUrl } from '../../Redux/actions';
import StyledIcon from '../StyledIcon/StyledIcon';
import {home} from 'react-icons-kit/icomoon/home';
import {library} from 'react-icons-kit/icomoon/library';
import {alertOctagon} from 'react-icons-kit/feather/alertOctagon'
import {qrcode} from 'react-icons-kit/icomoon/qrcode';
import {barcode} from 'react-icons-kit/icomoon/barcode';
import {user} from 'react-icons-kit/icomoon/user';

function NavLinkIcon({ destination }) {
  const dispatch = useDispatch();
	const settings = useSelector((state) => state.settings);
	const [hasFocus, setHasFocus] = React.useState(0);
	let icon;
  switch(destination) {
		case 'home' : {
			icon = home;
			break;
		}
		case 'rules' : {
			icon = library;
			break;
		}
    case 'test' : {
			icon = qrcode;
			break;
		}
		case 'test2' : {
			icon = barcode;
			break;
		}
		case 'altLogin' : {
			icon = user;
			break;
		}
		default : {
			icon = alertOctagon;
		}
	}
	
  return (
		<NavLinkIconWrapper
		id = {`NavLinkTo${destination}`}
		to = {`/${destination}`}
		navlocation = {settings.navLocation}
		onFocus = {()=>{setHasFocus(1)}}
		onBlur = {()=>{setHasFocus(0)}}
		tabIndex = {settings.currentUrl === destination ? '-1' : ''}
		>
			<StyledIcon
			handleClick = {() => {dispatch(updateUrl(destination))}}
			selected = {settings.currentUrl === destination || hasFocus}
			disabled = {settings.currentUrl === destination}
			padding = {5}
			icon = {icon}
			sfx = 'confirm'
			/>
		</NavLinkIconWrapper>
	)
}

export default NavLinkIcon;
const NavLinkIconWrapper = styled(NavLink)`
	display: ${props => props.navlocation === 'left' && 'none'};
	@media (min-width: 901px) {
		display: none;
	}
`