import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet,
  Text, TouchableOpacity, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import globalStyle from '../../styles';

@connect(
  state => ({
    album: state.album.album,
    photos: state.album.photos 
  }),
  dispatch => bindActionCreators({ }, dispatch)
)
export default class Album extends Component {

  static propTypes = {
    album: PropTypes.object,
    navigation: PropTypes.object,
    photos: PropTypes.array,
  };

  static navigationOptions = {
    title: 'Album Details'
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { album, photos } = this.props;
    return (
      <View>
      </View>
    )
  }
}
const styles = StyleSheet.create({

});
