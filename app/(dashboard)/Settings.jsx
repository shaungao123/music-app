import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { Colors } from '../../constants/Colors'
import ThemedView from '../../Components/ThemedView'
import ThemedText from '../../Components/ThemedText'


const Settings = () => {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light
    return (
      <ThemedView style={[styles.container, {backgroundColor: theme.background}]}>
        <ThemedText style={styles.title}>Settings</ThemedText>
        <Link href='/' style={styles.link}>Home</Link>
      </ThemedView>
    )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        margin: 20,
    },
    link: {
        marginVertical: 10,
        borderBottomWidth: 1,
    }
})