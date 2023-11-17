import React from "react";
import { Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import logo from "../assets/logo.png";
import theme from "../Theme";

function Welcome({ navigation }) {
    const navigateToLogin = () => {
        navigation.navigate("Login");
    };
    const navigateToRegister = () => {
        navigation.navigate("Register");
    };


    return (
        <TouchableOpacity style={styles.container}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.text}>Welcome !</Text>

            <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={navigateToRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <Text style={styles.hint}>
                Please choose an option...
            </Text>
        </TouchableOpacity>
    );
}

export default Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.DarkLayer,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 100,
        height: 100,
    },
    text: {
        fontSize: 35,
        marginTop: 16,
        color: theme.colors.White,
    },
    button: {
        backgroundColor: theme.colors.FirstFrontLayer,
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: theme.colors.SndBackLayer,
        fontSize: 25,
    },
    hint: {
        color: theme.colors.White,
        fontSize: 16,
        marginTop: 32,
    },
});
