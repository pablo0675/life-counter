import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import theme from "../Theme";

import AppIdentity from "../components/AppIdentity";


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


    return (
        <View style={styles.container}>
            <AppIdentity/>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigation.goBack()}>
                <Text style={styles.linkText}>{ "< go back" } </Text>
            </TouchableOpacity>
        </View>
    );
}

export default Profile;
