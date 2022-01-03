import React, { useContext, useEffect } from "react";
import { AuthContext } from "./Auth/AuthContext";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import UI02 from "./assets/UI02.jpeg";

import MainNavigation from "./Shared/MainNavigation";
import { LoginPage } from "./Auth/LoginPage";
import { RegisterPage } from "./Auth/RegisterPage";
import PlantsHome from "./Plants/Pages/PlantsHome";
import CreatePlant from "./Plants/Pages/CreatePlant";
import UpdatePlant from "./Plants/Pages/UpdatePlant";
import AreasHome from "./Areas/Pages/AreasHome.js";
import CreateArea from "./Areas/Pages/CreateArea"

import { Box } from "@chakra-ui/react";

function App() {
  const { auth, checkLoginToken } = useContext(AuthContext);

  useEffect(() => {
    checkLoginToken();
  }, [checkLoginToken]);

  let routes;

  if (auth.logged) {
    routes = (
      <Switch>
        <Box backgroundColor={'rgb(241,251,243)'} height={"2000px"}>
          <Route exact path="/areas">
            <AreasHome />
          </Route>
          <Route exact path="/newarea">
            <CreateArea />
          </Route>
          <Route exact path="/plantas">
            <PlantsHome />
          </Route>
          <Route exact path="/newplant">
            <CreatePlant />
          </Route>
          <Route exact path="/editplant/:plantId">
            <UpdatePlant />
          </Route>

          <Redirect to="/plantas" />
        </Box>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Box backgroundImage={UI02} backgroundSize="100vw" height="100vh">
          <Route exact path="/auth/login">
            <LoginPage />
          </Route>
          <Route exact path="/auth/register">
            <RegisterPage />
          </Route>
          <Redirect to="/auth/login" />
        </Box>
      </Switch>
    );
  }

  return (
    <Router>
      <MainNavigation />
      <main>{routes}</main>
    </Router>
  );
}

export default App;
