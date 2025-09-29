import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Create the context
const AuthContext = createContext(null);

// 2. Provider that wraps the app
export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(() => {
    return localStorage.getItem("access_token") || null;
  });

  // Persist token to localStorage whenever it changes
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("access_token", accessToken);
    } else {
      localStorage.removeItem("access_token");
    }
  }, [accessToken]);

  // Optional: logout helper
  const logout = () => {
    setAccessToken(null);
    localStorage.removeItem("access_token");
  };

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}
