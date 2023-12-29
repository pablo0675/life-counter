import { View, TextInput, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, {useEffect, useState} from "react";
import theme from "../Theme";

import AppIdentity from "../components/AppIdentity";
import GoBack from "../components/GoBack";


const AsyncStorage = require('@react-native-async-storage/async-storage').default;

interface User {
    id: string;
    name: string;
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
    },
    avatar: {
        height: 48,
        width: 48,
        borderRadius: 24,
    }
});

function Profile(navigation) {
    const [userInfo, setUserInfo] = useState({name: '', email: '', password: ''});

    const handleSave = () => {
        console.log('Informations enregistrées:', userInfo);
    };

    return (
        <View style={styles.container}>
            <GoBack Navigation={navigation} />
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Image
                        style={styles.avatar}
                        source={{uri: '/placeholder-avatar.jpg'}}
                    />
                    <View>
                        <Text style={styles.title}>Your Name</Text>
                        <Text style={styles.description}>your.email@example.com</Text>
                    </View>
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your name"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        keyboardType="email-address"
                    />
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Upload</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


export default Profile;
