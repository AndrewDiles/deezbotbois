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
	},[dispatch])
	
  return (
    <Wrapper
		navLocation = {settings.navLocation}
		profileTab = {settings.profileTab}
		colors = {colors}
		>
			<h1>
				Welcome to DeezBotBois
			</h1>
			<h5>
				Program and Battle your own robots:
      	<Ul>
					<li>
						Equip bots with different weapons and accessories
					</li>
					<li>
						Enhance bots by enabling technologies in their tech trees
					</li>
					<li>
						Customize them with names and colors
					</li>
					<li>
						Script their behavior to fight using different strategies
					</li>
					<li>
						Progress your way through levels to gain more tech points
					</li>
					<li>
						Meet level objectives to unlock new bot models, equipment and colors.
					</li>
					<li>
						Battle your bot against other users in tournaments
					</li>
					<li>
						Continually improve the modularity and responsiveness of your ai
					</li>
				</Ul>
			</h5>
    </Wrapper>
  )
}
export default Home;

const Wrapper = styled.div`
	padding: ${(props) =>
		props.navLocation === "top" ? 
			props.profileTab === 'active' && "0 140px 0 0"
			: props.profileTab === 'active' ? "0 140px 0 140px" : "0 140px 0 0"
			};
	transition: padding 0.5s ease-in-out;
	color: ${props => props.colors.textColor};
	width: 100%;
	height: 100%;
	overflow: auto;
	display : flex;
	flex-direction: column;
	justify-content: center;
	align-content: center;
	align-items: center;
`
const Ul = styled.div`
	list-style-type: none;
`