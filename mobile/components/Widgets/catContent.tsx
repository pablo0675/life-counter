import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity, View, StyleSheet} from 'react-native';
import axios from "axios";
import theme  from "../../Theme";


const CAT_API = "https://api.thecatapi.com/v1/images/search"

function CatContent() {
    const [cat, setCat] = useState<string>(null);

    useEffect(() => {
        refresh();
    }, []);

    async function getCat() : Promise<string> {
        try {
            const response = await axios.get(CAT_API);
            return response.data[0].url;
        } catch (error) {
            console.error(error);
        }
    }

    async function refresh() {
        try {
            const newCat = await getCat();
            setCat(newCat);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>
            { !cat ? (
                <>
                    <Image style={{width: 10, height: 10}} source={require('../../assets/Loading.gif')}/>
                </>
            ) : (
                <View style={styles.imageContainer}>
                    <TouchableOpacity
                        style={[styles.container]}
                        onPress={() => {
                            refresh();
                        }}
                    >
                        <Image
                            style={styles.image}
                            source={ {uri: cat}}
                        />
                    </TouchableOpacity>
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
});

export default CatContent;
