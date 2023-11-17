import React, {useContext} from "react";
import DefaultOption from "./DefaultOption";
import FolderOption from "./FolderOption";
import {StyleSheet, Text, View} from "react-native";
import theme from "../../Theme";
import {StoreContext} from "../../utils/StoreProvider";

const DisplayOptions = () => {

    const { selectedTeamMemberName } = useContext(StoreContext);

    return (
        <View style={styles.container}>
            <DefaultOption />
            <FolderOption />
            <Text style={[styles.textNom, { fontSize: 30 - (selectedTeamMemberName[0].length - 16 < 0 ? 0 : (selectedTeamMemberName[0].length - 16)) * 2 }]}>
                {selectedTeamMemberName[0]}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 110,
        left: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 60,
    },
    textNom: {
        position: 'absolute',
        bottom: -5,
        left: 70,
        color: theme.colors.White,
    }
});

export default DisplayOptions;