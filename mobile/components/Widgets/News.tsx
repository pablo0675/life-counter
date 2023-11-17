import React from "react";
import { Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import theme from "../../Theme";

function News(): JSX.Element {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                navigation.navigate("Widget", { widgetType: "news" });
            }}
        >
            <Image
                style={styles.logo}
                source={require("../../assets/NewsLogo.png")}
            />
            <Text style={styles.text}>News</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#508CA4",
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
        width: 32,
        height: 32,
    },
});

export default News;
