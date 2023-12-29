import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, {useEffect, useState} from 'react';
import {FlatList, View, Text, TouchableOpacity, TextInput, StyleSheet, Image} from "react-native";
import GoBack from "../components/GoBack";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import {Picker} from "@react-native-picker/picker";
import theme from "../Theme";

function UpdateCounter( { navigation } ) {
    const [availableCounters, setAvailableCounters] = useState([]);
    const [selectedCounterId, setSelectedCounterId] = useState(null);


    useEffect(() => {
        getUserCounters()
    }
    , [])

    const getCounter = async () => {
        try {
            let user_id = ""
            try {
                const res = await AsyncStorage.getItem('user_id')
                if (res !== null) {
                    user_id = res
                }
            } catch (e) {
                console.log(e)
            }
            const res = await axios.get(
                "https://server-o53dp.ondigitalocean.app/counter/get_all_counters?user_id="+user_id,
            )

            if (res.status!==200) {
                console.log("error")
            }
            const data = res.data;
            return data;
        } catch (error) {
            console.log(error)
        }
    }

    async function getUserCounters() {
        const data = await getCounter();

        let userCounters = []
        for (let i=0; i<data.length; i++) {
            if (data[i].user_id !== "admin") {
                userCounters.push(data[i])
            }
        }
        setAvailableCounters(data)
        if (data.length > 0) {
            setSelectedCounterId(data[0].counter_id);
        }
    }


    const handleCounterChange = (itemValue) => {
        console.log(itemValue)
        setSelectedCounterId(itemValue);
    };

    const selectedCounter = availableCounters.find(counter => counter.counter_id === selectedCounterId) || {};

    const updateCounterField = (field, value) => {
        setAvailableCounters(availableCounters.map(counter =>
            counter.counter_id === selectedCounterId ? { ...counter, [field]: value } : counter
        ));
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            base64: true,
        });

        if (result.canceled) return;

        const manipResult = await ImageManipulator.manipulateAsync(
            result.assets[0].uri,
            [{ resize: { width: 100, height: 100 } }],
            { compress: 0.7, format: ImageManipulator.SaveFormat.PNG, base64: true }
        );

        updateCounterField('logo', manipResult.base64);
    };

    if (availableCounters.length === 0)
        return (
            <View style={styles.container}>
                <GoBack navigation={navigation} />
                <Text style={styles.infoText}>No counters available</Text>
            </View>
        );

    const saveCounterChanges = async () => {
        const res = await axios.post(
            "https://server-o53dp.ondigitalocean.app/counter/update_counter",
            {
                counter: {
                    counter_id: selectedCounter.counter_id,
                    counter_name: selectedCounter.counter_name,
                    logo: selectedCounter.logo,
                    description: selectedCounter.description,
                    base_value: selectedCounter.base_value,
                    max_value: selectedCounter.max_value,
                    min_value: selectedCounter.min_value,
                },
                counter_id: selectedCounter.counter_id,
            }
        );

        if (res.status !== 201) {
            console.log(res)
        }

        navigation.navigate('Home');
    };

    const deleteCounter = async () => {
        const res = await axios.delete(
            "https://server-o53dp.ondigitalocean.app/counter/delete_counter?counter_id="+selectedCounter.id,
        )

        if (res.status !== 200) {
            console.log("error")
        }

        navigation.navigate('Home');
    }

    return (
        <View style={styles.container}>
            <GoBack navigation={navigation} />
            <Picker
                style={styles.picker}
                selectedValue={selectedCounterId}
                onValueChange={handleCounterChange}>
                {availableCounters.map(counter => (
                    <Picker.Item key={counter.counter_id} label={counter.counter_name} value={counter.counter_id} />
                ))}
            </Picker>
            {selectedCounter && (
                <View>
                    <TouchableOpacity style={styles.button} onPress={pickImage}>
                        <Text style={styles.buttonText}>Select Logo Image</Text>
                    </TouchableOpacity>
                    {selectedCounter.logo ? (
                        <Image
                            source={{ uri: `data:image/png;base64,${selectedCounter.logo}` }}
                            style={styles.image}
                        />
                    ) : (
                        <Text style={styles.infoText}>No logo preview</Text>
                    )}
                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Name:</Text>
                        <TextInput
                            style={styles.buttonText}
                            value={selectedCounter.counter_name}
                            onChangeText={(text) => updateCounterField( 'counter_name', text )}
                            placeholder="Name"
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Description:</Text>
                        <TextInput
                            style={styles.buttonText}
                            value={selectedCounter.description}
                            onChangeText={(text) => updateCounterField( 'description', text )}
                            placeholder="Description"
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Base Value:</Text>
                        <TextInput
                            style={styles.buttonText}
                            value={selectedCounter.base_value}
                            onChangeText={(text) => updateCounterField( 'base_value', text )}
                            placeholder="Base Value"
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Max Value:</Text>
                        <TextInput
                            style={styles.buttonText}
                            value={selectedCounter.max_value}
                            onChangeText={(text) => updateCounterField( 'max_value', text )}
                            placeholder="Max Value"
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Min Value:</Text>
                        <TextInput
                            style={styles.buttonText}
                            value={selectedCounter.min_value}
                            onChangeText={(text) => updateCounterField( 'min_value', text )}
                            placeholder="Min Value"
                        />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={deleteCounter}>
                        <Text style={styles.buttonText}>Delete Counter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={saveCounterChanges}>
                        <Text style={styles.buttonText}>Save Changes</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

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
    fieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        color: theme.colors.White,
    },
    label: {
        fontWeight: 'bold',
        marginRight: 10,
        color: theme.colors.White,
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
        color: theme.colors.White,
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
    picker: {
        width: '60%',
        backgroundColor: theme.colors.White,
    },
});

export default UpdateCounter;