import React from 'react';
import styled from 'styled-components';

const BotRobbey = ( { children,botColors, cellSize } ) => {
  let borderSize = 1+Math.floor(cellSize/100);
  let rollerWrapperBorderSize = `${borderSize+1}px`;
  borderSize = `${borderSize}px`;
  
  
  return (
      <Wrapper>
        <Head
        trim = {botColors.trim}
        color = {botColors.secondary}
        borderSize = {borderSize}
        >
          <Eye
          color = {botColors.eyes}
          />
          <Eye
          color = {botColors.eyes}
          />
        </Head>
        <Neck
        trim = {botColors.trim}
        color = {botColors.extensions}
        borderSize = {borderSize}
        />
        <Body
        trim = {botColors.trim}
        color = {botColors.primary}
        borderSize = {borderSize}
        >
          {children}
        </Body>
        <Extension
        trim = {botColors.trim}
        color = {botColors.extensions}
        borderSize = {borderSize}
        />
        <RollerWrapper
        trim = {botColors.trim}
        borderSize = {rollerWrapperBorderSize}
        color = {botColors.extensions}
        >
          <Roller
          color = {botColors.rollers}
          />
          <Roller
          color = {botColors.rollers}
          />
          <Roller
          color = {botColors.rollers}
          />
        </RollerWrapper>
        
      </Wrapper>
  )
}
export default BotRobbey;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`
const RollerWrapper = styled.div`
  position: relative;
  width: 65%;
  height: 20%;
  top: -12.5%;
  left: 17.5%;
  display: flex;
  justify-content: space-between;
  background: ${props => props.color};
  border: ${props => `${props.borderSize} solid ${props.trim}`};
  border-radius: 40%;
  padding: 0 5%;
	z-index:2;
`
const Extension = styled.div`
  position: relative;
  height: 20%;
  width: 20%;
  top: -10%;
  left: 40%;
  background: ${props => props.color};
  border: ${props => `${props.borderSize} solid ${props.trim}`};
	z-index:2;
`
const Roller = styled.div`
  position: relative;
  height: 100%;
  width: 25%;
  background: ${props => props.color};
  border-radius: 50%;
	z-index:2;
`

const Body = styled.div`
  position: relative;
  width: 50%;
  height: 40%;
  top: -5%;
  left: 25%;
  border: ${props => `${props.borderSize} solid ${props.trim}`};
  background: ${props => props.color};
  background-image: ${props => `radial-gradient(${props.color},${props.trim})`};
  border-radius: 10%;
  z-index:4;
  display: flex;
  justify-content: space-evenly;
  align-content: center;
  align-items: center;
`
const Neck = styled.div`
  position: relative;
  width: 10%;
  height: 14%;
  top: -1%;
  left: 45%;
  border: ${props => `${props.borderSize} solid ${props.trim}`};
  background: ${props => props.color};
	z-index:2;
`
const Head = styled.div`
  position: relative;
  width: 30%;
  height: 15%;
  top: 0%;
  left: 35%;
  border: ${props => `${props.borderSize} solid ${props.trim}`};
  /* background: ${props => props.color}; */
	background-image: ${props => `radial-gradient(${props.color},${props.trim})`};
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  align-content: center;
	z-index:2;
`
const Eye = styled.div`
  height: 50%;
  width: 20%;
  background-color: ${props => props.color};
  border-radius: 50%;
	z-index:2;
`