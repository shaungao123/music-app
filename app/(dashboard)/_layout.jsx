// app/(dashboard)/_layout.tsx
import React from "react";
import { Image, Pressable } from "react-native";
import { Tabs, Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { useColorScheme } from "react-native";
import ThemedText from "../../Components/ThemedText";

export default function DashboardLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitle: () => (
          <Link href="/Releases" asChild> 
            <Pressable hitSlop={8}>
              <ThemedText style={{ fontSize: 20, fontWeight: "bold" }}>
                Music App
              </ThemedText>
            </Pressable>
          </Link>
        ),
        headerLeft: () => (
            <Link href="/Profile" asChild>
              <Pressable>
                <Ionicons name="person-circle-outline" size={28} color="black" />
              </Pressable>
            </Link>
        ),
        headerRight: () => (
            <Link href="/Notifications" asChild>
                <Pressable>
                    <Ionicons name="notifications-outline" size={28} color="black" />
                </Pressable>
            </Link>
      ),
        headerTitleAlign: "center",
        headerLeftContainerStyle: { paddingLeft: 12 },
        headerRightContainerStyle: { paddingRight: 12 },
        tabBarStyle: {
          backgroundColor: theme.navBackground,
          paddingTop: 10
        },
        tabBarActiveTintColor: theme.iconColorFocused,
        tabBarInactiveTintColor: theme.iconColor,
      }}
    >
      <Tabs.Screen
        name="Releases"
        options={{
          title: "Releases",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons size={24} name={focused ? "musical-notes" : "musical-notes-outline"} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons size={24} name={focused ? "search" : "search-outline"} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Following"
        options={{
          title: "Following",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons size={24} name={focused ? "people" : "people-outline"} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons size={24} name={focused ? "settings" : "settings-outline"} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
            href: null,
            title: "Profile",
        }}
      />

    <Tabs.Screen
        name="Notifications"
        options={{
            href: null,
            title: "Notifications",
        }}
      />
    </Tabs>
  );
}
