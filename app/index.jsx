import { StyleSheet, Text, View, Image } from "react-native";
import { Link } from "expo-router";
import React, { useContext } from "react";


import MusicSymbol from '../assets/img/music-symbol.png'
import ThemedView from "../Components/ThemedView";
import ThemedText from "../Components/ThemedText";

const Home = () => {
    return (

        <ThemedView style={styles.container}>
            <Image source={MusicSymbol} style={styles.img}/>

            <ThemedText style={styles.title}>Music App</ThemedText>
            <Link href='/Login' style={styles.link}>Login</Link>
            <Link href='/Register' style={styles.link}>Register</Link>
        </ThemedView>
        
    )
}

export default Home

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
    img: {
        marginVertical: 20,
        maxWidth: 100,
        maxHeight: 100,
    },
    link: {
        marginVertical: 10,
        borderBottomWidth: 1,
    }
})