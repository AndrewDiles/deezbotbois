import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';

const BotAI = ({ botNumberSelected}) => {
	const userInfo = useSelector((state) => state.userInfo);
	const botInfo = userInfo.botBuilds;

	if (!userInfo.botBuilds) {
		return (<></>)
	}
  return (
    <div
		className = "assemblyGridChild" 
		>
			Bot ai
    </div>
  )
}
export default BotAI;