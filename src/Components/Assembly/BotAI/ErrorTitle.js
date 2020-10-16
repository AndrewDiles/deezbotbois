import React from "react";

import { useSelector } from "react-redux";
import { getThemeColors } from "../../../Redux/reducers/user-reducer";

import styled from "styled-components";
// import {circleLeft} from 'react-icons-kit/icomoon/circleLeft';
// import {notification} from 'react-icons-kit/icomoon/notification';
// import {circleRight} from 'react-icons-kit/icomoon/circleRight'

const ErrorTitle = ({ aiErrors }) => {
  const settings = useSelector((state) => state.settings);
  const colors = useSelector(getThemeColors);

  return <Title colors={colors}>AI ERRORS</Title>;
};
export default ErrorTitle;

const Title = styled.h3`
  color: ${(props) => props.colors.hoveredText};
`;
