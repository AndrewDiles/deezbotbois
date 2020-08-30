import React, { useState } from 'react';

import { useSelector, useDispatch } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';

import styled from 'styled-components';

import {
	changeBotColors,
	changeBotName,
} from '../../Redux/actions';

const BotModel = ({ botInfo, setBotNumberSelected, botNumberSelected}) => {
	// const userInfo = useSelector((state) => state.userInfo);
	const [name, setName] = useState(null);
	const dispatch = useDispatch();
	const colors = useSelector(getThemeColors);

	React.useEffect(()=>{
		if(botInfo[setBotNumberSelected]) {
			setName(botInfo[setBotNumberSelected].name)
		}
	},[botInfo])

	// if (!userInfo.botBuilds) {
	// 	return (<></>)
	// }
  return (
    <Wrapper>
			NAME
			<StyledInput
			colors = {colors}
			className = "centeredInput" 
			type="text" maxLength = "12" 
			onChange = {(ev)=>{setName(ev.target.value);dispatch(changeBotName(setBotNumberSelected, name))}}
			/>
    </Wrapper>
  )
}
export default BotModel;

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	display : flex;
	flex-direction: column;
	justify-content: center;
	align-content: center;
	align-items: center;
`
const StyledInput = styled.input`
	background-color: ${props => props.colors.secondary};
	color: ${props => props.colors.textColor};
	&:hover {
		background-color: ${props => props.colors.hovered};
	}
`