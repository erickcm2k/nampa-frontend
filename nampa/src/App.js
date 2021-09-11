import React, { useContext, useEffect } from "react";
import { AuthContext } from "./Auth/AuthContext";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import MainNavigation from "./Shared/MainNavigation";
import { LoginPage } from "./Auth/LoginPage";
import { RegisterPage } from "./Auth/RegisterPage";
import PlantsHome from "./Plants/Pages/PlantsHome";
import CreatePlant from "./Plants/Pages/CreatePlant";
import UpdatePlant from "./Plants/Pages/UpdatePlant";

function App() {
  const { auth, checkLoginToken } = useContext(AuthContext);

  useEffect(() => {
    checkLoginToken();
  }, [checkLoginToken]);

  let routes;

  if (auth.logged) {
    routes = (
      <Switch>
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
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/auth/login">
          <LoginPage />
        </Route>
        <Route exact path="/auth/register">
          <RegisterPage />
        </Route>
        <Redirect to="/auth/login" />
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
