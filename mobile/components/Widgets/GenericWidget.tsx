/*
 * Generic widget (template)
 */

import React from "react";
import { Text, View } from "react-native";

import { styles } from "./GenericWidget.style";

function GenericWidget(): JSX.Element {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Widget</Text>
        </View>
    );
}

export default GenericWidget;
