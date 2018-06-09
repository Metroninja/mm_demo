import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import globalStyle from '../../styles';

export default details = ({title, text}) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.text}>{text}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center'
  },
  title: globalStyle.title,
  text: globalStyle.text,
});