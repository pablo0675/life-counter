import React, { useState } from 'react';
import {View, TextInput, Button, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

import Counter from '../entities/counter.entity';
import theme from "../Theme";
import AppIdentity from "../components/AppIdentity";
import GoBack from "../components/GoBack";

const CreateCounter = (navigation) => {
    const [counter, setCounter] = useState<Counter>({
        counter_name: "",
        logo: '',
        description: '',
        baseValue: 0,
        maxValue: 0,
        minValue: 0
    });

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

        setCounter({ ...counter, logo: manipResult.base64 });
    };

    const handleSubmit = async () => {
        let isAdmin = false;
        try {
            if (
                counter.counter_name === '' ||
                counter.description === '' ||
                counter.baseValue === 0 ||
                counter.logo === ''
            ) {
                alert('Error: empty field');
                return;
            }
            let user_id = '';
            try {
                user_id = await AsyncStorage.getItem('user_id');
            } catch (error) {
                console.error(error);
                alert('Error getting user_id');
            }
            try {
                const response = await axios.get(`https://server-o53dp.ondigitalocean.app/user/isUserAdmin?uid=${user_id}`);
                isAdmin = response.data;
            } catch (error) {
                console.error(error.response.data.message);
            }
            if (isAdmin)
                user_id = "admin";
            const response = await axios.post('https://server-o53dp.ondigitalocean.app/counter/create_counter',
                {
                    counter: {
                        counter_name: counter.counter_name,
                        description: counter.description,
                        baseValue: counter.baseValue,
                        maxValue: counter.maxValue,
                        minValue: counter.minValue,
                        logo: counter.logo,
                    },
                    user_id: user_id,
                });
            alert('Counter created successfully!');
        } catch (error) {
            console.error(error);
            alert('Error creating counter');
        }
    };

    return (
        <View style={styles.container}>
            <GoBack Navigation={navigation} />
            <AppIdentity />
            <TextInput
                style={styles.textInput}
                placeholder="Name"
                placeholderTextColor={theme.colors.White}
                onChangeText={text => setCounter({ ...counter, name: text })}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Description"
                placeholderTextColor={theme.colors.White}
                onChangeText={text => setCounter({ ...counter, description: text })}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Base Value"
                placeholderTextColor={theme.colors.White}
                keyboardType="numeric"
                onChangeText={text => setCounter({ ...counter, baseValue: Number(text) })}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Max Value if any"
                placeholderTextColor={theme.colors.White}
                keyboardType="numeric"
                onChangeText={text => setCounter({ ...counter, maxValue: Number(text) })}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Min Value if any"
                placeholderTextColor={theme.colors.White}
                keyboardType="numeric"
                onChangeText={text => setCounter({ ...counter, minValue: Number(text) })}
            />
            <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text style={styles.buttonText}>Select Logo Image</Text>
            </TouchableOpacity>
            {counter.logo ? (
                <Image
                    source={{ uri: `data:image/png;base64,${counter.logo}` }}
                    style={styles.image}
                />
            ) : (
                <Text style={styles.infoText}>No logo preview</Text>
            )}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Create Counter</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.Background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: theme.colors.Card,
        padding: 20,
        borderRadius: 10,
    },
    textInput: {
        backgroundColor: theme.colors.TextZone,
        color: theme.colors.White,
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
        width: '80%',
    },
    button: {
        backgroundColor: theme.colors.Button,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: theme.colors.White,
    },
    infoText: {
        color: theme.colors.InfoLayer,
    },
    whiteText: {
        color: theme.colors.White,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        borderColor: theme.colors.SndFrontLayer,
        borderWidth: 2,
    },
});

export default CreateCounter;