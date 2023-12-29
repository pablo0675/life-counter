import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import theme from '../Theme';

const GoBack = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={styles.text}>go back</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.colors.Button,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    text: {
        color: theme.colors.White,
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    container: {
        position: 'absolute',
        top: 30,
        left: 10,
    }
});

export default GoBack;