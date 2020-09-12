import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import baseBotAttributes from '../../../Constants/attributes';

import SvgDefs from './SvgDefs';
import TechCellProvider from './TechCellProvider';

const BotTechTree = ({ botNumberSelected}) => {
	const userInfo = useSelector((state) => state.userInfo);
	const botInfo = userInfo.botBuilds;
	const defaultTechDisplay = 'Obtain daily Battle Bits and ';
	const [techDisplay, setTechDisplay] = useState('');
	const [treeInfo, setTreeInfo] = useState(null);
	const [starInfo, setStarInfo] = useState({
		maxBlue: 0,
		blueRate: 1,
		availableBlue: 0,
		maxGold: 0,
		availableGold: 0,
		starCost: 0
	})

	useEffect(()=>{
		if (botNumberSelected === null || botNumberSelected === undefined) return;
		setTreeInfo(baseBotAttributes[botInfo[botNumberSelected].model].TechTree);
	},[botNumberSelected])

	useEffect(()=>{
		if (botNumberSelected === null || botNumberSelected === undefined) return;
		let blueRate = baseBotAttributes[botInfo[botNumberSelected].model].BlueStarConversionRate;
		let battleBits = userInfo.battleBits;
		let maxBlue = Math.floor(battleBits/blueRate);
		let maxGold = 0;
		if (userInfo.levelProgress.length > 0) {
			userInfo.levelProgress.forEach((level)=>{
				if (level.length > 0) {
					level.forEach((value)=>{
						if (value === botInfo[botNumberSelected].model) maxGold ++;
					})
				}
			})
		}
		let starCost = 0;
		botInfo[botNumberSelected].techTree.forEach((tech, index)=>{
			if (tech) {
				starCost += baseBotAttributes[botInfo[botNumberSelected].model].TechTree[index].cost
			}
		})

		let availableGold = maxGold - starCost;
		let availableBlue = 0;
		if (availableGold < 0) {
			availableBlue = maxBlue + availableGold;
			availableGold = 0
		}
		else {
			availableBlue = maxBlue;
		}
		setStarInfo({
			maxBlue: maxBlue,
			blueRate: blueRate,
			availableBlue: availableBlue,
			maxGold: maxGold,
			availableGold: availableGold,
			starCost: starCost
		});
	},[ userInfo.battleBits, botNumberSelected, botInfo ])

	if (!userInfo.botBuilds || !treeInfo) {
		return (<></>)
	}

// REMINDER: RESET TREE ON MODEL CHANGE.  CREATE A RESET BUTTON.

  return (
    <div
		className = "assemblyGridChild" 
		>
			<SvgDefs/>
			<h3>
			TECH TREE
			</h3>
			<TechDisplay
			
			/>
			<TechGridWrapper>
				{treeInfo.map((tech, index)=>(
					
					<div
					key = {index}
					>
						{tech && 
							<TechCellProvider
							availableStars = {starInfo.availableGold}
							availableBlueStars = {starInfo.availableBlue}
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
const TechDisplay = styled.div`
	height: 50px;
	width: 100px;
`