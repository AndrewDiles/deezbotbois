import React from 'react';
import styled from 'styled-components';

const Gun1 = ( { botColors, cellSize, armAngle } ) => {
  let borderSize = Math.floor(cellSize/100);
  borderSize = `${borderSize}px`;
  if (armAngle === null) {
    armAngle = 0;
    // -90: up, 0: right, 90: down, 180 left, 270: up
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
export default Gun1;
const Barrel = styled.div`
  height: ${props => `${props.size/30}px`};
  width: ${props => `${props.size/5}px`};
  border: ${props => `${props.borderSize} solid ${props.trim}`};
  background: ${props => props.color};
  position: relative;
  left: 20%;
  transform-origin: left;
  transform: ${props => `rotate(${props.angle}deg)`};
  z-index:4;
`
const Base = styled.div`
  height: ${props => `${props.size/20}px`};
  width: ${props => `${props.size/20}px`};
  border: ${props => `${props.borderSize} solid ${props.trim}`};
  background: ${props => props.color};
  border-radius: 50%;
  z-index:3;
`