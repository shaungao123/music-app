import { View, Text, useColorScheme } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Colors } from '../../constants/Colors'
import { Ionicons } from '@expo/vector-icons'

const DashboardLayout = () => {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light

  return (
    <Tabs 
        screenOptions={{
            headerShown: false, 
            tabBarStyle: {
                backgroundColor: theme.navBackground,
                addingTop: 10,       
            },
            tabBarActiveTintColor: theme.iconColorFocused,
            tabBarInactiveTintColor: theme.iconColor,
        }}
    >
        <Tabs.Screen 
            name='Releases' 
            options={{title: 'Releases', tabBarIcon: ({focused}) => (
                <Ionicons 
                    size={24}
                    name={focused ? 'musical-notes' : 'musical-notes-outline'}
                    color={focused ? theme.iconColorFocused : theme.iconColor}
                />
            )}}>
        </Tabs.Screen>

        <Tabs.Screen 
            name='Search' 
            options={{title: 'Search', tabBarIcon: ({focused}) => (
                <Ionicons 
                    size={24}
                    name={focused ? 'search' : 'search-outline'}
                    color={focused ? theme.iconColorFocused : theme.iconColor}
                />
            )}}>
        </Tabs.Screen>

        <Tabs.Screen 
            name='Following' 
            options={{title: 'Following', tabBarIcon: ({focused}) => (
                <Ionicons 
                    size={24}
                    name={focused ? 'people' : 'people-outline'}
                    color={focused ? theme.iconColorFocused : theme.iconColor}
                />
            )}}>
        </Tabs.Screen>
    </Tabs>
  )
}

export default DashboardLayout