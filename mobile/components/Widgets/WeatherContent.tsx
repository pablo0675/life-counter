import React from "react";
import WebView from "react-native-webview";
import { StyleSheet } from "react-native";

const WEATHER_URL = "https://weather.com/fr-FR/temps/aujour/l/ccb7b6dc48e255339753562e6a8ea1b48b796d68cc275ef58b3d8fe4c9b75fa7";

function WeatherContent(): JSX.Element {
    return (
        <WebView
            javaScriptEnabled={false}
            geolocationEnabled={true}
            showsVerticalScrollIndicator={false}
            style={styles.container}
            source={{ uri: WEATHER_URL }}
        />
    );
}

const styles = StyleSheet.create({
    container: {},
});

export default WeatherContent;
