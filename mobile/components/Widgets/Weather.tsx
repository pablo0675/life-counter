import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import theme from "../../Theme";

const LATITUDE = 48.81514;
const LONGITUDE = 2.36315;

const WEATHER_API = "https://api.open-meteo.com/v1/forecast";

function Weather(): JSX.Element {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [temperature, setTemperature] = useState(0);
    const [condition, setCondition] = useState(0);

    const refresh = () => {
        fetch(
            `${WEATHER_API}?current_weather=true&latitude=${LATITUDE}&longitude=${LONGITUDE}`
        ).then(async (response) => {
            const data = await response.json();

            setTemperature(Math.round(data.current_weather.temperature));
            setCondition(data.current_weather.weathercode);
        });
    };

    useEffect(() => {
        refresh();
    }, []);

    return (
        <TouchableOpacity
            style={[styles.container, weatherStyles.container]}
            onPress={() => {
                navigation.navigate("Widget", {
                    widgetType: "weather",
                });
                refresh();
            }}
        >
            <Image
                style={{ width: 32, height: 32 }}
                source={require("../../assets/Weather.png")}
            />
            <Text style={[styles.text, weatherStyles.temperature]}>
                {temperature}°
            </Text>
            <Text style={[styles.text, weatherStyles.condition]}>
                {condition}%
            </Text>
        </TouchableOpacity>
    );
}

const weatherStyles = StyleSheet.create({
    container: {
        backgroundColor: "#5e91fe",
    },
    temperature: {
        fontSize: 36,
    },
    condition: {
        fontSize: 14,
    },
});

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
});

export default Weather;
