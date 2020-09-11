import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';

import SvgDefs from './SvgDefs';

const BotTechTree = ({ botNumberSelected}) => {
	const userInfo = useSelector((state) => state.userInfo);
	const botInfo = userInfo.botBuilds;

	if (!userInfo.botBuilds) {
		return (<></>)
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

			</TechGridWrapper>
    </div>
  )
}
export default BotTechTree;
const TechGridWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(4,50px);
  grid-template-rows: repeat(4,50px);
	grid-gap: 10px 25px;
	padding: 10px;
`