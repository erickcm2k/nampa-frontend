import { createContext } from "react";

export const AuthContext = createContext({
  userId: null,
  token: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});
