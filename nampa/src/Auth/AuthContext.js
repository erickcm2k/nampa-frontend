import React, { createContext, useCallback, useState } from "react";
import { tokenFetch, noTokenFetch } from "../helpers/fetch";

export const AuthContext = createContext();

const initialState = {
  username: null,
  checking: true,
  logged: false,
  name: null,
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);

  const login = async (username, password) => {
    const resp = await noTokenFetch(
      "api/users/login",
      { username, password },
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
      });
    }

    return resp.ok;
  };

  const register = async (name, username, password) => {
    const resp = await noTokenFetch(
      "api/users/signup",
      { name, username, password },
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
      });

      return false;
    }

    const resp = await tokenFetch("api/users/info", {}, "POST");

    if (resp.checked) {
      console.log(resp);
      // const { user } = resp;
      const { username, checked, name } = resp;
      setAuth({
        username: username,
        checking: false,
        logged: checked,
        name: name,
      });

      return true;
    } else {
      setAuth({
        username: null,
        checking: false,
        logged: false,
        name: null,
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
