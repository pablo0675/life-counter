/*
 * Pub widget (template)
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PubWidgetProps {
  content: string;
}

function PubWidget({ content }: PubWidgetProps): JSX.Element {
  return (
    <View style={styles.pub}>
      <Text style={styles.pubText}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pub: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  pubText: {
    color: 'white',
    fontSize: 16,
  },
});

export default PubWidget;