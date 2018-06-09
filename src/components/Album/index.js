import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, ScrollView, StyleSheet,
  Text, TouchableOpacity, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Details, Loading, Photos } from '../common';
import globalStyle from '../../styles';

/***
* Instead of passing in the album through redux I could have simply passed it in through the
* react navigation parameters.  In this particular case since the data of an individual album
* has no additional details from the group, I could have also just done a .filter on the set
* to get the album details
***/
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
    console.log('album', album, photos);
    return (
      <ScrollView style={styles.container}>
        {photos.length === 0 && <Loading text="Album" />}
        {!!photos.length && (
          <View>
            <Details title={`Album id ${album.id}`} text={album.title} />
            <Photos photos={photos} />
          </View>
        )}
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
