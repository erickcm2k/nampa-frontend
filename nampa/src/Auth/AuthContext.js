import React, { createContext, useCallback, useState } from "react";
import { tokenFetch, noTokenFetch } from "../helpers/fetch";

export const AuthContext = createContext();

const initialState = {
  username: null,
  checking: true,
  logged: false,
  name: null,
  email: null,
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);

  const login = async (email, password) => {
    const resp = await noTokenFetch("login", { email, password }, "POST");

    if (resp.ok) {
      localStorage.setItem("token", resp.token);
      const { user } = resp;

      setAuth({
        username: user.username,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      });
    }

    return resp.ok;
  };

  const register = async (name, email, password) => {
    const resp = await noTokenFetch(
      "login/new",
      { name, email, password },
      "POST"
    );

    if (resp.ok) {
      localStorage.setItem("token", resp.token);
      const { user } = resp;

      setAuth({
        username: user.username,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      });

      return true;
    }

    return resp.msg;
  };

  const checkLoginToken = useCallback(async () => {
    const token = localStorage.getItem("token");
    // Si token no existe
    if (!token) {
      setAuth({
        username: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });

      return false;
    }

    const resp = await tokenFetch("login/renew");
    if (resp.ok) {
      localStorage.setItem("token", resp.token);
      const { usuario } = resp;

      setAuth({
        username: usuario.username,
        checking: false,
        logged: true,
        name: usuario.name,
        email: usuario.email,
      });

      return true;
    } else {
      setAuth({
        username: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });

      return false;
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({
      checking: false,
      logged: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        register,
        checkLoginToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
