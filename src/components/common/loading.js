import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, StyleSheet,
  Text, View } from 'react-native';

import globalStyle from '../../styles';

export default loading = ({text}) => (
  <View style={[styles.row, styles.loading]}>
    <Text style={styles.title}>Loading {text}</Text>
    <ActivityIndicator />
  </View>
)

const styles = StyleSheet.create({
  row: {
    ...globalStyle.row,
    justifyContent: 'center'
  },
  title: globalStyle.title,
  loading: {
    marginTop: 12
  },
});