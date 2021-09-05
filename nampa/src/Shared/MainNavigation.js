import React from "react";
import { AuthContext } from "../Auth/AuthContext";

const MainNavigation = () => {
  const loginDetails = React.useContext(AuthContext);

  const buttonAction = loginDetails.isLoggedIn
    ? loginDetails.logout
    : loginDetails.login;

    console.log(loginDetails);

  return (
    <button onClick={() => buttonAction()}>{`${
      loginDetails.isLoggedIn ? "Cerrar sesión" : "Iniciar sesión"
    }`}</button>
  );
};

export default MainNavigation;
