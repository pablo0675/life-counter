import React, {useEffect, useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import theme from '../Theme';
import ColorPicker from "../components/color.picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppIdentity from "../components/AppIdentity";
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {Picker} from "@react-native-picker/picker";
import GoBack from "../components/GoBack";



// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.Background,
        padding: 20,
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        paddingBottom: '20%',
    },
    input: {
        borderWidth: 1,
        borderColor: theme.colors.White,
        padding: 10,
        borderRadius: 5,
        color: theme.colors.White,
        marginBottom: 10,
        backgroundColor: theme.colors.TextZone,
    },
    button: {
        backgroundColor: theme.colors.Button,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    addButton: {
        backgroundColor: theme.colors.Button,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: theme.colors.White,
    },
    playerCard: {
        backgroundColor: theme.colors.Card,
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
        width: '80%',
    },
    removeButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    colorIndicator: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    counterImage: {
        width: 100,
        height: 100,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 12,
        color: theme.colors.White,
    },
    configButton: {},
    pickerTitle: {},
    picker: {
        width: 200,
        height: 44,
        padding: 10,
        marginBottom: 10,
        backgroundColor: 'grey',
        color: theme.colors.White,
    },
});

styles.configButton = {
    ...styles.button,
    marginTop: "30%",
};

styles.pickerTitle = {
    ...styles.title,
    marginTop: "30%",
};

const predefinedColors = [
    { r: 255, g: 0, b: 0 }, // Rouge
    { r: 0, g: 255, b: 0 }, // Vert
    { r: 0, g: 0, b: 255 }, // Bleu
    { r: 255, g: 255, b: 0 }, // Jaune
    { r: 255, g: 0, b: 255 }, // Magenta
    { r: 0, g: 255, b: 255 }, // Cyan
    { r: 255, g: 255, b: 255 }, // Blanc
    { r: 0, g: 0, b: 0 }, // Noir
];



const NewGame = ({ navigation }) => {
    let user_id = "";
    const [players, setPlayers] = useState([]);
    const [availableCounters, setAvailableCounters] = useState([]);
    const [selectedCounters, setSelectedCounters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [configName, setConfigName] = useState('');
    const [configurations, setConfigurations] = useState([
        {
            id: '1',
            name: 'Default',
            players: [
                { id: '1', name: 'Player 1', color: predefinedColors[0] },
                { id: '2', name: 'Player 2', color: predefinedColors[1] },
            ],
            counters: [
            ],
        },
    ]);
    const [selectedConfiguration, setSelectedConfiguration] = useState(null);


    useEffect(() => {
        getCounter()
        getConfiguration()
        setStartConfiguration()
    }, []);

    const setStartConfiguration = () => {
        const config = configurations.find(config => config.id === '1');
        setSelectedConfiguration(config);

        setPlayers(config.players);
        setSelectedCounters(config.counters);
        setConfigName(config.name);
    }

    const getCounter = async () => {
        try {
            user_id = ""
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
            setAvailableCounters(data)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const getConfiguration = async () => {
        try {
            user_id = ""
            let token = ""
            try {
                const res = await AsyncStorage.getItem('user_id')
                token = await AsyncStorage.getItem('token')
                if (res !== null) {
                    user_id = res
                }
            } catch (e) {
                console.log(e)
            }
            const res = await axios.get(
                "https://server-o53dp.ondigitalocean.app/config/get_all_configurations?token=" + token + "&user_id="+user_id,
            )
            if (res.status!==200) {
                console.log("error")
            }
            const data = res.data;
            data.forEach((element) => {
                setConfigurations(prevState =>[...prevState, {
                    id: element.id,
                    name: element.name,
                    players: element.players,
                    counters: element.counters,
                }])
            })
        } catch (error) {
            console.log(error)
        }
    }
    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );


    }
    const selectCounter = (selectedCounter) => {
        setSelectedCounters([...selectedCounters, selectedCounter]);
        const updatedAvailableCounters = availableCounters.filter(counter => counter.counter_name !== selectedCounter.counter_name);
        setAvailableCounters(updatedAvailableCounters);

    };

    const unselectCounter = (counter) => {
        const updatedSelectedCounters = selectedCounters.filter(counter => counter.counter_name !== counter.counter_name);
        setSelectedCounters(updatedSelectedCounters);

        const updatedAvailableCounters = [...availableCounters, counter];
        setAvailableCounters(updatedAvailableCounters);
    };

    const handleLoadConfiguration = (itemValue) => {
        const config = configurations.find(config => config.id === itemValue);
        setSelectedConfiguration(config);
        if (!config) {
            return;
        }

        setPlayers(config.players);
        setSelectedCounters(config.counters);
        setConfigName(config.name);


    };
    const addPlayer = () => {
        setPlayers([...players, { id: Date.now().toString(), name: '', color: predefinedColors[0] }]);

    };
    const removePlayer = (playerId) => {
        setPlayers(players.filter(player => player.id !== playerId));

    };
    const updatePlayerName = (playerId, newName) => {
        const updatedPlayers = players.map(player =>
            player.id === playerId ? { ...player, name: newName } : player
        );
        setPlayers(updatedPlayers);

    };
    const updatePlayerColor = (playerId, newColor) => {
        const updatedPlayers = players.map(player =>
            player.id === playerId ? { ...player, color: newColor } : player
        );
        setPlayers(updatedPlayers);

    };

    const checkConfiguration = () => {
        if (selectedCounters.length < 1) {
            alert('Please select at least 1 counter');
            return false;
        }
        if (players.length < 2) {
            alert('Please add at least 2 players');
            return false;
        }
        if (!configName) {
            alert('Please enter a name for your configuration');
            return false;
        }
        return true;
    }

    const handleSaveConfiguration = async () => {
        if (!configName) {
            alert('Please enter a name for your configuration');
            return;
        }
        if (players.length < 2) {
            alert('Please add at least 2 players');
            return;
        }

        if (selectedCounters.length < 1) {
            alert('Please select at least 1 counter');
            return;
        }

        const configuration_id = uuidv4();
        try {
            const user_token = await AsyncStorage.getItem('token');
            user_id = await AsyncStorage.getItem('user_id');

            const res = await axios.post('https://server-o53dp.ondigitalocean.app/config/create_configuration',
                {
                    configuration: {
                        name: configName,
                        user_id: user_id,
                        players: players,
                        counters: selectedCounters,
                    },
                    token: user_token,
                    configuration_id: configuration_id,
                });
            if (res.status !== 201) {
                console.log(res);
                alert('Error while saving configuration');
                return;
            }
            alert('Configuration saved successfully');
        } catch (error) {
            console.log(error);
            alert('Error while saving configuration');
        }
    }


    return (
        <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>

                <Text style={styles.pickerTitle}>Load Configuration</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={selectedConfiguration ? selectedConfiguration.id : ''}
                    onValueChange={(itemValue, itemIndex) => handleLoadConfiguration(itemValue)}
                >
                    {
                        configurations.map((config, index) => (
                        <Picker.Item key={index} label={config.name} value={config.id} />
                    ))}
                </Picker>
                <Text style={styles.title}>Players</Text>
                {players.map(player => (
                    <View key={player.id} style={styles.playerCard}>
                        <TextInput
                            style={styles.input}
                            placeholder="Player Name"
                            value={player.name}
                            onChangeText={(text) => updatePlayerName(player.id, text)}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={[styles.colorIndicator,
                                { backgroundColor: `rgb(${player.color.r}, ${player.color.g}, ${player.color.b})` }]} />
                            <ColorPicker
                                currentColor={player.color}
                                onColorSelected={(color) => updatePlayerColor(player.id, color)}
                            />
                        </View>
                        <TouchableOpacity style={styles.removeButton} onPress={() => removePlayer(player.id)}>
                            <Text style={styles.buttonText}>Remove Player</Text>
                        </TouchableOpacity>
                    </View>
                ))}
                <TouchableOpacity style={styles.addButton} onPress={addPlayer}>
                    <Text style={styles.buttonText}>Add Player</Text>
                </TouchableOpacity>

                <Text style={styles.title}>Available counters</Text>
                <View style={{ flexDirection: "row"}} >
                    {availableCounters.map(counter => (
                        <TouchableOpacity key={counter.counter_name} style={styles.button} onPress={() => selectCounter(counter)}>
                            <Text style={styles.buttonText}>{counter.counter_name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.title}>Selected counters</Text>
                <View>
                    {selectedCounters.map(counter => (
                        <TouchableOpacity key={counter.counter_name} style={styles.button} onPress={() => unselectCounter(counter)}>
                            <Image key={counter.counter_name} source={{ uri: `data:image/png;base64,${counter.logo}` }} style={styles.counterImage} />
                        </TouchableOpacity>
                    ))}
                </View>


                <TextInput
                    style={styles.input}
                    placeholder="Config name"
                    placeholderTextColor={theme.colors.White}
                    value={configName}
                    onChangeText={setConfigName}
                />

                <TouchableOpacity style={styles.button} onPress={handleSaveConfiguration}>
                    <Text style={styles.buttonText}>Save Configuration</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                            if (checkConfiguration()) {
                                selectedConfiguration.counters = selectedCounters;
                                selectedConfiguration.players = players;
                                navigation.navigate('Game', { configuration: selectedConfiguration });
                            }
                        }
                    }
                >
                    <Text style={styles.buttonText}>start game</Text>
                </TouchableOpacity>


            </ScrollView>
            <GoBack Navigation={navigation} />
        </View>
    );
};

export default NewGame;
