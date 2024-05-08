"use client";

import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  authorized: false,
  setAuthorized: () => {},
});

export default function AuthContextProvider({ children }) {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthorized(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authorized, setAuthorized }}>
      {children}
    </AuthContext.Provider>
  );
}
