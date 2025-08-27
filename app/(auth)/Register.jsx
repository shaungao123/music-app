import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Switch,
  View,
} from "react-native";
import { Link, useRouter } from "expo-router";

import ThemedView from "../../Components/ThemedView";
import ThemedText from "../../Components/ThemedText";
import Spacer from "../../Components/Spacer";
import ThemedButton from "../../Components/ThemedButton";
import ThemedTextInput from "../../Components/ThemedTextInput";

import { registerUser } from "../../services/auth";

const Register = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");                 // ← matches schema
  const [displayName, setDisplayName] = useState("");     // optional
  const [country, setCountry] = useState("");             // optional
  const [password, setPassword] = useState("");

  // booleans default to true per your example
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onRegister = async () => {
    if (submitting) return;
    setError("");
    setSubmitting(true);
    try {
      const json = await registerUser({
        username,
        email,
        display_name: displayName || username, // reasonable default
        country,                                // leave empty "" if not provided
        notification_enabled: notifEnabled,
        email_notifications: emailNotif,
        push_notifications: pushNotif,
        password,
      });
      console.log("REGISTER JSON:", json);
      // Navigate: either into app or to Login screen
      router.replace("/Login"); // or router.replace("/Login")
    } catch (e) {
      setError(e?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  const disabled = !username || !email || !password || submitting;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <Spacer />
        <ThemedText title style={styles.title}>
          Register For an Account
        </ThemedText>

        <ThemedTextInput
          style={styles.input}
          placeholder="Username"
          autoCapitalize="none"
          autoCorrect={false}
          value={username}
          onChangeText={setUsername}
          returnKeyType="next"
        />
        <ThemedTextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
          returnKeyType="next"
        />
        <ThemedTextInput
          style={styles.input}
          placeholder="Display name (optional)"
          value={displayName}
          onChangeText={setDisplayName}
          returnKeyType="next"
        />
        <ThemedTextInput
          style={styles.input}
          placeholder="Country (optional)"
          value={country}
          onChangeText={setCountry}
          returnKeyType="next"
        />
        <ThemedTextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          value={password}
          onChangeText={setPassword}
          returnKeyType="go"
          onSubmitEditing={onRegister}
        />

        {/* Notification toggles to match your boolean fields */}
        <View style={styles.row}>
          <ThemedText>Notifications Enabled</ThemedText>
          <Switch value={notifEnabled} onValueChange={setNotifEnabled} />
        </View>
        <View style={styles.row}>
          <ThemedText>Email Notifications</ThemedText>
          <Switch value={emailNotif} onValueChange={setEmailNotif} />
        </View>
        <View style={styles.row}>
          <ThemedText>Push Notifications</ThemedText>
          <Switch value={pushNotif} onValueChange={setPushNotif} />
        </View>

        {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}

        <ThemedButton onPress={onRegister} disabled={disabled}>
          {submitting ? (
            <ActivityIndicator />
          ) : (
            <Text style={{ color: "#f2f2f2" }}>Register</Text>
          )}
        </ThemedButton>

        <Spacer height={100} />
        <Link href="/Login">
          <ThemedText style={{ textAlign: "center" }}>
            Login to Your Account
          </ThemedText>
        </Link>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { textAlign: "center", fontSize: 18, marginBottom: 30 },
  input: { width: "80%", marginBottom: 16 },
  row: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  error: { color: "#e33", marginBottom: 12 },
});
