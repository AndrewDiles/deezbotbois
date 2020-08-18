import React from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { updateUrl } from "./Redux/actions";

import GlobalStyles from "./Components/GlobalStyles/GlobalStyles";
import NavBar from "./Components/NavBar/NavBar";
import Test from "./Components/Test/Test";

function App() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  React.useEffect(() => {
    dispatch(updateUrl(window.location.href));
  }, []);

  return (
    <Router>
      <GlobalStyles />
      <NavBar />
      <Wrapper navLocation={settings.navLocation}>
        <Switch>
          <Route exact path="/">
            {/* <Home/> */}
          </Route>
          <Route exact path="/login">
            {/* <Login /> */}
          </Route>
          <Route exact path="/view-account">
            {/* <Account /> */}
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

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: ${(props) =>
    props.navLocation === "top" ? "row" : "column"};
  margin: ${(props) =>
    props.navLocation === "top" ? "50px 0 0 0" : "0 0 0 125px"};
  justify-content: center;
  align-items: center;
  align-content: center;
`;