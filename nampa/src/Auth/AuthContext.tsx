import React, { createContext, useCallback, useState } from "react";
import { tokenFetch, noTokenFetch } from "../helpers/fetch";
import Swal from "sweetalert2";

import axios from "axios";
interface Auth {
  username: String | null;
  checking: Boolean;
  logged: Boolean;
  name: String | null;
}

interface AuthContextInterface {
  auth: Auth;
  login: (username: string, password: string) => Promise<boolean>;
  register: (
    name: string,
    username: string,
    password: string
  ) => Promise<boolean>;
  checkLoginToken: () => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext({} as AuthContextInterface);

const initialState: Auth = {
  username: null,
  checking: true,
  logged: false,
  name: null,
};

interface LoginData {
  message: string;
  token: string;
  user: { username: string; name: string };
  ok: boolean;
}

export const AuthProvider: React.FC = ({ children }) => {
  const [auth, setAuth] = useState(initialState);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    const url = "http://localhost:3001/api/users/login";

    await axios
      .post<LoginData>(url, { username, password })
      .then((resp) => {
        if (resp.data.ok) {
          localStorage.setItem("token", resp.data.token);
          const { user } = resp.data;
          setAuth({
            username: user.username,
            checking: false,
            logged: true,
            name: user.name,
          });
          return true;
        } else {
          setAuth({
            username: null,
            checking: false,
            logged: true,
            name: null,
          });
          return false;
        }
      })
      .catch((error) => {
        Swal.fire(
          "Error",
          "Ha ocurrido un error. Inténtelo nuevamente más tarde",
          "error"
        );
        return false;
      });
    return true;
  };

  const register = async (
    name: string,
    username: string,
    password: string
  ): Promise<any> => {
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

    if (resp.ok) {
      // const { user } = resp;
      const { username, checked, name } = resp.token;
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
      name: null,
      username: null,
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
