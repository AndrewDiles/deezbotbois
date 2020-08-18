import React from 'react';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import {colors} from '../../Constants/colorSchemes';

const StyledIcon = ( { handleClick, disabled, selected, children, icon} ) => {
  return (
      <IconStylings
      disabled = {disabled || null}
      onClick = {(ev)=> {handleClick(ev)}}
      icon = {icon}
      selected = {selected}
      children = {children}
      size = {32}
      colors = {colors}
      >
        {children}
      </IconStylings>
  )
}
export default StyledIcon;

const IconStylings = styled(Icon)`
  padding: 5px;
  position: relative;
  color: ${props => props.textColor};
  background-color: ${props => props.selected ? props.selected : props.notSelected};
  margin: 5px;
  border-radius: 5px;
  font-weight: bolder;
  text-align: center;
  transition: background-color .75s;
  &:hover {
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    background-color: ${props => props.colors.hovered};
  }
`