import React from 'react';
import styled from 'styled-components';

const Sword1 = ( { botColors, cellSize, armAngle } ) => {
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
      color = {botColors.armSecondary}
      borderSize = {borderSize}
      angle = {armAngle}
      >
        <Hilt
        size = {cellSize}
        trim = {botColors.armTrim}
        color = {botColors.armPrimary}
        borderSize = {borderSize}
        />
				{/* <Tip
				size = {cellSize}
      	trim = {botColors.armTrim}
      	color = {botColors.armSecondary}
      	borderSize = {borderSize}
      	angle = {armAngle}
				/> */}
      </Shaft>
			
    </Base>
  )
}
export default Sword1;
const Hilt = styled.div`
  height: ${props => `${props.size/32}px`};
  width: ${props => `${props.size/8}px`};
  border: ${props => `${props.borderSize} solid ${props.trim}`};
  background: ${props => props.color};
  position: relative;
  /* left: 20%; */
  transform: rotate(90deg);
  z-index:5;
`
const Shaft = styled.div`
  height: ${props => `${props.size/25}px`};
  width: ${props => `${props.size/4}px`};
  border: ${props => `${props.borderSize} solid ${props.trim}`};
  background: ${props => props.color};
  position: relative;
  /* top: -100%; */
  left: 40%;
  transform-origin: left;
  transform: ${props => `rotate(${props.angle}deg)`};
	transition: transform 0.25s ease-out;
  z-index:4;
`
const Base = styled.div`
	z-index: 3;
`
// const Tip = styled.div`
//   height: ${props => `${props.size/36}px`};
//   width: ${props => `${props.size/36}px`};
// 	/* border: ${props => `${props.borderSize} solid ${props.trim}`}; */
//   background: ${props => props.color};
//   position: relative;
//   left: 95%;
// 	top: ${props => props.borderSize === '0px' ? '-88%' : props.borderSize === '1px' ? '-150%' : '-180%'};
//   transform-origin: left;
//   transform: rotate(45deg);
//   z-index:3;
// `