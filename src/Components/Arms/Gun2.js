import React from 'react';
import styled from 'styled-components';

const Gun2 = ( { botColors, cellSize, armAngle } ) => {
  let borderSize = Math.floor(cellSize/100);
  borderSize = `${borderSize}px`;
  if (armAngle === null) {
    armAngle = 0;
  }
  
  return (
    <Base
      size = {cellSize}
      trim = {botColors.armTrim}
      color = {botColors.armPrimary}
      borderSize = {borderSize}>
      <Barrel
      size = {cellSize}
      trim = {botColors.armTrim}
      color = {botColors.armPrimary}
      borderSize = {borderSize}
      angle = {armAngle}
      >
      </Barrel>
    </Base>
  )
}
export default Gun2;
const Barrel = styled.div`
  height: ${props => `${props.size/25}px`};
  width: ${props => `${props.size/4}px`};
  border: ${props => `${props.borderSize} solid ${props.trim}`};
  background: ${props => props.color};
  position: relative;
  left: 20%;
  transform-origin: left;
  transform: ${props => `rotate(${props.angle}deg)`};
	transition: transform 0.25s ease-out;
  z-index:4;
`
const Base = styled.div`
  height: ${props => `${props.size/15}px`};
  width: ${props => `${props.size/15}px`};
  border: ${props => `${props.borderSize} solid ${props.trim}`};
  background: ${props => props.color};
  border-radius: 50%;
  z-index:3;
`