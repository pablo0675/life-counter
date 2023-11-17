import React from "react";
import {StyleSheet, View} from "react-native";

const FolderOption = (selected: boolean) => {
    return (
        <View style={selected ? styles.selectedContainer : styles.container}>
            <View style={styles.line}>
                <View style={selected ? styles.selectedSection : styles.section}/>
                <View style={selected ? styles.selectedSection : styles.section}/>
            </View>
            <View style={styles.line}>
                <View style={selected ? styles.selectedSection : styles.section}/>
                <View style={selected ? styles.selectedSection : styles.section}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderStyle: 'solid',
        borderWidth: 0.5,
        borderColor: '#FFF',
        height: 30,
        width: 20,
    },
    selectedContainer: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#FFF',
        height: 30,
        width: 20,
    },
    line: {
        display: 'flex',
        flexDirection: 'row',
    },
    section: {
        borderStyle: 'solid',
        borderWidth: 0.5,
        borderColor: '#FFF',
        height: 21,
        width: 16,
    },
    selectedSection: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#FFF',
        height: 14,
        width: 9,
    }
});

export default FolderOption;