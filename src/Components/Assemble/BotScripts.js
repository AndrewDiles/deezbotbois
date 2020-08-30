import React from 'react';

import { useSelector } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';

import styled from 'styled-components';

const BotScripts = ({ botInfo, setBotNumberSelected, botNumberSelected}) => {
	const userInfo = useSelector((state) => state.userInfo);
	const colors = useSelector(getThemeColors);

	if (!userInfo.botBuilds) {
		return (<></>)
	}
  return (
    <Wrapper>
			Bot scripts
    </Wrapper>
  )
}
export default BotScripts;

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	display : flex;
	flex-direction: column;
	justify-content: center;
	align-content: center;
	align-items: center;
`