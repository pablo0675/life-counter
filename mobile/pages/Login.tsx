import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import { Button } from '@rneui/themed';
import theme from '../Theme';
import axios from "axios";
import logo from "../assets/Logo.png";

const AsyncStorage = require('@react-native-async-storage/async-storage').default;

global.Buffer = require('buffer').Buffer;

const API_URL = 'http://localhost:8080';

let CREDENTIALS = {
    email: " ",
    password: " ",
};

async function getToken(): Promise<string | null> {
    try {
        const res = await axios.post(
            `${API_URL}/login`,
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
        return data.access_token;
    } catch (error) {
        alert("Error: wrong password or email");
        console.error('Error:', error);
        return null;
    }
}

async function connect(Email, password, navigation) : Promise<void> {
    if (Email === '' || password === '') {
        alert("Error: empty field");
        return;
    }

    CREDENTIALS.email = Email;
    CREDENTIALS.password = password;

    const access_token = await getToken();
    if (!access_token) {
        return;
    }
    try {
        await AsyncStorage.setItem('token', access_token);
        await AsyncStorage.setItem('API_URL', API_URL);
        await AsyncStorage.setItem('email', Email);
    }
    catch (error) {
        console.error('Error: ', error);
    }
    navigation.navigate('Home');
}

function Login({ navigation }) : JSX.Element {
    const [idOrEmail, setIdOrEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.text}>Life Counter</Text>
            <View style={styles.card}>
                <Text style={styles.text2}>Log in</Text>
                <TextInput
                    style={styles.input}
                    placeholder="exemple@gmail.com"
                    placeholderTextColor={theme.colors.White}
                    value={idOrEmail}
                    onChangeText={setIdOrEmail}
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
                    title="Log in"
                    loading={false}
                    loadingProps={{ size: 'small', color: 'white' }}
                    buttonStyle={styles.button}
                    onPress={() => {connect(idOrEmail, password, navigation) ; setPassword(''); setIdOrEmail('')}}
                />
            </View>
        </View>
    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.DarkLayer,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: theme.colors.FirstBackLayer,
        borderRadius: 20,
        padding: 10,
        width: 300,
        height: 400,
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
        backgroundColor: theme.colors.SndBackLayer,
        color: theme.colors.White,
        textDecorationColor: theme.colors.White,
        borderRadius: 10,
        padding: 10,
        margin: 20,
        width: 250,
    },
    button: {
        backgroundColor: theme.colors.FirstFrontLayer,
        borderRadius: 10,
        padding: 10,
        margin: 20,
        width: 180,
    },
    buttonText: {
        color: theme.colors.DarkLayer,
        textAlign: 'center',
    },
});
