import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import getNodeArray from '../../../Constants/scriptHelpers/getNodeArray';

const PreviousCondition = ({ aiAndScripts, setAiAndScripts }) => {
	const userInfo = useSelector((state) => state.userInfo);
	
	// getNodeArray(userInfo.botBuilds[botNumberSelected].script, aiAndScripts.viewing )

	if (!userInfo.botBuilds) {
		return (<></>)
	}
	
  return (
    <Wrapper>
			PREVIOUS CONDITION:
    </Wrapper>
  )
}
export default PreviousCondition;

const Wrapper = styled.div`
	width: 250px;
	height: 50px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	text-align: center;
	font-size: 0.9em;
`