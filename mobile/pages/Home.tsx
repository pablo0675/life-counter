import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import theme from "../Theme";

import AppIdentity from "../components/AppIdentity";
import {Button} from "@rneui/themed";
import GoBack from "../components/GoBack";


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
        const id = await AsyncStorage.getItem('user_id');
        const res = await fetch(
            `https://server-o53dp.ondigitalocean.app/user/getUser?uid=${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
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

async function getUserConfig(): Promise<UserConfig | null> {
    try {
        const token = await AsyncStorage.getItem('token');
        const user_id = await AsyncStorage.getItem('user_id');
        const res = await fetch(
            `https://server-o53dp.ondigitalocean.app/users/get_all_configurations?token=${token}&user_id=${user_id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            },
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

async function getAllCounters(): Promise<Counter[] | null> {
    try {
        const user_id = await AsyncStorage.getItem('user_id');
        const res = await fetch(
            `https://server-o53dp.ondigitalocean.app/counter/get_all_counters?user_id=${user_id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            },
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
    const [user, setUser] = React.useState<User | null>(null);
    const [userConfig, setUserConfig] = React.useState<UserConfig | null>(null);
    const [counters, setCounters] = React.useState<Counter[] | null>(null);

    React.useEffect(() => {
        getUser().then((user) => {
            setUser(user);
        });
        getUserConfig().then((userConfig) => {
            setUserConfig(userConfig);
        });
        getAllCounters().then((counters) => {
            setCounters(counters);
        });
        storeUser(user).then(r => console.log("user set"));
    }, []);


    const storeUser = async (user: User) => {
        try {
            await AsyncStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
            console.error( +"test");
        }
    }


    const handleProfilePress = () => {
        navigation.navigate('Profile', {user: user});
    };

    const handleCreateCountersPress = () => {
        navigation.navigate('Counters');
    };

    const handleNewGamePress = () => {
        navigation.navigate('NewGame');
    }

    return (
        <View style={styles.container}>
            <AppIdentity navigation={navigation} />

            {user && (
                <View>
                    <GoBack Navigation={navigation} />
                    <TouchableOpacity style={styles.button} onPress={handleProfilePress}>
                        <Text style={styles.buttonText}>Profile {user.name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleCreateCountersPress}>
                        <Text style={styles.buttonText}>Create Counters</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleNewGamePress}>
                        <Text style={styles.buttonText}>New Game</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UpdateCounter')}>
                        <Text style={styles.buttonText}>Modify counters</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Welcome')}>
                        <Text style={styles.buttonText}>Disconnect</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 3,
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
    button: {
        backgroundColor: theme.colors.Button,
        color: theme.colors.White,
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: theme.colors.White,
        fontSize: 25,
        width: '100%',
        textAlign: 'center',
    },

});