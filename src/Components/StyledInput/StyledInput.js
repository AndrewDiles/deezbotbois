import React, { useState } from 'react';
import styled from 'styled-components';

import { useSelector } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';

const StyledInput = ({labelName, value, setValue}) => {
	const colors = useSelector(getThemeColors);
	const [hasBeenFocused, setHasBeenFocused] = useState(false);

	React.useEffect(() => {
		let eraseSuccessMsg;
		if (successMsg) {
			eraseSuccessMsg = setTimeout(()=>{
				setSuccessMsg(null)
			},5000)
		}
		return () => clearTimeout(eraseSuccessMsg)
	},[successMsg])

  return (
    <InputWrapper
		colors = {colors}
		>
  		<label>
				{labelName}
			</label>
    	<Input/>
  	</InputWrapper>
	)
}
export default AltLogin;
const InputWrapper = styled.div`
	width: 100%;
	height: 50px;
	border: ${props => `3px solid ${props.colors.secondary}`};
	border-radius: 5px;
	margin: 5px 0;
	>label{
		position:relative;
  	top:-15px;
  	left:-40%;
  	background-color: ${props => props.colors.primary};
		font-size: 0.6em;
	}
	>input{
		position: relative;
		bottom: 10px;
	}
`
const Input = styled.input`

`