import React from "react";
import { Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import logo from "../assets/logo.png";
import theme from "../Theme";

function Welcome({ navigation }) {
    const navigateToLogin = () => {
        navigation.navigate("Login");
    };

    return (
        <TouchableOpacity style={styles.container} onPress={navigateToLogin}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.text}>Welcome !</Text>
            <Text style={styles.hint}>
                please touch to login...
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
    hint: {
        color: theme.colors.White,
        fontSize: 16,
        marginTop: 32,
    },
});
