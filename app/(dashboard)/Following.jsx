import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import ThemedText from '../../Components/ThemedText'
import ThemedView from '../../Components/ThemedView'


const Following = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Following</ThemedText>
      <Link href='/' style={styles.link}>Home</Link>
    </ThemedView>
  )
}

export default Following

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