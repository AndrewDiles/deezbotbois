import React, { useState } from 'react';

import { useSelector, useDispatch } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';

import styled from 'styled-components';

import {
	changeBotColors,
	changeBotName,
} from '../../Redux/actions';

const BotModel = ({ botNumberSelected}) => {
	const userInfo = useSelector((state) => state.userInfo);
	const dispatch = useDispatch();
	const colors = useSelector(getThemeColors);
	const botInfo = userInfo.botBuilds;
	// const [initialChange, setInitialChange] = React.useState(true);
	// const [name, setName] = useState(botInfo[botNumberSelected].name);

	// React.useEffect(()=>{
	// 	setInitialChange(true)
	// },[botNumberSelected])

  return (
    <Wrapper>
			NAME
			{botInfo[botNumberSelected] &&
			<StyledInput
			colors = {colors}
			className = "centeredInput" 
			type="text" maxLength = "12" 
			value = {userInfo.botBuilds[botNumberSelected].name}
			onChange = {(ev)=>{
				// initialChange ? setInitialChange(false) :
				dispatch(changeBotName(botNumberSelected, ev.target.value))}}
			/>
			}
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