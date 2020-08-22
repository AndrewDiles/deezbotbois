import React from 'react';
import styled from 'styled-components';
import { useSelector } from "react-redux";

const Home = () => {
  const settings = useSelector((state) => state.settings);
  return (
    <div>
      Welcome Home
    </div>
  )
}
export default Home;