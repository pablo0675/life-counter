import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import { Button } from '@rneui/themed';
import theme from '../Theme';
import axios from "axios";
import logo from "../assets/logo.png";
import {connect} from "./Login";

const AsyncStorage = require('@react-native-async-storage/async-storage').default;

global.Buffer = require('buffer').Buffer;

const API_URL = 'https://server-o53dp.ondigitalocean.app';

let CREDENTIALS = {
    email: " ",
    username: " ",
    password: " ",
};

async function createUser(): Promise<string | null> {
    try {
        const res = await axios.post(
            `${API_URL}/auth/register`,
            CREDENTIALS,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            }
        );

        if (res.status !== 200) {
            return null;
        }
        const data = res.data;
        return data;
    } catch (error) {
        alert("Error: " + error.response.data.message);
        return null;
    }
}

async function callApi(Email, password, username, navigation) : Promise<void> {
    if (Email === '' || password === '' || username === '') {
        alert("Error: empty field");
        return;
    }

    CREDENTIALS.email = Email.toLowerCase();
    CREDENTIALS.username = username;
    CREDENTIALS.password = password;

    if (await createUser() === null) {return;}
    await connect(Email, password, navigation);
}

function Register({ navigation }) : JSX.Element {
    const [Email, setIdOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.text}>Life Counter</Text>
            <View style={styles.card}>
                <Text style={styles.text2}>Register</Text>
                <TextInput
                    style={styles.input}
                    placeholder="exemple@gmail.com"
                    placeholderTextColor={theme.colors.White}
                    value={Email}
                    onChangeText={setIdOrEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor={theme.colors.White}
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password..."
                    placeholderTextColor={theme.colors.White}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
                <Button
                    title="Register"
                    loading={false}
                    loadingProps={{ size: 'small', color: 'white' }}
                    buttonStyle={styles.button}
                    onPress={() => {callApi(Email, password, username, navigation) ; setPassword(''); setIdOrEmail('')}}
                />
                <Button
                    title="Login"
                    loading={false}
                    loadingProps={{ size: 'small', color: 'white' }}
                    buttonStyle={styles.button}
                    onPress={() => {navigation.navigate('Login'); setPassword(''); setIdOrEmail('')}}
                />
            </View>
        </View>
    );
}

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.Background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: theme.colors.Card,
        borderRadius: 20,
        padding: 10,
        width: 300,
        height: 500,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 10,
        color: theme.colors.White,
        padding: 30,
    },
    text2: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 30,
        color: theme.colors.White,
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: -30,
    },
    input: {
        backgroundColor: theme.colors.TextZone,
        color: theme.colors.White,
        textDecorationColor: theme.colors.White,
        borderRadius: 10,
        padding: 10,
        margin: 10,
        width: 250,
    },
    button: {
        backgroundColor: theme.colors.Button,
        borderRadius: 10,
        padding: 10,
        margin: 20,
        width: 180,
    },
    buttonText: {
        color: theme.colors.Background,
        textAlign: 'center',
    },
});
