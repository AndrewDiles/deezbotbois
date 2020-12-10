import React from 'react';
import styled from 'styled-components';

const BorderWall = ({ cellClicked }) => {

  return (
    <Wrapper className = 'startFlex col'>
			<h3>
				A BORDER WALL
			</h3>
			<p>
				BOTS CANNOT RESIDE ON WALLS
			</p>
			<p>
				PROJECTILES THAT REACH A WALL ARE STOPPED AND LEAVE BORDER WALLS UNAFFECTED 
			</p>
			<p>
				A BOT ATTEMPTING TO ENTER A CELL THAT CONTAINS A WALL WILL RECIEVE 1 UNMITIGATABLE DAMAGE
			</p>
			
		</Wrapper>
  )
}

export default BorderWall;
const Wrapper = styled.div`
	height: 100%;
	width: 100%;
`