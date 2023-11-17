/*
 * Alert widget (template)
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface AlertProps {
  message: string;
}

function Alert({ message }: AlertProps): JSX.Element {
  return (
    <View style={styles.alert}>
      <Icon name="alert-triangle" size={64} color="white" style={styles.icon} />
      <Text style={styles.alertText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  alert: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  alertText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    marginBottom: 10,
  },
});

export default Alert;