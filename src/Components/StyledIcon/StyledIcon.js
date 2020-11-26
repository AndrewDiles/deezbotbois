import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { playSFX } from '../../Redux/actions';
import { Icon } from "react-icons-kit";
import { useSelector } from "react-redux";
import { getThemeColors } from "../../Redux/reducers/user-reducer";
import { xCircle } from "react-icons-kit/feather/xCircle";

const StyledIcon = ({
  handleClick,
  disabled,
  selected,
  children,
  icon,
  glowing,
  size,
  padding,
  absolute,
  id,
  rotation,
  hovered,
	keepcursor,
	sfx
}) => {
	const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  let colors = useSelector(getThemeColors);
  if (settings.currentUrl === "settings") colors = settings.colorsTesting;
  if (settings.serverStatus !== "idle") disabled = true;
  if (!keepcursor) keepcursor = 0;
  if (!handleClick) {
    handleClick = () => {};
  }
  if (!icon) {
    console.log("An icon was not properly passed down");
    icon = xCircle;
    colors.textColor = "red";
  }
  return (
    <IconStylings
			id={id}
			className = 'baseIconStyles'
      disabled={disabled || null}
			onClick={ disabled ? sfx ? ()=>{dispatch(playSFX('disabled'))} : {}
				: sfx ? (ev)=>{handleClick(ev);dispatch(playSFX(sfx))} : (ev)=>{handleClick(ev)}
      }
      icon={icon}
      selected={selected}
      children={children}
      size={size || 30}
      colors={colors}
      glowing={glowing}
      padding={padding}
      absolute={absolute}
      rotation={rotation}
      hovered={hovered}
			keepcursor={keepcursor}
    >
      {children}
    </IconStylings>
  );
};
export default StyledIcon;

const IconStylings = styled(Icon)`
  padding: ${(props) => props.padding && `${props.padding}px`};
  padding-bottom: ${(props) => props.padding === "mini" && "5px"};
  position: ${(props) => (props.absolute ? "absolute" : "relative")};
  color: ${(props) =>
    !props.glowing && props.hovered
      ? props.colors.hoveredText
      : props.selected
      ? props.colors.textColor
      : props.colors.textColor};
  animation: ${(props) => props.glowing && "1s linear infinite alternate glowGift"};
	transform: ${(props) => props.rotation && `rotate(${props.rotation}deg)`};
	opacity: ${(props) => props.disabled && 0.5};
  background-color: ${(props) =>
    props.hovered
      ? props.colors.hovered
      : props.selected
      ? props.colors.selected
      : props.colors.notSelected};
  &:hover {
    cursor: ${(props) =>
      props.keepcursor ? "cursor" : props.disabled ? "not-allowed" : "pointer"};
    background-color: ${(props) =>
      !props.disabled && props.selected
        ? props.selected
        : props.colors.hovered};
    color: ${(props) => !props.disabled && props.colors.hoveredText};
  }
  > i {
    text-align: center;
    justify-content: center;
    align-self: center;
  }
`;
