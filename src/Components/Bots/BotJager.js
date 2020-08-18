import React from 'react';
import styled from 'styled-components';

const BotJager = ( { children,botColors, cellSize } ) => {
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
        <ExtensionWrapper>
          <Extension
          trim = {botColors.trim}
          color = {botColors.extensions}
          borderSize = {borderSize}
          location = 'left'
          />
          <Extension
          trim = {botColors.trim}
          color = {botColors.extensions}
          borderSize = {borderSize}
          location = 'right'
          />
        </ExtensionWrapper>
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
export default BotJager;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`
const ExtensionWrapper = styled.div`
  position: relative;
  width: 80%;
  height: 35%;
  top: 0%;
  left: 10%;
  display: flex;
  justify-content: space-between;
  padding: 0 10%;
  overflow: hidden;
`

const Extension = styled.div`
  position: relative;
  height: 100%;
  width: 15%;
  background: ${props => props.color};
  border: ${props => `${props.borderSize} solid ${props.trim}`};
  transform: ${props => props.location === 'left' ? 'rotate(45deg)' : 'rotate(-45deg)'};
`
const RollerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 25%;
  top: -20%;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  padding: 0 10%;
`
const Roller = styled.div`
  position: relative;
  height: 75%;
  width: 20%;
  top: 0%;
  background: ${props => props.color};
  border-radius: 50%;
`

const Body = styled.div`
  position: relative;
  width: 40%;
  height: 40%;
  top: 20%;
  left: 30%;
  border: ${props => `${props.borderSize} solid ${props.trim}`};
  background: ${props => props.color};
  background-image: ${props => `radial-gradient(${props.color},${props.trim})`};
  transform: rotate(45deg);
  z-index:2;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`
const Neck = styled.div`
  position: relative;
  width: 10%;
  height: 5%;
  top: 20%;
  left: 45%;
  border: ${props => `${props.borderSize} solid ${props.trim}`};
  background: ${props => props.color};
`

const Head = styled.div`
  position: relative;
  width: 20%;
  height: 20%;
  top: 20%;
  left: 40%;
  border: ${props => `${props.borderSize} solid ${props.trim}`};
  background: ${props => props.color};
  border-radius: 50%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  align-content: center;
`
const Eye = styled.div`
  height: 25%;
  width: 25%;
  background-color: ${props => props.color};
  border-radius: 50%;
`