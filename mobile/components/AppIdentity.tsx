import {Image, StyleSheet, View, Text} from "react-native";
import React from "react";
import logo from "../assets/logo.png";
import theme from "../Theme";

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 30,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    text: {
        color: theme.colors.White,
        fontSize: 30,
        fontWeight: 'bold',
    }
});

const AppIdentity = () => {
    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.text}>Life Counter</Text>
        </View>
    );
}

export default AppIdentity;