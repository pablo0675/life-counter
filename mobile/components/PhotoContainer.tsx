import React, {useContext} from "react";
import {View, Image, StyleSheet, ScrollView, TouchableOpacity,} from "react-native";
import theme from "../Theme";
import PhotoPrevisu from "./PhotoContainer/PhotoPrevisu";
import {StoreContext} from "../utils/StoreProvider";

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 260,
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: theme.colors.White,
        fontSize: 10,
        fontWeight: 'bold',
        display: 'flex',
    },
    photo: {
        position: 'relative',
        width: 230,
        height: 320,
        marginBottom: 10,
    },
    photoLoad: {
        position: 'relative',
        width: 260,
        height: 260,
        marginLeft: 50,
    }
});

function PhotoContainer({ navigation }) {

    const { scrollPosition, selectedTeamMemberName, selectedTeamMemberId, employees } = useContext(StoreContext);

    function handleScroll(event) {
        scrollPosition[1](event.nativeEvent.contentOffset.x);
        selectedTeamMemberName[1](employees[0][Math.round(event.nativeEvent.contentOffset.x / 230)].name + " " + employees[0][Math.round(event.nativeEvent.contentOffset.x / 230)].surname);
        selectedTeamMemberId[1](employees[0][Math.round(event.nativeEvent.contentOffset.x / 230)].id);
    }

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal={true}
                onScroll={handleScroll}
            >
                {employees[0].length === 0 ? (
                    <>
                        <Image source={require('../assets/Loading.gif')} style={styles.photoLoad} />
                    </>
                ) : (
                    employees[0] && employees[0].map((user, index) => (
                        <View>
                            <TouchableOpacity
                                onPress={() => { navigation.navigate('Profile',
                                        {
                                            userId: index,
                                        });
                                }}>
                            <Image
                                key={index}
                                source={{ uri: 'data:image/png;base64,' + user.picture }}
                                style={[styles.photo, selectedTeamMemberName[0] === user.name + " " + user.surname ?
                                    { opacity: 1, zIndex: 120 } :
                                    { opacity: 0.5, zIndex: 100 }]}
                            />
                            </TouchableOpacity>
                        </View>
                    ))
                )}
            </ScrollView>
            <PhotoPrevisu users={employees[0]} />
        </View>
    );
}

export default PhotoContainer;