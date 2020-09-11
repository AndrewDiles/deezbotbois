import React from 'react';
import styled from 'styled-components';
const SvgDefs = () => {
  return (
		<Svg>
			<defs>
				<radialGradient id="GradientPurchased">
      		<stop offset="0%" stopColor='rgba(255,238,0,0.4)'/>
      		<stop offset="100%" stopColor='rgba(255,238,0,0.75)'/>
    		</radialGradient>
				<radialGradient id="GradientUnlocked">
      		<stop offset="0%" stopColor='rgba(0,0,0,0.4)'/>
      		<stop offset="100%" stopColor='rgba(0,238,0,0.6)'/>
    		</radialGradient>
				<radialGradient id="GradientLackingStars">
      		<stop offset="0%" stopColor='rgba(0,0,0,0.4)'/>
      		<stop offset="100%" stopColor='rgba(255,38,0,0.6)'/>
    		</radialGradient>
				<radialGradient id="GradientLocked">
      		<stop offset="0%" stopColor='rgba(0,0,0,0.5)'/>
      		<stop offset="100%" stopColor='rgba(0,0,125,0.5)'/>
    		</radialGradient>
			</defs>
		</Svg>
  )
}
export default SvgDefs;
const Svg = styled.svg`
	position: absolute;
	height: 0;
	width: 0;
`