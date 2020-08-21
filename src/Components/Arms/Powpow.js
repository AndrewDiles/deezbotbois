import React from 'react';
import styled from 'styled-components';

const Powpow = ( { botColors, cellSize, armAngle } ) => {
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
export default Powpow;
const Barrel = styled.div`
  height: ${props => `${props.size/20}px`};
  width: ${props => `${props.size/3}px`};
  border: ${props => `${props.borderSize} solid ${props.trim}`};
  background: ${props => props.color};
  position: relative;
  left: 20%;
  transform-origin: left;
  transform: ${props => `rotate(${props.angle}deg)`};
  z-index:4;
`
const Base = styled.div`
  height: ${props => `${props.size/12}px`};
  width: ${props => `${props.size/12}px`};
  border: ${props => `${props.borderSize} solid ${props.trim}`};
  background: ${props => props.color};
  border-radius: 50%;
  z-index:3;
`