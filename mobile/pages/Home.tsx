import React from 'react';
import { StyleSheet, View} from 'react-native';
import theme from "../Theme";

import AppIdentity from "../components/AppIdentity";


const AsyncStorage = require('@react-native-async-storage/async-storage').default;

interface User {
    id: number;
    name: string;
    email: string;
    picture?: string;
}

interface Counter {
    id: number;
    name: string;
    user_id: number;
}

interface Player {
    id: number;
    name: string;
    user_id: number;
}

interface UserConfig {
    id: string;
    name: string;
    user_id: number;
    players: Player[];
    counters: Counter[];
}

interface UserConfig {
    id: number;
    user_id: number;
    key: string;
    value: string;
}

async function getUser(): Promise<User | null> {
    try {
        const res = await fetch(
            `https://server-o53dp.ondigitalocean.app/users/me`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': 'Bearer ' + await AsyncStorage.getItem('token'),
                },
            }
        );
        if (res.status !== 200) {
            return null;
        }
        const data = await res.json();
        return data;
    } catch (error) {
        alert(error.response.data.message);
        return null;
    }
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
        backgroundColor: theme.colors.Background,
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