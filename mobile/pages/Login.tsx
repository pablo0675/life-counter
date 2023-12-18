import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import { Button } from '@rneui/themed';
import theme from '../Theme';
import axios from "axios";
import logo from "../assets/logo.png";

const AsyncStorage = require('@react-native-async-storage/async-storage').default;

global.Buffer = require('buffer').Buffer;

let CREDENTIALS = {
    email: " ",
    password: " ",
};

async function getToken(): Promise<any | null> {
    try {
        const res = await axios.post(
            `https://server-o53dp.ondigitalocean.app/auth/login`,
            {
                email: CREDENTIALS.email,
                password: CREDENTIALS.password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            }
        );
        if (res.status !== 201) {
            return null;
        }
        const data = res.data;
        return data;
    } catch (error) {
        alert(error.response.data.message);
        return null;
    }
}

async function connect(Email, password, navigation) : Promise<void> {
    Email = "pablo.levy@epitech.eu"
    password = "pabloblo"
    if (Email === '' || password === '') {
        alert("Error: empty field");
        return;
    }

    CREDENTIALS.email = Email.toLowerCase();
    CREDENTIALS.password = password;

    const callResult = await getToken();
    console.log(callResult);
    if (callResult === null) {return;}
    const access_token = callResult.token;
    const user_id = callResult.id;

    try {
        await AsyncStorage.setItem('token', access_token);
        await AsyncStorage.setItem('email', Email);
        await AsyncStorage.setItem('user_id', user_id.toString());
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
                <Button
                    title="Register"
                    loading={false}
                    loadingProps={{ size: 'small', color: 'white' }}
                    buttonStyle={styles.button}
                    onPress={() => {navigation.navigate('Register')}}
                />
            </View>
        </View>
    );
}

export default Login;
export { connect };


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
        backgroundColor: theme.colors.TextZone,
        color: theme.colors.White,
        textDecorationColor: theme.colors.White,
        borderRadius: 10,
        padding: 10,
        margin: 15,
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
