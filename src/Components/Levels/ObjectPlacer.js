import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';

const ObjectPlacer = ({ children, location }) => {
	const settings = useSelector((state) => state.settings);
	
  return (
    <Wrapper
		cellSize = {settings.cellSize}
		location = {location}
		>
			{children}
    </Wrapper>
  )
}

export default ObjectPlacer;

const Wrapper = styled.div`
	position: relative;
	height: ${props => `${props.cellSize}px`};
	width: ${props => `${props.cellSize}px`};
	top: ${props => props.location && `${(props.cellSize)*(props.location.row-1)}px`};
	left: ${props => props.location && `${(props.cellSize)*(props.location.col-1)}px`};
`