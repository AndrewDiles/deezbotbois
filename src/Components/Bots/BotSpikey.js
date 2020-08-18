import React from 'react';
import styled from 'styled-components';

const BotSpikey = ( { children,botColors, cellSize } ) => {
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
        <SpikeWrapper>
          <Spike
          color = {botColors.armSecondary}
          trim = {botColors.armTrim}
          borderSize = {borderSize}
          />
          <Spike
          color = {botColors.armSecondary}
          trim = {botColors.armTrim}
          borderSize = {borderSize}
          />
        </SpikeWrapper>
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
          location = 'center'
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
          <Roller
          color = {botColors.rollers}
          />
        </RollerWrapper>
      </Wrapper>
  )
}
export default BotSpikey;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`
const Extension = styled.div`
  height: 90%;
  width: 10%;
  background: ${props => props.color};
  border: ${props => `${props.borderSize} solid ${props.trim}`};
  transform: ${props => props.location === 'left' ? 'rotate(30deg)' : props.location === 'right' ? 'rotate(-30deg)' : ''};
`
const ExtensionWrapper = styled.div`
  position: relative;
  width: 80%;
  height: 25%;
  top: 0%;
  left: 10%;
  display: flex;
  justify-content: space-between;
  padding: 0 10%;
  overflow: hidden;
`
const Roller = styled.div`
  height: 100%;
  width: 20%;
  background: ${props => props.color};
  border-radius: 50%;
`
const RollerWrapper = styled.div`
  position: relative;
  width: 80%;
  height: 15%;
  top: -7.5%;
  left: 10%;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
`
const SpikeWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 25%;
  top: 7.5%;
  left: 0;
  display: flex;
  justify-content: space-between;
  padding: 3%;
  /* overflow: hidden; */
`
const Spike = styled.div`
  height: 70%;
  width: 15%;
  background: ${props => props.color};
  border: ${props => `${props.borderSize} solid ${props.trim}`};
  transform: rotate(45deg);
`

const Body = styled.div`
  position: relative;
  width: 80%;
  height: 25%;
  top: 30%;
  left: 10%;
  border: ${props => `${props.borderSize} solid ${props.trim}`};
  background: ${props => props.color};
  background-image: ${props => `radial-gradient(${props.color},${props.trim})`};
  border-radius: 40%;
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
  top: 31%;
  left: 45%;
  border: ${props => `${props.borderSize} solid ${props.trim}`};
  background: ${props => props.color};
`
const Head = styled.div`
  position: relative;
  width: 50%;
  height: 9.5%;
  top: 32%;
  left: 25%;
  border: ${props => `${props.borderSize} solid ${props.trim}`};
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