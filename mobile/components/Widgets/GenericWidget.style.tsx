/*
 * Generic widget style (template)
 */

import { StyleSheet } from "react-native";

import theme from "../../Theme";

export const styles = StyleSheet.create({
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
});
