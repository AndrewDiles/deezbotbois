import React from 'react';
import styled from 'styled-components';

const BotBoxey = ( { children,botColors, cellSize } ) => {
  let borderSize = 1+Math.floor(cellSize/100);
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
        <RollerWrapper>
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
export default BotBoxey;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`
const Roller = styled.div`
  height: 100%;
  width: 25%;
  background: ${props => props.color};
  border-radius: 50%;
	z-index:2;
`
const RollerWrapper = styled.div`
  position: relative;
  width: 60%;
  height: 15%;
  top: -5%;
  left: 20%;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
	z-index:2;
`
const Body = styled.div`
  position: relative;
  width: 60%;
  height: 60%;
  top: 0%;
  left: 20%;
  border: ${props => `${props.borderSize} solid ${props.trim}`};
  background: ${props => props.color};
  background-image: ${props => `radial-gradient(${props.color},${props.trim})`};
  border-radius: 25% 25% 0 0;
  z-index:4;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`
const Neck = styled.div`
  position: relative;
  width: 12.5%;
  height: 10%;
  top: 3%;
  left: 43.75%;
  border: ${props => `${props.borderSize} solid ${props.trim}`};
  background: ${props => props.color};
	z-index:2;
`
const Head = styled.div`
  position: relative;
  width: 25%;
  height: 12.5%;
  top: 5%;
  left: 37.5%;
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
  height: 20%;
  width: 20%;
  background-color: ${props => props.color};
	z-index:2;
`