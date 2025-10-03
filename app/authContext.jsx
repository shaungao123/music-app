// AuthContext.js
import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const userContext = createContext(null);

// Create a pre-configured axios instance
const api = axios.create({
  baseURL: "http://localhost:8000", // your backend root
  headers: { "Content-Type": "application/json" },
});

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);


  // --- Login ---
  async function login(username, password) {
    try {
      const res = await api.post("/auth/login", { username, password });

      setAccessToken(res.data.access_token);
      setUser(res.data.user);
      return true;
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  }

  // --- Logout ---
  function logout() {
    setAccessToken(null);
    setUser(null);
  }

  // --- Register ---
  async function register({
    username,
    email,
    display_name,
    country,
    notification_enabled = true,
    email_notifications = true,
    push_notifications = true,
    password,
  }) {
    try {
      const res = await api.post("/auth/register", {
        username,
        email,
        display_name,
        country,
        notification_enabled,
        email_notifications,
        push_notifications,
        password,
      });

      setAccessToken(res.data.access_token);
      setUser(res.data.user);
      return true;
    } catch (err) {
      console.error("Register error:", err);
      return false;
    }
  }

  // --- Protected request helper ---
  async function authFetch(url, options = {}) {
    if (!accessToken) throw new Error("Not authenticated");

    try {
      const res = await api.request({
        url,
        method: options.method || "GET",
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${accessToken}`,
        },
        data: options.body || undefined, // axios uses `data` instead of `body`
      });
      return res;
    } catch (err) {
      console.error("authFetch error:", err);
      
      // Handle token expiration
      if (err.response?.status === 401) {
        console.log("Token expired, logging out user");
        logout();
        throw new Error("Session expired. Please log in again.");
      }
      
      throw err;
    }
  }

  return (
    <userContext.Provider value={{ accessToken, user, login, logout, register, authFetch }}>
      {children}
    </userContext.Provider>
  );
}

export function useAuth() {
  return useContext(userContext);
}
