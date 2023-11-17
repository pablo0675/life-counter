import React from 'react';
import { StyleSheet, View} from 'react-native';
import theme from "../Theme";

import AppIdentity from "../components/AppIdentity";
import WidgetContainer from "../components/WidgetContainer";
import PhotoContainer from "../components/PhotoContainer";
import DisplayOptions from "../components/DisplayOptions/DisplayOptions";

const AsyncStorage = require('@react-native-async-storage/async-storage').default;

interface User {
    id: number;
    name: string;
    email: string;
    surname: string;
    work: string;
    gender: string;
    birth_date: string;
    subordinates: number[];
    picture: string;
}


function Home({navigation}) {
    return (
        <View style={styles.container}>
            <AppIdentity/>
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.DarkLayer,
        justifyContent: 'center',
        alignItems: 'center',
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
});