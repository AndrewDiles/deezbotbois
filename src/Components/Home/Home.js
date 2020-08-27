import React from 'react';

import { useDispatch, useSelector } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';

import styled from 'styled-components';
import { updateUrl} from '../../Redux/actions';

const Home = () => {
	const settings = useSelector((state) => state.settings);
	const colors = useSelector(getThemeColors);
	const dispatch = useDispatch();
	React.useEffect(()=>{
		dispatch(updateUrl('home'));
	},[])
	
  return (
    <Wrapper
		navLocation = {settings.navLocation}
		profileTab = {settings.profileTab}
		colors = {colors}
		>
      Welcome Home
    </Wrapper>
  )
}
export default Home;

const Wrapper = styled.div`
	padding: ${(props) =>
		props.navLocation === "top" ? 
			props.profileTab !== 'active' ? "50px 0 0 0" : "50px 135px 0 0"
			: props.profileTab !== 'active' ? "0 135px 0 0" : "0 135px 0 135px"
			};
	color: ${props => props.colors.textColor};
	width: 100%;
	height: 100%;
	display : flex;
	flex-direction: row;
	justify-content: center;
	align-content: center;
	align-items: center;
`