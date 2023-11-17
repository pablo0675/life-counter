import React from "react";
import {StyleSheet, View} from "react-native";

const DefaultOption = (selected: boolean) => {
    return (
        <View style={selected ? styles.selectedContainer : styles.container}>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#FFF',
        height: 30,
        width: 20,
    },
    selectedContainer: {
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#FFF',
        height: 30,
        width: 20,
    }
});

export default DefaultOption;