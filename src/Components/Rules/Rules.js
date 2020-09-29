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
      A lot of rules will go here.
			<br/>
			Ranging from:
			<br/>
			- The nature of the game
			<br/>
			- The order of resolution of action types / bot priority cycling:
			<ol>
				<li>
					GUARD
				</li>
				<li>
					Melee Attacks 11AttackMelee
				</li>
				<li>
					RAM / Charge
				</li>
				<li>
					Movement / test for collisions
				</li>
				<li>
					Test for projectile / cell damage
				</li>
				<li>
					Aim, Ranged Attacks 
				</li>
				<li>
					AimAndRangedAttack, 11AttackRanged and Projectiles movement
				</li>
				<li>
					Test for projectile / cell damage
				</li>
				<li>
					Scan. Free info: Detect adjacent.
				</li>
				<li>
					AUTO-REPAIR, RECHARGE
				</li>
				<li>
					internal bot updates: reload, repair from nano-bots
				</li>
				<li>
					Internal cleanup: refresh collision potentials, remove destroyed bots from lists.  Test for game win / loss conditions
				</li>
			</ol>
			<br/>
			- Equipment, accessories, skill tree planning
			<br/>
			- The script based protocols, Energy costs cannot be reduced to less than 1
			<br/>
			- Attributes of bots
			<br/>
			- Damage formulas: Damage cannot be reduced to less than 1

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
	color: ${props => props.colors.textColor};
	width: 100%;
	height: 100%;
	overflow: auto;
	display : flex;
	flex-direction: row;
	justify-content: center;
	align-content: center;
	align-items: center;
	color: ${props => props.colors.textColor};
	width: 100%;
	height: 100%;
	/* display : flex;
	flex-direction: row;
	justify-content: center;
	align-content: center;
	align-items: center; */
`