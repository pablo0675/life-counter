import React, {useContext} from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import theme from "../../Theme";
import {StoreContext} from "../../utils/StoreProvider";

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: 360,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: -90,
    },
    text: {
        color: theme.colors.White,
        fontSize: 40,
    },
    photo: {
        width: 25,
        height: 50,
        margin: 5,
    },
    lineSelected: {
        width: 20,
        height: 5,
        backgroundColor: theme.colors.White,
        borderRadius: 5,
        margin: 5,
    },
    line: {
        width: 15,
        height: 2,
        backgroundColor: theme.colors.White,
        borderRadius: 5,
        margin: 5,
    }
});

function PhotoPrevisu({ users }) {

    const { scrollPosition, selectedTeamMemberName, selectedTeamMemberId } = useContext(StoreContext);

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal={true}
                scrollToOverflowEnabled={true}
                ref={(ref) => { this.myScroll = ref; ref?.scrollTo({ x: ((scrollPosition[0] - 150) / 6.5) - 150, animated: true }) }}
            >
                {users.map((user, index) => (
                    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <View style={selectedTeamMemberName[0] === user.name + " " + user.surname ? styles.lineSelected : styles.line}></View>
                        <TouchableOpacity onPress={() => { scrollPosition[1](user.id * 230 - 250);
                            selectedTeamMemberName[1](user.name + " " + user.surname);
                            selectedTeamMemberId[1](user.id);
                        }}>
                            <Image
                                key={index}
                                source={{ uri: 'data:image/png;base64,' + user.picture }}
                                style={[styles.photo, selectedTeamMemberName[0] === user.name + " " + user.surname ? { opacity: 1 } : { opacity: Math.abs(selectedTeamMemberId[0] - user.id) === 0 ? 1 : 1/(Math.abs(selectedTeamMemberId[0] - user.id) + 1) }]}
                            />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

export default PhotoPrevisu;