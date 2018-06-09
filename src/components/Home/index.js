import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, Image, StyleSheet,
  Text, TouchableOpacity, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import globalStyle from '../../styles';


@connect(
  state => ({
    albums: state.album.albums,
  }),
  dispatch => bindActionCreators({ }, dispatch)
)
export default class Home extends Component {

  static propTypes = {
    albums: PropTypes.array,
  };

  static navigationOptions = {
    title: 'Media Monks Demo'
  }
  constructor(props) {
    super(props);

    this.state = {
    }
  }
  renderLoading() {
    return (
      <View style={[styles.row, styles.loading]}>
        <Text>Loading Albums</Text>
        <ActivityIndicator />
      </View>
    )
  }

  render() {
    const { albums } = this.props;
    console.log('albums', albums)
    return (
      <View>
        {albums.length === 0 && this.renderLoading()}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  row: {
    ...globalStyle.row,
    justifyContent: 'center'
  },
  loading: {
    marginTop: 12
  }
});
