import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import styled from "styled-components";
import { updateUrl } from "./Redux/actions";
import { getThemeColors } from './Redux/reducers/user-reducer';

import GlobalStyles from "./Components/GlobalStyles/GlobalStyles";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Components/Home/Home";
import Levels from "./Components/Levels/Levels";
import Test from "./Components/Test/Test";
import Settings from "./Components/Settings/Settings";


function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const colors = useSelector(getThemeColors);
  
  React.useEffect(() => {
    let trimmedUrl = window.location.href.replace("http://localhost:3000/", "")
    if (trimmedUrl === "") trimmedUrl = "home";
    dispatch(updateUrl(trimmedUrl));
    setTimeout(()=>{
      document.getElementById('root').style.display = 'block';
      setIsLoading(false);
    },1000)
  }, [dispatch]);

  return (
    <Router>
      <GlobalStyles />
        {!isLoading && <NavBar />}
        {isLoading && <BlackScreen/>}
        <Wrapper 
        navLocation = {settings.navLocation}
        color = {colors.primary}
        >
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route exact path="/home">
              <Home/>
            </Route>
            <Route exact path="/login">
              {/* <Login /> */}
            </Route>
            <Route exact path="/settings">
              <Settings />
            </Route>
						<Route exact path="/levels">
              <Levels />
            </Route>
            {/* <Route exact path="/view-lobby">
              {userInfo.user? (
                <Lobby/>
              ) : (
                <Redirect to="/home" />
              )}
            </Route> */}
            <Route path="/test">
              <Test/>
            </Route>
            <Route path="/:">{/* <NotFound/> */}</Route>
          </Switch>
        </Wrapper>
    </Router>
  );
}

export default App;
const BlackScreen = styled.div`
  position: absolute;
  left: 0%;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: black;
`
const Wrapper = styled.div`
  background-color: ${props => props.color};
  position: absolute;
  width: 100%;
  height: 100%;
  animation: 1s ease-out 1 loadInScreen;
  display: flex;
  flex-direction: ${(props) =>
    props.navLocation === "top" ? "row" : "column"};
  margin: ${(props) =>
    props.navLocation === "top" ? "50px 0 0 0" : "0 0 0 125px"};
  justify-content: center;
  align-items: center;
  align-content: center;
  overflow: hidden;
`;