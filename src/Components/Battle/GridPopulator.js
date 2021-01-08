import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';

import Bot from "../Bots/Bot";

const GridPopulator = ({ objectsToBePlaced }) => {
	const settings = useSelector((state) => state.settings);
	
  return (
		<>
			{objectsToBePlaced.map((object, index)=>{
				return(
					<ZeroSizedWrapper
					key = {`ZeroSizedWrapper${index}`} 
					>
						<ObjectPlacer
						cellSize = {settings.cellSize}
						location = {object.location}
						id = {`placer${index}`}
						>
							{(object.type === 'Bot' || object.type === 'User') &&
								<Bot
      	  			model = {object.model}
      	  			arm1 = {object.equipment.arm1}
								arm2 = {object.equipment.arm2}
								arm3 = {object.equipment.arm3}
      	  			botColors = {object.colors}
      	  			arm1Angle = {object.arm1Angle}
								arm2Angle = {object.arm2Angle}
								arm3Angle = {object.arm3Angle}
      	  			/>
							}
    				</ObjectPlacer>
					</ZeroSizedWrapper>
				)
			})}
		</>
  )
}

export default GridPopulator;
const ZeroSizedWrapper = styled.div`
	height: 0;
	width: 0;
	/* overflow: visible; */
`
const ObjectPlacer = styled.div`
	position: relative;
	height: ${props => `${props.cellSize}px`};
	width: ${props => `${props.cellSize}px`};
	top: ${props => props.location && `${(props.cellSize)*(props.location.row)}px`};
	left: ${props => props.location && `${(props.cellSize)*(props.location.col-2)}px`};
`