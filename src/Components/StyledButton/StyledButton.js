import React from 'react';
import styled from 'styled-components';
import { useSelector } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';

const StyledButton = ( { handleClick, disabled, selected, children} ) => {
  const userInfo = useSelector((state) => state.userInfo);
  const colors = useSelector(getThemeColors);
  // To be completed - add theme customization via props or selector?
  
  if (handleClick === undefined) {
    handleClick = () => {
      console.log('clicked styled button without a handle click function')
    }
  }
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
  background-color: ${props => props.selected ? 'rgba(207, 181, 59, 0.8)' : 'rgba(255,255,255,0.3)'};
  margin: 5px;
  border-radius: 5px;
  border: 1px solid transparent;
  font-size: 14px;
  font-weight: 500;
  font-family: Roboto, sans-serif;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px;
  color: ${props => props.colors.buttonText};
  transition: color .75s, background-color .75s;
  &:hover {
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    background-color: silver;
    color: white;
  }
`