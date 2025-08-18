import React, { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("ers_jwt") || "");

  const login = (employeeId) => {
    const payload = btoa(JSON.stringify({ sub: String(employeeId), iat: Date.now() }));
    const fake = `eyJhbGciOiJIUzI1NiJ9.${payload}.signature`;
    setToken(fake);
    localStorage.setItem("ers_jwt", fake);
  };

  const logout = () => { setToken(""); localStorage.removeItem("ers_jwt"); };

  const value = useMemo(() => ({ token, login, logout }), [token]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
