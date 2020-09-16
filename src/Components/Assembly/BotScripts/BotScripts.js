import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';

const BotScripts = ({ botNumberSelected}) => {
	const userInfo = useSelector((state) => state.userInfo);
	const botInfo = userInfo.botBuilds;

	if (!userInfo.botBuilds) {
		return (<></>)
	}
  return (
    <Wrapper
		className = "assemblyGridChild" 
		>
			Bot scripts
    </Wrapper>
  )
}
export default BotScripts;
const Wrapper = styled.div`
	width: 250px;
`