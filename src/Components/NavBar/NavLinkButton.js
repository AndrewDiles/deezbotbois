import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import styled from 'styled-components';
import { updateUrl } from '../../Redux/actions';
import StyledButton from '../StyledButton/StyledButton';

function NavLinkButton({ destination, innerText }) {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  return (
    <NavLinkButtonWrapper to = {`/${destination}`} tabIndex="-1" nodisplays = {1} navlocation = {settings.navLocation}>
      <StyledButton
			handleClick = {() => {dispatch(updateUrl(destination))}}
			selected = {settings.currentUrl === destination}
			disabled = {settings.currentUrl === destination}
			sfx = 'selected'
      >
        {innerText ? innerText : destination.toUpperCase()}
      </StyledButton>
    </NavLinkButtonWrapper>
  );
}
export default NavLinkButton;

const NavLinkButtonWrapper = styled(NavLink)`
  width: 125px;
	height: 40px;
	margin: 5px;
	border-radius: 5px;
  border: 1px solid transparent;
	@media (max-width: 900px) {
		display: ${props => props.nodisplays && props.navlocation === 'top' && 'none'};
	}
`