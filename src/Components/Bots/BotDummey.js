import React from 'react';
import styled from 'styled-components';

const BotDummey = ( { children,botColors, cellSize } ) => {
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
				<Extension
        trim = {botColors.trim}
        color = {botColors.extensions}
        borderSize = {borderSize}
        />
        <PlatformWrapper>
          <Platform
          color = {botColors.rollers}
          />
        </PlatformWrapper>
      </Wrapper>
  )
}
export default BotDummey;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`
const Extension = styled.div`
  position: relative;
  height: 25%;
  width: 14%;
  top: -5%;
  left: 43%;
  background: ${props => props.color};
  border: ${props => `${props.borderSize} solid ${props.trim}`};
	z-index:2;
`
const Platform = styled.div`
  height: 40%;
  width: 80%;
  background: ${props => props.color};
  border-radius: 50% 50% 0 0;
	z-index:2;
`
const PlatformWrapper = styled.div`
  position: relative;
  width: 60%;
  height: 15%;
  top: -5%;
  left: 20%;
  display: flex;
  justify-content: center;
  overflow: hidden;
	z-index:2;
`
const Body = styled.div`
  position: relative;
  width: 40%;
  height: 45%;
  top: 0%;
  left: 30%;
  border: ${props => `${props.borderSize} solid ${props.trim}`};
  background: ${props => props.color};
  background-image: ${props => `radial-gradient(${props.color},${props.trim})`};
  border-radius: 50% 50% 20% 20%;
  z-index:4;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`
const Neck = styled.div`
  position: relative;
  width: 12.5%;
  height: 12%;
  top: 1%;
  left: 43.75%;
	border-radius: 50% 0 0 0;
  border: ${props => `${props.borderSize} solid ${props.trim}`};
  background: ${props => props.color};
	z-index:2;
`
const Head = styled.div`
  position: relative;
  width: 50%;
  height: 13%;
  top: 5%;
  left: 14.5%;
  border: ${props => `${props.borderSize} solid ${props.trim}`};
	border-radius: 50% 50% 25% 50%;
  /* background: ${props => props.color}; */
	background-image: ${props => `radial-gradient(${props.color},${props.trim})`};
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  align-content: center;
	z-index:2;
	transform: rotate(-10deg);
`
const Eye = styled.div`
  height: 20%;
  width: 7%;
	margin-left: 20%;
  background-color: ${props => props.color};
	z-index:2;
`