import React from 'react';
import styled from 'styled-components';

const BotBiggey = ( { children,botColors, cellSize } ) => {
  let borderSize = 1+Math.floor(cellSize/100);
  borderSize = `${borderSize}px`;
  
  return (
      <Wrapper>
        <HeadWrapper>
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
        </HeadWrapper>
        <Neck
          trim = {botColors.trim}
          color = {botColors.extensions}
          borderSize = {borderSize}
          location = 'left'
          />
        <Neck
          trim = {botColors.trim}
          color = {botColors.extensions}
          borderSize = {borderSize}
          location = 'right'
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
export default BotBiggey;

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
  top: -15%;
  left: 20%;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
	z-index:2;
`
const Body = styled.div`
  position: relative;
  width: 90%;
  height: 75%;
  top: -10%;
  left: 5%;
  border: ${props => `${props.borderSize} solid ${props.trim}`};
  background: ${props => props.color};
  background-image: ${props => `radial-gradient(${props.color},${props.trim})`};
  border-radius: 10% 10% 0 0;
  z-index:4;
  display: flex;
  justify-content: space-evenly;
  align-content: center;
  align-items: center;
`
const Neck = styled.div`
  position: relative;
  width: 5%;
  height: 5%;
  top: ${props => props.location === 'left' ? '-2.5%' : '-7.5%'};
  left: ${props => props.location === 'left' ? '15%' : '80%'};
  border: ${props => `${props.borderSize} solid ${props.trim}`};
  background: ${props => props.color};
	z-index:2;
`
const Head = styled.div`
  position: relative;
  width: 20%;
  height: 75%;
  top: 0;
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
  height: 40%;
  width: 40%;
  background-color: ${props => props.color};
	z-index:2;
`
const HeadWrapper = styled.div`
  position: relative;
  width: 90%;
  height: 15%;
  top: 2%;
  left: 5%;
  padding: 0 5%;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
	z-index:2;
`