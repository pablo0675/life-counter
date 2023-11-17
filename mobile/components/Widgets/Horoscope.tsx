import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {Image, TouchableOpacity, StyleSheet} from "react-native";

import theme from "../../Theme";

function Horoscope(): JSX.Element {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    return (
        <TouchableOpacity
            style={[styles.container, weatherStyles.container]}
            onPress={() => {
                navigation.navigate("Widget", {
                    widgetType: "horoscope",
                });
            }}
        >
            <Image
                style={{ width: 120 , height: 120, resizeMode: "contain", borderRadius: 10 }}
                source={require("../../assets/horoscope.png")}
            />
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


export default Horoscope;
