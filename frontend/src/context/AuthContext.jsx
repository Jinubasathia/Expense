import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { registerTokenGetter } from "../utils/api";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("ers_jwt") || "");
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("ers_user");
      return raw && raw !== "undefined" ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  });

  useEffect(() => registerTokenGetter(() => token), [token]);

  const login = ({ token: t, user: u }) => {
    setToken(t);
    setUser(u);
    localStorage.setItem("ers_jwt", t);
    localStorage.setItem("ers_user", JSON.stringify(u));
  };

  const logout = () => {
    setToken(""); setUser(null);
    localStorage.removeItem("ers_jwt");
    localStorage.removeItem("ers_user");
  };

  const value = useMemo(() => ({
    token, user, login, logout, isAuthed: !!token
  }), [token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
