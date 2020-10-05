import React from 'react';
import styled from 'styled-components';
import { useSelector } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';
import iconImporter from '../../Constants/iconImporter';
import StyledIcon from '../StyledIcon/StyledIcon';

const AccessoryContents = ({ accessoryInfo }) => {
	const colors = useSelector(getThemeColors);
	const [icons1, setIcons1] = React.useState(null);
	const [icons2, setIcons2] = React.useState(null);
	React.useEffect(()=>{
		setIcons1(iconImporter(Object.keys(accessoryInfo)[3]))
		Object.keys(accessoryInfo)[4] && setIcons2(iconImporter(Object.keys(accessoryInfo)[4]))
	},[accessoryInfo])
	if (!icons1) {
		return (<></>)
	}
	
	return (
		<ToolTipContents
		color = {colors.hoveredText}
		>
			<Name
			length = {accessoryInfo.name.length}
			>
				{accessoryInfo.name}
			</Name>
			<Potency>
				{accessoryInfo.potency}
			</Potency>
			{icons1 &&
				<Effect1
				className = 'centeredFlex'
				numberOfIcons = {icons1.icon2 ? 2 : 1}
				setsOfIcons = {icons2 ? 2 : 1}
				>
					{icons1.icon2 ? (
						<StyledIcon
						padding = {0}
						size = {25}
						icon = {icons1.icon1}
						selected = {true}
      			/>
					) : (
						''
					)}
					{icons1.icon2 ? (
						<StyledIcon
						padding = {0}
						size = {25}
						icon = {icons1.icon2}
						selected = {true}
      			/>
					) : (
						<StyledIcon
						padding = {0}
						size = {25}
						icon = {icons1.icon1}
						selected = {true}
      			/>
					)}
					{accessoryInfo[Object.keys(accessoryInfo)[3]]}
				</Effect1>
			}
			{icons2 &&
				<Effect2
				className = 'centeredFlex'
				numberOfIcons = {icons2.icon2 ? 2 : 1}
				>
					{icons2.icon2 ? (
						<StyledIcon
						padding = {2}
						size = {24}
						icon = {icons2.icon1}
						selected = {true}
      			/>
					) : (
						''
					)}
					{icons2.icon2 ? (
						<StyledIcon
						padding = {2}
						size = {24}
						icon = {icons2.icon2}
						selected = {true}
      			/>
					) : (
						<StyledIcon
						padding = {2}
						size = {24}
						icon = {icons2.icon1}
						selected = {true}
      			/>
					)}
					{accessoryInfo[Object.keys(accessoryInfo)[4]]}
				</Effect2>
			}
			{/* <Description>
				{accessoryInfo.description}
			</Description> */}
			{/* <Effect1Type>
				{Object.keys(accessoryInfo)[3]}
			</Effect1Type>
			<Effect1Value>
				{accessoryInfo[Object.keys(accessoryInfo)[3]]}
			</Effect1Value>
			<Effect2Type>
				{Object.keys(accessoryInfo)[4]}
			</Effect2Type>
			<Effect2Value>
				{accessoryInfo[Object.keys(accessoryInfo)[4]]}
			</Effect2Value> */}
		</ToolTipContents>
	)
}
export default AccessoryContents;

const ToolTipContents = styled.div`
	/* height: 100%; */
	color: ${props => props.color};
	height: 60px;
	width: 100%;
	font-size: 10px;
	display: grid;
	grid-template-columns: 45% 10% 45%;
  grid-template-rows: 30% 30% 20% 20%;
	padding: 2px;
`
const Potency = styled.div`
	font-size: 0.6em;
	font-weight: 200;
	grid-column-start: 3;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 1;
	align-self: start;
	justify-self: end;
`
const Name = styled.div`
	font-size: ${props => props.length > 25 ? '0.7em' :
		props.length > 20 ? '0.9em' :
		props.length > 15 ? '1.1em' :
		props.length > 10 ? '1.3em' :
		'1.5em'
		};
	font-weight: 200;
	/* grid-column-start: 1;
  grid-column-end: 2;*/
  /* grid-row-start: 1; 
  grid-row-end: 1;  */
	grid-column: 2 / 2;
  grid-row: 1 / 1;
	align-self: center;
	justify-self: center;
	white-space: nowrap;
`
const Effect1 = styled.div`
	font-size: ${props => props.setsOfIcons === 1 ? '1.4em' : '1.1em'};
	font-weight: 200;
	grid-column-start: ${props => props.setsOfIcons === 1 ? '2' : '1'};
	grid-column-start: ${props => props.setsOfIcons === 1 ? '2' : '1'};
	grid-row-start: 3;
	grid-row-end: 4;
	align-self: center;
	justify-self: start;
	position: relative;
	left: ${props => props.setsOfIcons === 1 ? props.numberOfIcons === 1 ? '-10px' : '-40px' : props.numberOfIcons === 1 && '15px'};
`
const Effect2 = styled.div`
	font-size: 1.1em;
	font-weight: 200;
	grid-column-start: 3;
	grid-column-end: 3;
	grid-row-start: 3;
	grid-row-end: 4;
	align-self: center;
	justify-self: end;
	position: relative;
	right: ${props => props.numberOfIcons === 1 && '15px'};
`
// const Effect1Type = styled.div`
// 	font-size: 0.8em;
// 	font-weight: 200;
// 	grid-column-start: 1;
//   grid-column-end: 1;
//   grid-row-start: 3;
//   grid-row-end: 3;
// 	align-self: center;
// 	justify-self: center;
// `
// const Effect1Value = styled.div`
// 	font-size: 0.6em;
// 	grid-column-start: 1;
//   grid-column-end: 1;
//   grid-row-start: 4;
//   grid-row-end: 4;
// 	align-self: center;
// 	justify-self: center;
// `
// const Effect2Type = styled.div`
// 	font-size: 0.8em;
// 	font-weight: 200;
// 	grid-column-start: 3;
//   grid-column-end: 3;
//   grid-row-start: 3;
//   grid-row-end: 3;
// 	align-self: center;
// 	justify-self: center;
// `
// const Effect2Value = styled.div`
// 	font-size: 0.6em;
// 	grid-column-start: 3;
//   grid-column-end: 3;
//   grid-row-start: 4;
//   grid-row-end: 4;
// 	align-self: center;
// 	justify-self: center;
// `
// const Description = styled.div`
// 	font-size: 0.65em;
// 	/* grid-column-start: 2;
//   grid-column-end: 2; */
// 	grid-column: 1 / last-line;
//   grid-row-start: 2;
//   grid-row-end: 2;
// 	align-self: center;
// 	justify-self: center;
// 	/* white-space: nowrap; */
// `