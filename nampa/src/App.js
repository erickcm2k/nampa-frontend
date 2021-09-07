import React, { useContext, useEffect } from "react";
import { AuthContext } from "./Auth/AuthContext";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import MainNavigation from "./Shared/MainNavigation";
import Plants from "./Plants/Pages/Plants";
import { LoginPage } from "./Auth/LoginPage";
import { RegisterPage } from "./Auth/RegisterPage";

function App() {
  const { auth, checkLoginToken } = useContext(AuthContext);

  console.log(AuthContext);
  useEffect(() => {
    checkLoginToken();
  }, [checkLoginToken]);

  let routes;
  if (auth.logged) {
    routes = (
      <Switch>
        <Route path="/" exact></Route>
        {/*        
          Ver mis plantas -> Editar planta (cambiar campos de texto y foto de perfil)
          Ver mi perfil -> Editar mi perfil (cambiar campos de texto)

          Aparece cerrar sesión en la parte del navbar.
        */}
        <Redirect to="/" />
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
