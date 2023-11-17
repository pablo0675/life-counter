import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import axios from "axios/index";
import React, {useEffect, useState} from "react";
import theme from "../Theme";

import AppIdentity from "../components/AppIdentity";
import WidgetContainer from "../components/WidgetContainer";
import {getUserPictureById} from "./Home";


const AsyncStorage = require('@react-native-async-storage/async-storage').default;

interface User {
    id: number;
    name: string;
    email: string;
    surname: string;
    work: string;
    gender: string;
    picture: string;
    birth_date: string;
    picture: string;
    subordinates: number[];
    subordinates_picture: string[];
}

async function getToken(): Promise<string | null> {
    try {
        const token = await AsyncStorage.getItem('token');
        return token;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

async function getAPI_URL(): Promise<string | null> {
    try {
        const API_URL = await AsyncStorage.getItem('API_URL');
        return API_URL;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

async function getKey(): Promise<{ "X-Group-Authorization": string }> {
    try {
        let KEY = { 'X-Group-Authorization': '' };
        KEY['X-Group-Authorization'] = await AsyncStorage.getItem('Key');
        return KEY;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

async function getUser(
    user_id: number,
    token: string,
    API_URL: string,
    KEY: { 'X-Group-Authorization': string }
): Promise<User | null> {
    try {
        const res = await axios.get(`${API_URL}/${user_id}`, {
            headers: {
                ...KEY,
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        });

        if (res.status !== 200) {
            return null;
        }

        const data = res.data;
        return data.detail ? null : data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

async function getAllSubordinatesPictures(subordinatesIds, token, API_URL, KEY) {
    const pictures = [];

    for (const userId of subordinatesIds) {
        const picture = await getUserPictureById(userId, token, API_URL, KEY);
        if (picture !== null) {
            pictures.push(picture);
        }
    }
    if (pictures.length === 0) {
        return null;
    }

    return pictures;
}

async function retrieveAsyncData(index: number) {
    const token = await getToken();
    const API_URL = await getAPI_URL();
    const KEY = await getKey();

    let user = await getUser(index, token, API_URL, KEY);
    user.subordinates_picture = await getAllSubordinatesPictures(user.subordinates, token, API_URL, KEY);
    user.picture = await getUserPictureById(index, token, API_URL, KEY);
    return user;
}

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
        fontSize: 15,
        color: theme.colors.White,
        marginLeft: 5,
        marginTop: 40,
    },
    photo: {
        width: 170,
        height: 280,
    },
    linkText: {
        color: 'white',
        textDecorationLine: 'underline',
        fontSize: 20,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        top: -65,
        left: -20,
    },
    job: {
        fontSize: 15,
        color: theme.colors.White,
        marginLeft: 5,
    },
    subordinates: {
        fontSize: 20,
        color: theme.colors.White,
        marginLeft: 5,
        position: 'relative',
        top: -60,
        left: -120,
    },
    surbordinatesPictures: {
        width: 10,
        height: 10,
        flexDirection: 'column',
    },
    button: {
        position: 'absolute',
        top: 90,
        left: 10,
    }
});

function Profile(navigation) {
    let [user, setUsers] = useState<User>([]);
    const index = navigation.route.params.userId;

    useEffect(() => {
        async function fetchData() {
            try {
                const temp = await retrieveAsyncData(index + 1);
                setUsers(temp);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData().then(r => console.log('Users fetched'));
    }, []);

    if (user.subordinates_picture) {
        console.log(user.subordinates_picture);
    }

    return (
        <View style={styles.container}>
            <AppIdentity/>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigation.goBack()}>
                <Text style={styles.linkText}>{ "< go back" } </Text>
            </TouchableOpacity>
            { !user.name ? (
                <>
                    <Image source={require('../assets/Loading.gif')} style={styles.photo} />
                </>
            ) : (
                <View style={styles.profileContainer}>
                    <Image style={styles.photo} source={{ uri: 'data:image/png;base64,' + user.picture }}/>
                    <View>
                        <Text style={styles.job}>{'[' + user.work + ']'}</Text>
                        <Text style={styles.text}>{user.name} {user.surname}</Text>
                        <Text style={styles.text}> {user.gender}</Text>
                        <Text style={styles.text}>{user.birth_date}</Text>
                        <Text style={styles.text}>{user.email}</Text>
                    </View>
                </View>
            )
            }
            <Text style={styles.subordinates}>Subordinates:</Text>
            { !user.subordinates_picture ? (
                <>
                    <View>
                        <Text style={styles.text}>No subordinates</Text>
                    </View>
                </>
            ) : (
                <View style={styles.surbordinatesPictures}>
                    {user.subordinates_picture.map((picture, index) => (
                        <Image style={styles.photo} source={{ uri: 'data:image/png;base64,' + picture }}/>
                    ))}
                </View>
            )}
            <WidgetContainer/>
        </View>
    );
}

export default Profile;
export {getUser, getKey, getAPI_URL, getToken};
