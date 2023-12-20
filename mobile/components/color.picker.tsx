import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const colors = [
    { r: 255, g: 0, b: 0 }, // Rouge
    { r: 0, g: 255, b: 0 }, // Vert
    { r: 0, g: 0, b: 255 }, // Bleu
    { r: 255, g: 255, b: 0 }, // Jaune
    { r: 255, g: 0, b: 255 }, // Magenta
    { r: 0, g: 255, b: 255 }, // Cyan
    { r: 255, g: 255, b: 255 }, // Blanc
    { r: 0, g: 0, b: 0 }, // Noir
];

const ColorPicker = ({ onColorSelected }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },

        colorOption: {
            width: 50,
            height: 50,
            borderRadius: 25,
            margin: 10,
        },
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(10, 10, 10, 0.5)',
        },
        modalContent: {
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
        },
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={{ ...styles.colorOption, backgroundColor: 'grey' }} />
            </TouchableOpacity>
            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {colors.map((color, index) => (
                            <TouchableOpacity
                                key={index}
                                style={{ ...styles.colorOption, backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})` }}
                                onPress={() => {
                                    onColorSelected(color);
                                    setModalVisible(false);
                                }}
                            />
                        ))}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ColorPicker;
