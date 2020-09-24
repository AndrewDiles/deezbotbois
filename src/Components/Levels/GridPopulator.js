import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';

import Bot from "../Bots/Bot";

const GridPopulator = ({ objectsToBePlaced }) => {
	const settings = useSelector((state) => state.settings);
	
  return (
		<>
			{objectsToBePlaced.map((object, index)=>(
				<ZeroSizedWrapper key = {`ZeroSizedWrapper${index}`}>
					<ObjectPlacer
					cellSize = {settings.cellSize}
					location = {object.location}
					id = {`placer${index}`}
					>
						{object.type === 'Bot' &&
							<Bot
        			model = {object.model}
        			arm1 = {object.arm1}
        			arm2 = {object.arm2}
        			botColors = {object.botColors}
        			arm1Angle = {object.arm1Angle}
        			arm2Angle = {object.arm2Angle}
        		/>
						}
    			</ObjectPlacer>
				</ZeroSizedWrapper>
			))}
		</>
  )
}

export default GridPopulator;
const ZeroSizedWrapper = styled.div`
	height: 0;
	width: 0;
`
const ObjectPlacer = styled.div`
	position: relative;
	height: ${props => `${props.cellSize}px`};
	width: ${props => `${props.cellSize}px`};
	top: ${props => props.location && `${(props.cellSize)*(props.location.row-1)}px`};
	left: ${props => props.location && `${(props.cellSize)*(props.location.col-1)}px`};
`