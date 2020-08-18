import React from 'react';
import styled from 'styled-components';

const BotBoxie = ( { children,botColors, cellSize } ) => {
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
        </RollerWrapper>
      </Wrapper>
  )
}
export default BotBoxie;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`
const Roller = styled.div`
  height: 200%;
  width: 100%;
  background: ${props => props.color};
  border-radius: 50% 50% 0 0;
  overflow: hidden;
`
const RollerWrapper = styled.div`
  position: relative;
  width: 90%;
  height: 25%;
  top: -25%;
  left: 5%;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
`
const Body = styled.div`
  position: relative;
  width: 70%;
  height: 70%;
  top: -5%;
  left: 15%;
  border: ${props => `${props.borderSize} solid ${props.trim}`};
  background: ${props => props.color};
  background-image: ${props => `radial-gradient(${props.color},${props.trim})`};
  border-radius: 50%;
  z-index:2;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`
const Neck = styled.div`
  position: relative;
  width: 5%;
  height: 5%;
  top: -2%;
  left: 47.5%;
  border: ${props => `${props.borderSize} solid ${props.trim}`};
  border-radius: 50%;
  background: ${props => props.color};
`
const Head = styled.div`
  position: relative;
  width: 20%;
  height: 20%;
  top: 0%;
  left: 40%;
  border: ${props => `${props.borderSize} solid ${props.trim}`};
  border-radius: 50%;
  background: ${props => props.color};
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  align-content: center;
  
`
const Eye = styled.div`
  height: 20%;
  width: 20%;
  background-color: ${props => props.color};
`