import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';

const TechCell = ({ botNumberSelected, techMessage, setTechDisplay, handleClick, icon1, icon2, locked, purchased, size, trimSize, index }) => {
	const botInfo = useSelector((state) => state.userInfo.botBuilds);
	const defaultTechDisplay = "Spend Battle Bits on your build's tech tree below";
	const [trimColor, setTrimColor] = React.useState('rgba(0,0,125,0.6)');
	const [radialUrl, setRadialUrl] = React.useState('GradientLocked');
	React.useEffect(()=>{
		if (purchased === true) {
			setTrimColor('rgba(255,238,0,0.95)');
			setRadialUrl('GradientPurchased');
		}
		else if (locked === 'unlocked') {
			setTrimColor('rgba(0,238,0,0.75)');
			setRadialUrl('GradientUnlocked');
		}
		else if (locked === 'lackingStars') {
			setTrimColor('rgba(255,38,0,0.75)');
			setRadialUrl('GradientLackingStars');
		}
		else {
			setTrimColor('rgba(0,0,125,0.6)');
			setRadialUrl('GradientLocked');
		}
	},[locked,purchased])
	React.useEffect(()=>{
		// index === 2 && console.log('resetting setTechDisplay to:', techMessage)
		const target = document.getElementById(`TechCell${index}`)
		const onMouseEnter = (ev) => {
			if (ev.target === target) 
			setTechDisplay(techMessage);
		}
		const onMouseLeave = (ev) => {
			if (ev.target === target) 
			setTechDisplay(defaultTechDisplay);
		}
		if (target) {
			target.addEventListener('mouseenter',onMouseEnter);
			target.addEventListener('mouseleave',onMouseLeave);
		}
		return ()=>{
			if (!target) return;
			target.removeEventListener('mouseenter',onMouseEnter);
			target.removeEventListener('mouseleave',onMouseLeave);
		}
	},[botInfo, botNumberSelected] )

	// console.log('locked test:', `index ${index} is ${locked}`);
	// console.log('purchased test:', `index ${index} is ${purchased}`);

	if (!handleClick) {
		handleClick = () => {
			console.log('No handleClick was asigned')
		}
	}
	if (!size) {
		size = 58;
		trimSize = 2
	}
	
	let offset = trimSize/2;
	let quarterSize = size/4;
	let p1 = `${offset + quarterSize},${offset}`;
	let p2 = `${offset + (3*quarterSize)},${offset}`;
	let p3 = `${offset + size},${offset +quarterSize}`;
	let p4 = `${offset + size},${offset +(3*quarterSize)}`;
	let p5 = `${offset + (3*quarterSize)},${offset + size}`;
	let p6 = `${offset + quarterSize},${offset + size}`;
	let p7 = `${offset},${offset + (3*quarterSize)}`;
	let p8 = `${offset},${offset + quarterSize}`;
	let points = `${p1} ${p2} ${p3} ${p4} ${p5} ${p6} ${p7} ${p8}`;

	let top = icon1 ? 3*size/4 : '';
	
  return (
		<SvgWrapper 
		wrapperSize = {size + trimSize}
		>
			{icon1 &&
				<StyledIcon
				icon = {icon1}
				size = {size/2}
				/>
			}
			{icon2 &&
				<StyledIcon
				icon = {icon2}
				size = {size/2}
				/>
			}
			<Svg
			id = {`TechCell${index}`}
			svgSize = {size + trimSize}
			top = {top}
			locked = {locked}
			purchased = {purchased}
			onClick = {e => {handleClick(purchased,locked !== 'unlocked')}}
			>
				<Polygon 
				points = {points}
				trimSize = {trimSize}
				trimColor = {trimColor}
				radialUrl = {radialUrl}
				>
				</Polygon>
			</Svg>
		</SvgWrapper>
  )
}
export default TechCell;
const StyledIcon = styled(Icon)`
	margin-top: ${props => `${props.size/2}px`};
`
const SvgWrapper = styled.div`
	height: ${props => `${props.wrapperSize}px`};
	width: ${props => `${props.wrapperSize}px`};
`
const Svg = styled.svg`
	height: ${props => `${props.svgSize}px`};
	width: ${props => `${props.svgSize}px`};
	position: relative;
	top: ${props => `-${props.top}px`};
	overflow: visible;
	:hover {
		cursor: ${props => props.purchased === true ?
			'pointer' : props.locked  === 'unlocked' ? 
				'copy' : props.locked === 'lackingStars' ?
					'not-allowed' : 'not-allowed'};

	}
`
const Polygon = styled.polygon`
	stroke: 'rgba(0,0,0,0)}';
	fill: ${props => `url(#${props.radialUrl})`};
	stroke-width: ${props => props.trimSize};
	:hover {
		stroke: ${props => props.trimColor};
	}
`