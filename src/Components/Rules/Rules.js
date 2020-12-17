import React from 'react';

import { useSelector } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';

import styled from 'styled-components';

const Rules = () => {
	const settings = useSelector((state) => state.settings);
	const colors = useSelector(getThemeColors);
	
  return (
    <Wrapper
		navLocation = {settings.navLocation}
		profileTab = {settings.profileTab}
		colors = {colors}
		>
			<h1>
				Rules and tabs for more information will reside on this endpoint
			</h1>
			<Row>
				The nature of commands being legal at both the time they are set to be executed and when they are executed
			</Row>
			<Row>
				- The order of resolution of action types / bot priority cycling:
			</Row>
			
			<ListContainer>
				<ul className = 'noBullets'>
					<li>
						0. WAIT
					</li>
					<li>
						1. SWITCH
					</li>
					<li>
						2. GUARD
					</li>
					<li>
						3. COUNTER
					</li>
					<li>
						4. REDIRECT
					</li>
					<li>
						11. MELEE-ATTACK; RANGED-ATTACK; AIM-AND-ATTACK
					</li>
					<li>
						13. 11ATTACK
					</li>
					<li>
						15. RAM; CHARGE
					</li>
					<li>
						17. MOVE; *collision_tests
					</li>
					<li>
						20. *burn; *cell_damage
					</li>
					<li>
						21. AIM
					</li>
					<li>
						22. SCAN
					</li>
					<li>
						23. REPAIR
					</li>
					<li>
						24. RECHARGE
					</li>
					<li>
						32. *auto_scan 
					</li>
					<li>
						33. *auto_repair
					</li>
					<li>
						34. *auto_recharge
					</li>
					<li>
						35. *reload
					</li>
					<li>
						40. *refresh_collision_potentials
					</li>
					<li>
						41. *remove_destroyed_bots
					</li>
					<li>
						42. *test_game_end
					</li>

				</ul>
			</ListContainer>
			<Row>
				- Equipment, accessories, skill tree planning
				<br/>
				- The script based protocols, Energy costs cannot be reduced to less than 1
				<br/>
				- Attributes of bots
				<br/>
				- Damage formulas: Damage cannot be reduced to less than 1
			</Row>
    </Wrapper>
  )
}
export default Rules;

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
	overflow-y: auto;
	align-content: center;
	align-items: center;	
`
const Row = styled.div`
	margin: 20px;
	width: 100%;
	display : flex;
	flex-direction: row;
	justify-content: center;
	align-content: center;
	align-items: center;
`
const ListContainer = styled.div`
	margin: 20px;
	width: 100%;
	/* display : flex;
	flex-direction: row;
	justify-content: flex-start; */
	/* align-content: center;
	align-items: center; */
`