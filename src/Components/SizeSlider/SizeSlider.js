import React from 'react';
import styled from 'styled-components';
import {
  setCellSize, playSFX
} from '../../Redux/actions';

import { useSelector, useDispatch } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';

const SizeSlider = ({ disabled }) => {
	const dispatch = useDispatch();
	const settings = useSelector((state) => state.settings);
  const [dialClicked, setDialClicked] = React.useState(false);
  let colors = useSelector(getThemeColors);
	if (settings.currentUrl === 'settings') colors = settings.colorsTesting;
  const cellSize = useSelector((state) => state.settings.cellSize);
  // Before reducer re-factor: color = {userInfo.colorTheme && userInfo.colorTheme.secondary || colors.secondary}

  const pixelCountToCellSize = (pxCount) => {
		// let cellSize = 5*Math.pow(Math.E, 0.046*pxCount) This was with range: 5, 50, 500
		let cellSize = 14.84*Math.pow(Math.E, 0.032*pxCount)
    return cellSize
  }

  let left = '0%'

  React.useEffect((event) => {
		// console.log('useEffect hit, dialCilicked:', dialClicked)
		let bar = document.getElementById('bar');
		let sliderWrapper = document.getElementById('sliderWrapper');
		let appliedMouseLocation = null;
    const handleMove = (ev) => {
      if (bar.getBoundingClientRect().x > ev.clientX) appliedMouseLocation = 0;
      else if (bar.getBoundingClientRect().x + bar.getBoundingClientRect().width < ev.clientX) appliedMouseLocation = 100;
      else appliedMouseLocation = ev.clientX-bar.getBoundingClientRect().x;
      dispatch(setCellSize(pixelCountToCellSize(appliedMouseLocation-3)));
    }
    dialClicked ? window.addEventListener('mousemove',handleMove) : window.removeEventListener('mousemove',handleMove);
		const handleBarClick = (ev) => {
			if (dialClicked) return;
			appliedMouseLocation = ev.clientX-bar.getBoundingClientRect().x;
			dispatch(setCellSize(pixelCountToCellSize(appliedMouseLocation-3)));
			setDialClicked(false);
			dispatch(playSFX('selected'));
		}
		sliderWrapper.addEventListener('mousedown', handleBarClick);
		return ()=>{
			window.removeEventListener('mousemove',handleMove);
			sliderWrapper.removeEventListener('mousedown', handleBarClick);
    }
  },[dialClicked,dispatch]);

  const handleClick = () => {
    setDialClicked(!dialClicked);
  }

  const leftPosition = (cellSize) => {
		// let percentage = 21.71*Math.log(cellSize)-34.94;  This was with range: 5, 50, 500
		let percentage = 30.45*Math.log(cellSize)-82.13;  // Using range: 15 75 400
    return percentage + '%';
  }
  left = leftPosition(cellSize);

  return (
    <Wrapper
		id = 'sliderWrapper'
    color = {colors.secondary}
    hoverColor = {colors.hovered}
		disabled = {disabled}
		dialClicked = {dialClicked}
    >
      <Bar
			id = 'bar'
			colors = {colors}
			dialClicked = {dialClicked}
      >
        <Dial
        id = 'dial'
        color = {colors.secondary}
        hoverColor = {colors.hoveredText}
        border = {colors.textColor}
        disabled = {disabled}
				left = {left}
				dialClicked = {dialClicked}
        // onClick = {()=>{handleClick()}}
        >
        </Dial>
      </Bar>
    </Wrapper>
  )
}
export default SizeSlider;

const Wrapper = styled.div`
  width: 100px;
  height: 35px;
  background-color: ${props => props.color };
  margin: 5px;
  border-radius: 5px;
  font-weight: bolder;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  transition: background-color .75s;
	z-index: 12;
  &:hover {
    background-color: ${props => props.disabled ? `${props.color}` : `${props.hoverColor}`};
		cursor: ${props => props.disabled ? 'not-allowed' : props.dialClicked ? 'ew-resize' : 'pointer'};
  }
`
const Bar = styled.div`
  width: 100%;
  height: 3px;
  background-color: ${props => props.colors ? props.colors.textColor : 'rgba(0,0,0,0.5)'};
  border-radius: 6px;
  display: flex;
  justify-content: left;
  text-align: center;
  align-items: center;
	&:hover {
		background-color: ${props => !props.dialClicked && props.colors.hoveredText};
	}
`
const Dial = styled.div`
position: relative;
height: 15px;
width: 6px;
left : ${props => props.left};
background-image: ${props => `linear-gradient(${props.hoverColor}, rgba(0,0,0,0.5), ${props.hoverColor})`};
border: rgba(0,0,0,0.5) 1px solid;
border-radius: 3px;
/* &:hover {
  background-image: ${props => props.disabled ? `linear-gradient(${props.hoverColor}, rgba(0,0,0,0.5), ${props.hoverColor})` : `linear-gradient(${props.color}, ${props.hoverColor}, ${props.color})`};
	cursor: ${props => props.disabled ? 'not-allowed' : props.dialClicked ? 'ew-resize' : 'grab'};
} */
`