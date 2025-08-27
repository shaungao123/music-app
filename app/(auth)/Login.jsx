// Login.jsx
import React, { useState } from "react";
import {
  StyleSheet, Text, Keyboard, TouchableWithoutFeedback,
  ActivityIndicator, View
} from "react-native";
import { Link, useRouter } from "expo-router";

import ThemedView from "../../Components/ThemedView";
import ThemedText from "../../Components/ThemedText";
import Spacer from "../../Components/Spacer";
import ThemedButton from "../../Components/ThemedButton";
import ThemedTextInput from "../../Components/ThemedTextInput";

import { loginUser } from "../../services/auth"; // ⟵ use loginUser (not handleLogin)

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onLogin = async () => {
    if (submitting) return;
    setError("");
    setSubmitting(true);
    try {
      const json = await loginUser({ username, password });
      console.log("LOGIN JSON:", json);
      // go to your app's home screen
      router.replace("/Releases"); // or whatever your first tab is
    } catch (e) {
      setError(e?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  const disabled = !username || !password || submitting;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <Spacer />
        <ThemedText title style={styles.title}>Login To Your Account</ThemedText>

        <ThemedTextInput
          style={{ width: "80%", marginBottom: 16 }}
          placeholder="Username"
          autoCapitalize="none"
          autoCorrect={false}
          value={username}
          onChangeText={setUsername}
          returnKeyType="next"
        />

        <ThemedTextInput
          style={{ width: "80%", marginBottom: 16 }}
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          value={password}
          onChangeText={setPassword}
          returnKeyType="go"
          onSubmitEditing={onLogin}
        />

        {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}

        <ThemedButton onPress={onLogin} disabled={disabled}>
          {submitting ? <ActivityIndicator /> : <Text style={{ color: "#f2f2f2" }}>Login</Text>}
        </ThemedButton>

        <Spacer height={100} />
        <Link href="/Register">
          <ThemedText style={{ textAlign: "center" }}>Create an Account</ThemedText>
        </Link>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { textAlign: "center", fontSize: 18, marginBottom: 30 },
  error: { color: "#e33", marginBottom: 12 },
});
