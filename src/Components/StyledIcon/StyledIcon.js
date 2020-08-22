import React from 'react';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import { useSelector } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';

const StyledIcon = ( { handleClick, disabled, selected, children, icon} ) => {
  const colors = useSelector(getThemeColors);

  return (
      <IconStylings
      disabled = {disabled || null}
      onClick = {(ev)=> {handleClick(ev)}}
      icon = {icon}
      selected = {selected}
      children = {children}
      size = {30}
      colors = {colors}
      >
        {children}
      </IconStylings>
  )
}
export default StyledIcon;

const IconStylings = styled(Icon)`
  height: 40px;
  width: 40px;
  padding: 5px;
  position: relative;
  color: ${props => props.colors.buttonText};
  background-color: ${props => props.selected ? props.selected : props.notSelected};
  margin: 5px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px;
  text-align: center;
  transition: color .75s, background-color .75s;
  &:hover {
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    background-color: ${props => props.colors.hovered};
    color: white;
  }
`