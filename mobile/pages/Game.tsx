import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import theme from "../Theme";
import {useNavigation} from "@react-navigation/native";
import GoBack from "../components/GoBack";
//import {CustomTextInput} from "react-native-custom-keyboard-kit";

class Counter {
    id: string;
    name: string;
    logo: string;
    value: number;
    minValue: number | null;
    maxValue: number | null;

    constructor(id: string, name: string, logo: string, baseValue: number, minValue: number, maxValue: number) {
        this.id = id;
        this.name = name;
        this.logo = logo;
        this.value = baseValue;
        if (minValue === 0 && maxValue === 0 || minValue > baseValue || maxValue < baseValue) {
            this.minValue = null;
            this.maxValue = null;
        } else {
            this.minValue = minValue;
            this.maxValue = maxValue;
        }
    }

    addValue(value: number) {
        if (this.maxValue === null || this.value + value <= this.maxValue) {
            this.value += value;
        }
    }
    multiplyValue(value: number) {
        if (this.maxValue === null || this.value * value <= this.maxValue) {
            this.value *= value;
        }
    }

    divideValue(value: number) {
        if (this.minValue === null || this.value / value >= this.minValue) {
            this.value /= value;
        }
    }

    resetValue() {
        this.value = 0;
    }

    setValue(value: number) {
        if (this.minValue === null || this.maxValue === null || (value >= this.minValue && value <= this.maxValue)) {
            this.value = value;
        }

    }
}

class color {
    r: number;
    g: number;
    b: number;
    hex: string;

    constructor(r: number, g: number, b: number) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.hex = this.rgbToHex(r, g, b);
    }

    rgbToHex(r: number, g: number, b: number) {
        return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    }

    componentToHex(c: number) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

}
class Player {
    id: number;
    name: string;
    counters: Counter[];
    color: color;

    constructor(id: number, name: string, counters: Counter[], rgb: {r: number, g: number, b: number}) {
        this.id = id;
        this.name = name;
        this.counters = counters;
        this.color = new color(rgb.r, rgb.g, rgb.b);
    }

    addCounter(counter: Counter) {
        this.counters.push(counter);
    }

    removeCounter(counter: Counter) {
        this.counters.splice(this.counters.indexOf(counter), 1);
    }

    addValue(counter_id: string, value: number) {
        this.counters.find(counter => counter.id === counter_id)?.addValue(value);
    }

    multiplyValue(counter_id: string, value: number) {
        this.counters.find(counter => counter.id === counter_id)?.multiplyValue(value);
    }
    divideValue(counter_id: string, value: number) {
        this.counters.find(counter => counter.id === counter_id)?.divideValue(value);
    }

    resetValue(counter_id: string) {
        this.counters.find(counter => counter.id === counter_id)?.resetValue();
    }

    setValue(counter_id: string, value: number) {
        this.counters.find(counter => counter.id === counter_id)?.setValue(value);
    }
}

function Game({ route }) {
    const navigation = useNavigation();
    const configuration = route.params?.configuration;
    const [selectedCounter, setSelectedCounter] = useState(null);
    const [players, setPlayers] = useState([]);
    const {width, height} = Dimensions.get('window');
    const [inputValue, setInputValue] = useState('');

    console.log(configuration.players.length);

    useEffect(() => {
        if (configuration?.players && configuration?.counters) {
            const initializedPlayers = configuration.players.map(playerConfig => {
                const playerCounters = configuration.counters.map(counterConfig => {
                    return new Counter(
                        counterConfig.id,
                        counterConfig.name,
                        counterConfig.logo,
                        counterConfig.baseValue,
                        counterConfig.minValue,
                        counterConfig.maxValue
                    );
                });

                return new Player(playerConfig.id, playerConfig.name, playerCounters, {r: playerConfig.color.r, g: playerConfig.color.g, b: playerConfig.color.b});
            });

            setPlayers(initializedPlayers);
        }
    }, [configuration]);


    if (players.length === 0)
        return (
            <View >
                <Text>Loading</Text>
            </View>
        );

    const handleCounterPress = (counter) => {
        setSelectedCounter(counter);
        setInputValue(counter.value.toString());
    };

    const handleInputChange = (text) => {
        setInputValue(text);
    };


    function parseInput(input) {
        const regex = /^([-+*/])?\s*(-?\d+)$/;
        const match = input.match(regex);

        if (match) {
            const operator = match[1] || null; // Récupère l'opérateur s'il est présent, sinon `null`
            const number = parseInt(match[2], 10);
            return { isValid: true, operator, number };
        } else {
            return { isValid: false, operator: null, number: null };
        }
    }

    const handleSubmitEditing = () => {
        const { isValid, operator, number: value } = parseInput(inputValue);
        console.log("operator", operator);
        console.log("value", value);
        if (!isValid) {
            setInputValue('');
            setSelectedCounter(null);
            return;
        }

        if (operator) {
            switch (operator) {
                case '+':
                    selectedCounter.addValue(value);
                    break;
                case '-':
                    selectedCounter.addValue(-value);
                    break;
                case '*':
                    selectedCounter.multiplyValue(value);
                    break;
                case '/':
                    selectedCounter.divideValue(value);
                    break;
            }
        } else {
            selectedCounter.setValue(value);
        }
        setInputValue('');
        setSelectedCounter(null);
    };
    const renderCounter = (counter, index) => {
        return (
            <View key={index} style={styles.counterContainer}>
                <Image source={{uri: `data:image/png;base64,${counter.logo}`}} style={{width: 50, height: 50}}/>
                {selectedCounter === counter ? (
                    <TextInput
                        style={styles.counterInput}
                        value={inputValue}
                        onChangeText={handleInputChange}
                        onSubmitEditing={handleSubmitEditing}
                        autoFocus={true}
                        onBlur={handleSubmitEditing}
                    />
                ) : (
                    <TouchableOpacity onPress={() => handleCounterPress(counter)}>
                        <Text style={styles.counterValue}>{counter.value}</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    }

    const renderPlayerSection = (player) => {
        return (
            <View key={player.id} style={[
                styles.playerSection,
                {
                    width: width,
                    height: height / players.length,
                    backgroundColor: player.color.hex,
                }
            ]}>
                <Text style={styles.playerName}>{player.name}</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.counterScroll}>
                    {player.counters.map((counter, index) => (
                        renderCounter(counter, index)
                    ))}
                </ScrollView>
            </View>
        );
    };

    return (
        <View style={styles.gameContainer}>
            <GoBack Navigation={navigation} />
            {players.map(renderPlayerSection)}
        </View>
    );
}

const styles = StyleSheet.create({
    gameContainer: {
        backgroundColor: theme.colors.Background,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    playerSection: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    counterScroll: {
        flexGrow: 1,
    },
    counterContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    counterName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.White,
    },
    counterValue: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: theme.colors.White,
    },
    button: {
        padding: 10,
        margin: 5,
        backgroundColor: theme.colors.Button,
        borderRadius: 5,
    },
    buttonText: {
        color: theme.colors.White,
        fontSize: 18,
        fontWeight: 'bold',
    },
    playerName: {
        marginTop: 10,
        fontSize: 30,
        fontWeight: 'bold',
        color: theme.colors.White,
    },
    counterInput: {
    }
});

export default Game;