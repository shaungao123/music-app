import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Colors } from '../constants/Colors'
import { StatusBar } from 'expo-status-bar'

const RootLayout = () => {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light
  return (
    <>
      <StatusBar value='auto'></StatusBar>
       <Stack screenOptions={{
          headerStyle: {backgroundColor: theme.navBackground},
          headerTintColor: theme.title,
        }}>
          <Stack.Screen name='(auth)' options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen name='(dashboard)' options={{headerShown: false}}></Stack.Screen>

          <Stack.Screen name="index" options={{title: 'Home'}}></Stack.Screen>
        </Stack>
    </>

  )
}

export default RootLayout

const styles = StyleSheet.create({})