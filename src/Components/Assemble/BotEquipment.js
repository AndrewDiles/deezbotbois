import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';

const BotEquipment = ({ botNumberSelected}) => {
	const userInfo = useSelector((state) => state.userInfo);
	const botInfo = userInfo.botBuilds;

	if (!userInfo.botBuilds) {
		return (<></>)
	}
  return (
    <div
		className = "assemblyGridChild" 
		>
			Bot equipment
    </div>
  )
}
export default BotEquipment;