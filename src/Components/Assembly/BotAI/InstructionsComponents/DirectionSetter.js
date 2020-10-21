import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import { verifyIsInteger } from '../../../../Constants/helperFunctions';
import { getThemeColors } from '../../../../Redux/reducers/user-reducer';
import WarningBar from './WarningBar';
const DirectionSetter = ({ activeNodeArray, setActiveNodeArray, aiAndScripts }) => {
	const colors = useSelector(getThemeColors);
	const [entryError, setEntryError] = React.useState(null);

	function handleAngleEntry(angle) {
		if (!verifyIsInteger(angle)){
			setEntryError('ANGLE ENTERED MUST BE AN INTEGER');
		} else {
			if (angle <360 && angle >-360) {
				setEntryError(null);
				setDirection(angle);
			} else {
				setEntryError('ANGLE ENTERED MUST BE BETWEEN -360 AND 360');
			}
		}
	}

	function setDirection(angle) {
		let newActiveNodeArray = [...activeNodeArray];
		newActiveNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.rangedDirection = angle;
		setActiveNodeArray(newActiveNodeArray)
	}

	return (		
		<>
			<DirectionSetterContainer
			error = {entryError}
			>
				<Request className = 'centeredFlex'>
					SET ANGLE DIRECTION
				</Request>
				<AngleDisplay className = 'centeredFlex'>
					<Circle colors = {colors}>
						<NoSizeContainer>
							<NewAngle
							colors = {colors}
							angle = {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.rangedDirection}
							/>
						</NoSizeContainer>
					</Circle>
				</AngleDisplay>
				<Options className = 'centeredFlex'>
				<StyledInput
					colors = {colors}
					entryError = {entryError}
					className = "centeredInput"
					placeholder= {activeNodeArray[aiAndScripts.viewing[aiAndScripts.viewing.length-1].index].command.instructions.rangedDirection}
					input="number" maxLength = "360" 
					onChange = {(ev)=>{handleAngleEntry(parseInt(ev.target.value));}}
					>
					</StyledInput>
				</Options>
			</DirectionSetterContainer>
			{entryError &&
				<WarningBar>
					{entryError}
				</WarningBar>
			}
		</>
	)
}
export default DirectionSetter;
const DirectionSetterContainer = styled.div`
	width: 100%;
	height: 80px;
	display: flex;
	background: ${props => props.error && 'rgba(255,0,0,0.2)'};
`
const Request = styled.div`
	height: 100%;
	width: 103px;
	font-size: 0.8em;
	/* white-space: pre-wrap; */
`
const AngleDisplay = styled.div`
	height: 80px;
	width: 80px;
	padding: 5px;
	
`
const Circle = styled.div`
	border: ${props => `2px solid ${props.colors.textColor}`};
	border-radius: 50%;
	height: 60px;
	width: 60px;
`
const NoSizeContainer = styled.div`
	height: 0px;
	width: 0px;
`
const Options = styled.div`
	height: 100%;
	width: 65px;
	flex-direction: column;
`
const StyledInput = styled.input`
	width: 80%;
	font-size: 1.3em;
	background-color: ${props => props.colors.secondary};
	color: ${props => props.entryError ? 'red' :props.colors.textColor};
	&:hover {
		background-color: ${props => props.colors.hovered};
	}
	&:focus {
		outline-color: ${props => !props.disabled && props.colors.hoveredText};
		color: ${props => props.entryError ? 'red' :props.colors.hoveredText};
	}
`
const NewAngle = styled.div`
	height: 3px;
	width: 30px;
	background-color: ${props => props.colors.hoveredText};
	transform-origin: top left;
	position: relative;
	top: 29px;
	left: 29px;
	transform: ${props => `rotate(${props.angle}deg)`};
	transition: transform 1s ease-in-out;
`