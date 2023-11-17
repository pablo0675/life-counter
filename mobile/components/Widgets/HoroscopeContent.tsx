import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import axios from "axios";
import theme from "../../Theme";
import {getAllUsers} from "../../pages/Home";
import {getAPI_URL, getKey, getToken} from "../../pages/Profile";

const AsyncStorage = require('@react-native-async-storage/async-storage').default;


const HOROSCOPE_API = "https://kayoo123.github.io/astroo-api/jour.json"

interface User {
    id: number;
    name: string;
    email: string;
    surname: string;
    work: string;
    gender: string;
    birth_date: string;
    subordinates: number[];
    picture: string;
}

async function getEmail(): Promise<string | null> {
    try {
        return await AsyncStorage.getItem('email');
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

async function getUsers(): Promise<[User] | null> {
    const token = await getToken();
    const API_URL = await getAPI_URL();
    const KEY = await getKey();

    return await getAllUsers(token, API_URL, KEY);
}

async function getIdWithMail(): Promise<number | null> {
    const users = await getUsers();
    const email = await getEmail();

    // find user id with email
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            return users[i].id;
        }
    }
    return null;
}

async function getBirthDate(): Promise<string | null> {
    const id = await getIdWithMail();
    const token = await getToken();
    const API_URL = await getAPI_URL();
    const KEY = await getKey();

    try {
        const res = await axios.get(`${API_URL}/${id}`, {
            headers: {
                ...KEY,
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        });

        if (res.status !== 200) {
            return null;
        }

        const data = res.data;
        return data.detail ? null : data.birth_date;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

async function getSign(): Promise<string | null> {
    try {
        const birthDateStr = await getBirthDate();
        if (!birthDateStr) return null;

        const birthDate = new Date(birthDateStr);
        const month = birthDate.getUTCMonth() + 1; // Les mois sont indexés à partir de 0
        const day = birthDate.getUTCDate();

        if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
            return "verseau";
        }
        if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
            return "poissons";
        }
        if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
            return "belier";
        }
        if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
            return "taureau";
        }
        if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
            return "gemeaux";
        }
        if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
            return "cancer";
        }
        if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
            return "lion";
        }
        if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
            return "vierge";
        }
        if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
            return "balance";
        }
        if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
            return "scorpion";
        }
        if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
            return "sagittaire";
        }
        if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
            return "capricorne";
        }
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}
function HoroscopeContent() {
    const [horoscope, setHoroscope] = useState<[string, string]>([null, null]);


    useEffect(() => {
        async function getHoroscope(): Promise<[string, string]> {
            try {
                const sign = await getSign();
                const response = await axios.get(HOROSCOPE_API);
                const horoscope = response.data[sign];
                console.log(horoscope);
                return [horoscope, sign];
            } catch (error) {
                console.error(error);
            }

        }
        getHoroscope().then((horoscope) => setHoroscope(horoscope));
    }, []);


    return (
        <View style={styles.container}>
            { !horoscope ? (
                <>
                    <Image style={{width: 50, height: 50}} source={require('../../assets/Loading.gif')}/>
                </>
            ) : (
                <View style={styles.imageContainer}>
                    <Text style={styles.sign}> {horoscope[1]} </Text>
                    <Text style={styles.text}> {horoscope[0]} </Text>
                </View>
            )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.DarkLayer,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 350,
        height: 400,
    },
    sign: {
        fontSize: 30,
        fontWeight: 'bold',
        color: theme.colors.White,
        marginBottom: 30,
    },
    text: {
        fontSize: 17,
        color: theme.colors.White,
    }
});

export default HoroscopeContent;
