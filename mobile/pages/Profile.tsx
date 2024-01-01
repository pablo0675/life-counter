import { View, TextInput, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, {useEffect, useState} from "react";
import theme from "../Theme";

import AppIdentity from "../components/AppIdentity";
import GoBack from "../components/GoBack";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import axios from "axios";


const AsyncStorage = require('@react-native-async-storage/async-storage').default;

interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    picture: string;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.Background,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    textInput: {
        backgroundColor: theme.colors.TextZone,
        color: theme.colors.White,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: '100%',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    description: {
        fontSize: 14,
        color: 'gray',
        marginLeft: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 12,
        color: theme.colors.White,
    },
    card: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.Background
    },
    button: {
        backgroundColor: theme.colors.Button,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: theme.colors.White,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 8,
        borderRadius: 4,
        marginBottom: 16,
        color: theme.colors.White,
    },
    avatar: {
        height: 60,
        width: 60,
        borderRadius: 24,
    }
});

function Profile(navigation) {
    const [userInfo, setUserInfo] = useState({username: '', email: '', password: '', picture: '52', uid: ''});
    const [defined, setDefined] = useState(false);

    useEffect(() => {
        getUserInfo();
    }, []);
    const handleSave = async () => {
        try {
            const user_id = await AsyncStorage.getItem('user_id');
            const res = await axios.post('https://server-o53dp.ondigitalocean.app/user/updateUser',
                {
                    user: {
                        uid: userInfo.uid,
                        username: userInfo.username,
                        email: userInfo.email,
                        password: userInfo.password,
                        picture: userInfo.picture,
                    }
                })
            if (res.status === 201)
                navigation.navigation.navigate('Home');
        } catch (e) {
            console.log(e);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            base64: true,
        });


        if (result.canceled)
            return;

        const manipResult = await ImageManipulator.manipulateAsync(
            result.assets[0].uri,
            [{ resize: { width: 100, height: 100 } }],
            { compress: 0.7, format: ImageManipulator.SaveFormat.PNG, base64: true }
        );

        setUserInfo({ ...userInfo, picture: manipResult.base64 });
    };

    const updateUserInfo = (field, value) => {
        setUserInfo({ ...userInfo, [field]: value });
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

    const getUserInfo = async () => {
        const user = await getUser();
        if (user) {
            setUserInfo(user);
            setDefined(true);
        }
    }
    if (!defined || !userInfo)
        return (<View></View>)

    return (
        <View style={styles.container}>
            <GoBack Navigation={navigation} />
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <TouchableOpacity onPress={pickImage}>
                        <Image
                            style={styles.avatar}
                            source={{ uri: ( userInfo && userInfo.picture) ? `data:image/jpeg;base64,${userInfo.picture}` : 'https://png.pngtree.com/png-clipart/20210613/original/pngtree-gray-silhouette-avatar-png-image_6404679.jpg' }}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.title}>{userInfo.username}</Text>
                        <Text style={styles.title}>{userInfo.email}</Text>
                    </View>
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={theme.colors.White}
                        onChangeText={(text) => updateUserInfo('username', text)}
                        placeholder="change username"
                    />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={theme.colors.White}
                        placeholder="change email"
                        onChangeText={(text) => updateUserInfo('email', text)}
                        keyboardType="email-address"
                    />

                    <TextInput
                        style={styles.input}
                        placeholderTextColor={theme.colors.White}
                        placeholder="change password"
                        onChangeText={(text) => updateUserInfo('password', text)}
                        secureTextEntry={true}
                    />

                </View>
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


export default Profile;
