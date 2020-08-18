import React from 'react';
import styled from 'styled-components';
import {colors} from '../../Constants/colorSchemes';

const StyledButton = ( { handleClick, disabled, selected, children} ) => {

  return (
      <ButtonStylings
      disabled = {disabled || null}
      onClick = {(ev)=> {handleClick(ev)}}
      selected = {selected}
      children = {children}
      colors = {colors}
      >
        {children}
      </ButtonStylings>
  )
}
export default StyledButton;

const ButtonStylings = styled.button`
  width: 100px;
  padding: 5px;
  position: relative;
  color: black;
  background-color: ${props => props.selected ? 'rgba(207, 181, 59, 0.8)' : 'rgba(255,255,255,0.3)'};
  margin: 5px;
  border-radius: 5px;
  font-weight: bolder;
  text-align: center;
  transition: background-color .75s;
  &:hover {
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    background-color: silver;
  }
`