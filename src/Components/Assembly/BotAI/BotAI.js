import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';

// import {moveUp} from 'react-icons-kit/icomoon/moveUp'
// import {moveDown} from 'react-icons-kit/icomoon/moveDown'

const BotAI = ({ botNumberSelected}) => {
	const userInfo = useSelector((state) => state.userInfo);
	const botInfo = userInfo.botBuilds;

	if (!userInfo.botBuilds) {
		return (<></>)
	}

	// cells will have both a row and col number.
	// cells will have a height / width = `${cellSize}px`
	// bots will have a cell location, represented by the row / col numbers

	// helper functions needed:
	
	// determine path from CENTER CELL to center of another cell
	// determine actual distance from center of one cell to center of another
	// scan: given CENTER CELL, a distance and array of all object locations, returns an array with all objects within distance and the path to them (UDLR)
	// auto scan: given 
  return (
    <Wrapper
		className = "assemblyGridChild" 
		>
			Bot ai
    </Wrapper>
  )
}
export default BotAI;
const Wrapper = styled.div`
	width: 250px;
`