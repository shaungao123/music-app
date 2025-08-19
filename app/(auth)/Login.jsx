import { StyleSheet, Text, View, Pressable} from 'react-native'
import React from 'react'
import { Link } from "expo-router";
import { Colors } from '../../constants/Colors';

import ThemedView from '../../Components/ThemedView';
import ThemedText from '../../Components/ThemedText';
import Spacer from '../../Components/Spacer'
import ThemedButton from '../../Components/ThemedButton';
import { handleUrlParams } from 'expo-router/build/fork/getStateFromPath-forks';

const Login = () => {
    const handleLogin = () => {
        console.log('Logged in');
    }
  return (
    <ThemedView style={styles.container}>
        <Spacer></Spacer>
        <ThemedText title={true} style={styles.title}>
            Login To Your Account
        </ThemedText>

        <ThemedButton
            onPress = {handleLogin}
        >
            <Text style={{color: '#f2f2f2'}}>Login</Text>
        </ThemedButton>

        <Spacer height={100}></Spacer>
        <Link href='/Register'>
            <ThemedText style={{textAlign: 'center'}}>
                Create an Account
            </ThemedText>
        </Link>

    </ThemedView>
  )
}

export default Login

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
    },
})