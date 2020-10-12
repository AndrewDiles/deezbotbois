import React from 'react';
// import { useSelector } from "react-redux";
import styled from 'styled-components';

const NodeOptions = ({ nodeInfo }) => {
	console.log({nodeInfo})
	console.log(nodeInfo.condition.name)
  return (
    <Wrapper>
			{nodeInfo.condition.name}
    </Wrapper>
  )
}
export default NodeOptions;
const Wrapper = styled.div`
	width: 250px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	text-align: center;
	font-size: 0.9em;
	white-space: nowrap;
`