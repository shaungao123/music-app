// auth.js (JavaScript)
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE =
  Platform.select({
    ios: "http://127.0.0.1:8000",    // iOS simulator
    android: "http://10.0.2.2:8000", // Android emulator
  }) || "http://192.168.1.23:8000";   // real device: your machine's LAN IP

  async function postJSON(path, body) {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    });

    const text = await res.text();    

    let data = null;
    data = text ? JSON.parse(text) : null;
    console.log(data);
  
    if (!res.ok) {
      const msg =
        (data && data.detail && data.detail[0] && data.detail[0].msg) ||
        (data && data.detail) ||
        `HTTP ${res.status}`;
      throw new Error(typeof msg === "string" ? msg : JSON.stringify(msg));
    }
    return data;
  }
  
  // Build the exact payload your FastAPI expects.
  // Required: username, password (email likely required too in your schema).
  export async function registerUser({
    username,
    email,
    display_name,
    country,
    notification_enabled = true,
    email_notifications = true,
    push_notifications = true,
    password,
  }) {
    const payload = {
      username,
      email,
      display_name,
      country,
      notification_enabled,
      email_notifications,
      push_notifications,
      password,
    };
    const json = await postJSON("/auth/register", payload);
    if (json?.access_token) {
      await AsyncStorage.setItem("access_token", json.access_token);
    }
    return json; // { access_token, token_type, expires_in, user: {...} }
  }


  export async function loginUser({ username, password }) {
    const json = await postJSON("/auth/login", { username, password });
    // Save token (and user if returned by your API)
    if (json?.access_token) {
      await AsyncStorage.setItem("access_token", json.access_token);
    }
    if (json?.user) {
      await AsyncStorage.setItem("current_user", JSON.stringify(json.user));
    }
    return json; // { access_token, token_type, expires_in, user: {...} }
  }