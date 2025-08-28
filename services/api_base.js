// apiBase.js
import { Platform } from "react-native";
import Constants from "expo-constants";
import * as Device from "expo-device";

const DEV_PORT = 8000;
// If auto-detection fails (e.g., older Expo), set your Mac's LAN IP here:
const HARDCODED_LAN = "http://192.168.1.23:8000"; // ← change to your LAN IP

function getLanFromExpo() {
  // In Expo dev, one of these usually exists and looks like "192.168.1.23:8081"
  const hostUri =
    (Constants.expoConfig && Constants.expoConfig.hostUri) ||
    (Constants.manifest && Constants.manifest.debuggerHost) ||
    (Constants.manifest2 &&
      Constants.manifest2.extra &&
      Constants.manifest2.extra.expoClient &&
      Constants.manifest2.extra.expoClient.hostUri) ||
    "";

  const host = String(hostUri).replace(/^https?:\/\//, "").split(":")[0];
  return host ? `http://${host}:${DEV_PORT}` : null;
}

// Priority:
// 1) Android emulator -> 10.0.2.2
// 2) iOS simulator -> 127.0.0.1
// 3) Real devices (iOS/Android) -> Expo-detected LAN
// 4) Fallback -> hardcoded LAN
const API_BASE =
  (Platform.OS === "android" && !Device.isDevice && `http://10.0.2.2:${DEV_PORT}`) ||
  (Platform.OS === "ios" && !Device.isDevice && `http://127.0.0.1:${DEV_PORT}`) ||
  getLanFromExpo() ||
  HARDCODED_LAN;

export default API_BASE;