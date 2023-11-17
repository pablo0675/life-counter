/*
 * Agenda widget (template)
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CalendarWidgetProps {
  date?: string;
}

function CalendarWidget({ date }: CalendarWidgetProps): JSX.Element {
  const currentDate = date ? new Date(date) : new Date();
  const formattedDate = currentDate.toLocaleDateString();

  return (
    <View style={styles.calendar}>
      <Text style={styles.date}>{formattedDate}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  calendar: {
    backgroundColor: '#f39c12',
    padding: 10,
    borderRadius: 5,
  },
  date: {
    color: 'white',
    fontSize: 16,
  },
});

export default CalendarWidget;
