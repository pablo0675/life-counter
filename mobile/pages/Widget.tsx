import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AppIdentity from "../components/AppIdentity";
import WeatherContent from "../components/Widgets/WeatherContent";
import NewsContent from "../components/Widgets/NewsContent";

import WidgetContainer from "../components/WidgetContainer";
import theme from "../Theme";
import SnakeContent from "../components/Widgets/SnakeContent";
import CatContent from "../components/Widgets/catContent";
import QuoteContent from "../components/Widgets/QuoteContent";
import HoroscopeContent from "../components/Widgets/HoroscopeContent";

function Widget({ navigation, route }): JSX.Element {
    return (
        <View style={styles.container}>
            <AppIdentity />
            <TouchableOpacity style={styles.goBackContainer} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.goBackText}>
                    {"< Go Back"}
                </Text>
            </TouchableOpacity>
            <View style={styles.widgetContainer}>
                {route.params.widgetType === "weather" && <WeatherContent />}
                {route.params.widgetType === "snake" && <SnakeContent />}
                {route.params.widgetType === "cat" && <CatContent />}
                {route.params.widgetType === "news" && <NewsContent />}
                {route.params.widgetType === "quote" && <QuoteContent />}
                {route.params.widgetType === "horoscope" && <HoroscopeContent />}
            </View>
            <WidgetContainer />
        </View>
    );
}

export const styles = StyleSheet.create({
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
        fontSize: 40,
        marginTop: 10,
        color: theme.colors.White,
    },
    widgetContainer: {
        minWidth: 360,
        minHeight: 500,
        backgroundColor: theme.colors.FirstFrontLayer,
    },
    goBackContainer: {
        position: "absolute",
        top: 100,
        right: 260,
    },
    goBackText: {
        fontSize: 20,
        color: theme.colors.White,
        textDecorationLine: "underline"
    }
});

export default Widget;
