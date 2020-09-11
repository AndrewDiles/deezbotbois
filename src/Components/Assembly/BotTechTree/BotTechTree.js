import React, { useState } from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import baseBotAttributes from '../../../Constants/attributes';

import SvgDefs from './SvgDefs';
import TechCellProvider from './TechCellProvider';

const BotTechTree = ({ botNumberSelected}) => {
	const userInfo = useSelector((state) => state.userInfo);
	const botInfo = userInfo.botBuilds;
	const [treeInfo, setTreeInfo] = useState(null);
	const [blueStarConversionRate, setBlueStarConversionRate] = useState(1);

	React.useEffect(()=>{
		if (botNumberSelected === null || botNumberSelected === undefined) return;
		setTreeInfo(baseBotAttributes[botInfo[botNumberSelected].model].TechTree);
		setBlueStarConversionRate(baseBotAttributes[botInfo[botNumberSelected].model].BlueStarConversionRate);
	},[ botNumberSelected, botInfo[botNumberSelected].model ])

	
	if (!userInfo.botBuilds || !treeInfo) {
		return (<></>)
	}
	let availableBlueStars = userInfo.battleBits;
	let availableStars = 0;
	if (userInfo.levelProgress.length > 0) {
		userInfo.levelProgress.forEach((level)=>{
			if (level.length > 0) {
				level.forEach((value)=>{
					if (value === botInfo[botNumberSelected].model) availableStars ++;
				})
			}
		})
	}
  return (
    <div
		className = "assemblyGridChild" 
		>
			<SvgDefs/>
			<h3>
			TECH TREE
			</h3>
			<TechGridWrapper>
				{treeInfo.map((tech, index)=>(
					
					<div
					key = {index}
					>
						{tech && 
							<TechCellProvider
							availableStars = {availableStars}
							availableBlueStars = {availableBlueStars}
							botNumberSelected = {botNumberSelected}
							tech = {tech}
							size = {48}
							trimSize = {2}
							index = {index}
							/>
						}
					</div>
				))}
			</TechGridWrapper>
    </div>
  )
}
export default BotTechTree;
const TechGridWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(4,50px);
  grid-template-rows: repeat(5,50px);
	grid-gap: 25px 10px;
	padding: 10px;
`