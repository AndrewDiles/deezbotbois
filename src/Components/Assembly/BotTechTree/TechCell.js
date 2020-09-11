import React from 'react';

import styled from 'styled-components';
import { Icon } from 'react-icons-kit';

const TechCell = ({ icon1, icon2, locked, purchased, size, trimSize}) => {
	if (!size) {
		size = 56;
		trimSize = 4
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
	console.log(points);
  return (
		<SvgWrapper 
		className = 'centeredFlex'
		wrapperSize = {size + trimSize}
		>
			<Svg
			svgSize = {size + trimSize}
			>
				<defs>
					<radialGradient id="RadialGradient1">
    	  		<stop offset="0%" stop-color="red"/>
    	  		<stop offset="100%" stop-color="blue"/>
    			</radialGradient>
				</defs>
				<Polygon 
				points = {points}
				trimSize = {trimSize}
				>
				</Polygon>
			</Svg>
		</SvgWrapper>
  )
}
export default TechCell;

const SvgWrapper = styled.div`
	height: ${props => `${props.wrapperSize}px`};
	width: ${props => `${props.wrapperSize}px`};
	flex-direction: row;
`
const P = styled.p`
margin: 0;
padding: 0;
	color: gold;
	position: relative;
	top: -43px;
`
const Svg = styled.svg`
	height: ${props => `${props.svgSize}px`};
	width: ${props => `${props.svgSize}px`};
	position: relative;
`
const Polygon = styled.polygon`
	stroke: black;
	fill: url(#RadialGradient1);
	stroke-width: ${props => props.trimSize};
	color: white;
`