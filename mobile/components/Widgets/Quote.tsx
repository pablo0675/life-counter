/*
 * News widget component
 */

import React from "react";
import { Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import theme from "../../Theme";

function Quote(): JSX.Element {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                navigation.navigate("Widget", { widgetType: "quote" });
            }}
        >
            <Image
                style={styles.logo}
                source={require("../../assets/Quote.png")}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.SndFrontLayer,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        width: 120,
        height: 120,
        margin: 10,
    },
    text: {
        color: theme.colors.White,
        fontSize: 30,
        fontWeight: "bold",
    },
    logo: {
        width: 86,
        height: 86,
    },
});

export default Quote;
