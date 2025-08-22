import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from "expo-router";

import ThemedView from '../../Components/ThemedView';
import ThemedText from '../../Components/ThemedText';
import Spacer from '../../Components/Spacer'
import ThemedButton from '../../Components/ThemedButton';

const Register = () => {
    const handleRegister = () => {
        console.log('Registered');
    }

  return (
    <ThemedView style={styles.container}>
        <Spacer></Spacer>
        <ThemedText title={true} style={styles.title}>
            Register For an Account
        </ThemedText>

        <ThemedButton
            onPress = {handleRegister}
        >
            <Text style={{color: '#f2f2f2'}}>Register</Text>
        </ThemedButton>

        <Spacer height={100}></Spacer>
        <Link href='/Login'>
            <ThemedText style={{textAlign: 'center'}}>
                Login to Your Account
            </ThemedText>
        </Link>

    </ThemedView>
  )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 30,
    }
})