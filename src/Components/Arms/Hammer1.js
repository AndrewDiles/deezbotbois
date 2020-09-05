import React from 'react';
import styled from 'styled-components';

const Hammer1 = ( { botColors, cellSize, armAngle } ) => {
  let borderSize = Math.floor(cellSize/100);
  borderSize = `${borderSize}px`;
  if (armAngle === null) {
    armAngle = 315;
    // -90: up, 0: right, 90: down, 180 left, 270: up
  }
  
  return (
    <Base>
      <Shaft
      size = {cellSize}
      trim = {botColors.armTrim}
      color = {botColors.armPrimary}
      borderSize = {borderSize}
      angle = {armAngle}
      >
        <Head
        size = {cellSize}
        trim = {botColors.armTrim}
        color = {botColors.armSecondary}
        borderSize = {borderSize}
        />
      </Shaft>
    </Base>
  )
}
export default Hammer1;
const Head = styled.div`
  height: ${props => `${props.size/26}px`};
  width: ${props => `${props.size/6}px`};
  border: ${props => `${props.borderSize} solid ${props.trim}`};
  background: ${props => props.color};
  position: relative;
  left: 75%;
  transform: rotate(90deg);
  z-index:5;
`
const Shaft = styled.div`
  height: ${props => `${props.size/20}px`};
  width: ${props => `${props.size/4}px`};
  border: ${props => `${props.borderSize} solid ${props.trim}`};
  background: ${props => props.color};
  position: relative;
  /* top: -100%; */
  left: 40%;
  transform-origin: left;
  transform: ${props => `rotate(${props.angle}deg)`};
  z-index:4;
`
const Base = styled.div`
z-index: 3;
`