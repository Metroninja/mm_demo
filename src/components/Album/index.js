import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet,
  Text, TouchableOpacity, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import globalStyle from '../../styles';

@connect(
  state => ({
  }),
  dispatch => bindActionCreators({ }, dispatch)
)
export default class Album extends Component {

  static propTypes = {
  };

  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <View>
      </View>
    )
  }
}
const styles = StyleSheet.create({

});
