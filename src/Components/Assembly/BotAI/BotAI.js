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
    <Wrapper
		className = "assemblyGridChild" 
		>
			Bot ai
    </Wrapper>
  )
}
export default BotAI;
const Wrapper = styled.div`
	width: 250px;
`