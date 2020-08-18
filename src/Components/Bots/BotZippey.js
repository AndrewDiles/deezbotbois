import React from 'react';
import styled from 'styled-components';

const BotZippey = ( { children,botColors, cellSize } ) => {
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
        </Head>
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
        <Roller
        color = {botColors.rollers}
        />
      </Wrapper>
  )
}
export default BotZippey;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`
const Extension = styled.div`
  position: relative;
  height: 25%;
  width: 8%;
  top: -55%;
  left: 46%;
  background: ${props => props.color};
  border: ${props => `${props.borderSize} solid ${props.trim}`};
`
const Roller = styled.div`
  position: relative;
  height: 25%;
  width: 15%;
  top: -60%;
  left: 42.5%;
  background: ${props => props.color};
  border-radius: 40%;
`

const Body = styled.div`
  position: relative;
  width: 30%;
  height: 50%;
  top: -50%;
  left: 35%;
  border: ${props => `${props.borderSize} solid ${props.trim}`};
  background: ${props => props.color};
  background-image: ${props => `radial-gradient(${props.color},${props.trim})`};
  border-radius: 20%;
  z-index:2;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`
const Head = styled.div`
  position: relative;
  width: 20%;
  height: 60%;
  top: 0%;
  left: 40%;
  border: ${props => `${props.borderSize} solid ${props.trim}`};
  background: ${props => props.color};
  border-radius: 50%;
  display: flex;
  justify-content: space-evenly;
  align-items: top;
  align-content: center;
`
const Eye = styled.div`
  height: 10%;
  width: 20%;
  background-color: ${props => props.color};
  border-radius: 50%;
`