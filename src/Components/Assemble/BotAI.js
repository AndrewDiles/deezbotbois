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
    <Wrapper>
			Bot ai
    </Wrapper>
  )
}
export default BotAI;

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	display : flex;
	flex-direction: column;
	justify-content: center;
	align-content: center;
	align-items: center;
`