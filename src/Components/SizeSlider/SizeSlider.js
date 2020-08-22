import React from 'react';
import styled from 'styled-components';

import {
  setCellSize
} from '../../Redux/actions';

import { useSelector, useDispatch } from "react-redux";
import { getThemeColors } from '../../Redux/reducers/user-reducer';

const SizeSlider = ({ disabled }) => {
  const dispatch = useDispatch();
  const [dialClicked, setDialClicked] = React.useState(false);
  const colors = useSelector(getThemeColors);
  const cellSize = useSelector((state) => state.settings.cellSize);
  // Before reducer re-factor: color = {userInfo.colorTheme && userInfo.colorTheme.secondary || colors.secondary}

  const pixelCountToCellSize = (pxCount) => {
    let cellSize = 5*Math.pow(Math.E, 0.046*pxCount)
    return cellSize
  }

  let left = '0%'

  React.useEffect((event) => {
    // console.log('useEffect hit, dialCilicked:', dialClicked)
    const handleMove = (ev) => {
      let bar = document.getElementById('bar');
      let appliedMouseLocation = null;
      if (bar.getBoundingClientRect().x > ev.clientX) appliedMouseLocation = 0;
      else if (bar.getBoundingClientRect().x + bar.getBoundingClientRect().width < ev.clientX) appliedMouseLocation = 100;
      else appliedMouseLocation = ev.clientX-bar.getBoundingClientRect().x;
      dispatch(setCellSize(pixelCountToCellSize(appliedMouseLocation)));
    }
    dialClicked ? window.addEventListener('mousemove',handleMove) : window.removeEventListener('mousemove',handleMove);
    return ()=>{
      window.removeEventListener('mousemove',handleMove)
    }
  },[dialClicked,dispatch]);

  const handleClick = () => {
    setDialClicked(!dialClicked);
  }

  const leftPosition = (cellSize) => {
    let percentage = 21.71*Math.log(cellSize)-34.94;
    return percentage + '%';
  }
  left = leftPosition(cellSize);

  return (
    <Wrapper
    color = {colors.secondary}
    hoverColor = {colors.hovered}
    disabled = {disabled}
    >
      <Bar
      id = 'bar'
      >
        <Dial
        id = 'dial'
        color = {colors.secondary}
        hoverColor = {colors.hovered}
        border = {colors.textColor}
        disabled = {disabled}
        left = {left}
        onClick = {handleClick}
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
  &:hover {
    background-color: ${props => props.disabled ? `${props.color}` : `${props.hoverColor}`};
  }
`
const Bar = styled.div`
  width: 100%;
  height: 3px;
  background-color: rgba(0,0,0,0.5);
  border-radius: 6px;
  display: flex;
  justify-content: left;
  text-align: center;
  align-items: center;
`
const Dial = styled.div`
position: relative;
height: 15px;
width: 6px;
left : ${props => props.left};
background-image: ${props => `linear-gradient(${props.hoverColor}, rgba(0,0,0,0.5), ${props.hoverColor})`};
border: rgba(0,0,0,0.5) 1px solid;
border-radius: 3px;
&:hover {
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    background-image: ${props => props.disabled ? `linear-gradient(${props.hoverColor}, rgba(0,0,0,0.5), ${props.hoverColor})` : `linear-gradient(${props.color}, ${props.hoverColor}, ${props.color})`};
  }
`