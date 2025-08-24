import { StyleSheet, Text, View, Pressable, TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native'
import React, { useState } from 'react'
import { Link } from "expo-router";
import { Colors } from '../../constants/Colors';

import ThemedView from '../../Components/ThemedView';
import ThemedText from '../../Components/ThemedText';
import Spacer from '../../Components/Spacer'
import ThemedButton from '../../Components/ThemedButton';
import { handleUrlParams } from 'expo-router/build/fork/getStateFromPath-forks';
import ThemedTextInput from '../../Components/ThemedTextInput';

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const handleRegister = () => {
        console.log('Registered', username, password);
    }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ThemedView style={styles.container}>
            <Spacer></Spacer>
            <ThemedText title={true} style={styles.title}>
                Register For an Account
            </ThemedText>

            <ThemedTextInput
                style={{width: '80%', marginBottom: 20}} 
                placeholder = 'Username'
                keyboardType='default'
                onChangeText={setUsername}
                value={username}
            />

            <ThemedTextInput
                style={{width: '80%', marginBottom: 20}} 
                placeholder = 'Password'
                onChangeText={setPassword}
                value={password}
                secureTextEntry
            />

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
    </TouchableWithoutFeedback>
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