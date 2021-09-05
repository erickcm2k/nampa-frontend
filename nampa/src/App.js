import React from "react";
import { useState, useCallback } from "react";
import { AuthContext } from "./Auth/AuthContext";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Home from "./Home/Pages/Home";
import MainNavigation from "./Shared/MainNavigation";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <div>Páginas a las que puedes acceder con sesión iniciada</div>
        </Route>
        {/* 
        

          Ver mis plantas -> Editar planta (cambiar campos de texto y foto de perfil)
          Ver mi perfil -> Editar mi perfil (cambiar campos de texto y foto de perfil)

          Aparece cerrar sesión en la parte del navbar.
          

        */}
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
          <div>Necesitas iniciar sesión para ver esto</div>
        </Route>
        {/* 
        
        Pantalla de Home con una descripción de lo que es Nampa
        
        Accesos directos para login y para sign in
        
        */}
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, login, logout }}>
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
