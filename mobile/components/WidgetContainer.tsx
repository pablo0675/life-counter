/*
 * WidgetContainer component
 */

import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import theme from "../Theme";
import Weather from "./Widgets/Weather";
import News from "./Widgets/News";
import GenericWidget from "./Widgets/GenericWidget";
import Snake from "./Widgets/Snake";
import Cat from "./Widgets/cat";
import Quote from "./Widgets/Quote";
import Horoscope from "./Widgets/Horoscope";

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        backgroundColor: theme.colors.FirstBackLayer,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 180,
        display: "flex",
        flexDirection: "row",
    },
});

function WidgetContainer(): JSX.Element {
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                <Weather />
                <Snake />
                <Cat />
                <News />
                <Quote />
                <Horoscope />
            </ScrollView>
        </View>
    );
}

export default WidgetContainer;
