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
        <Redirect to="/plantas" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/auth/login" exact>
          <LoginPage />
        </Route>
        <Route path="/auth/register" exact>
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
