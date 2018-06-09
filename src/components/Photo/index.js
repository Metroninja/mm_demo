import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet,
  Text, TouchableOpacity, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { selectPhoto } from '../../actions/album';
import { Details, Loading } from '../common';
import globalStyle from '../../styles';

@connect(
  state => ({
    photo: state.album.photo,
    photoId: state.album.photoId,
  }),
  dispatch => bindActionCreators({ selectPhoto }, dispatch)
)
export default class Photo extends Component {

  static propTypes = {
    photo: PropTypes.object,
    photoId: PropTypes.string,
    selectPhoto: PropTypes.func, 
  };

  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    const { photo, photoId } = this.props;
    return (
      <View style={styles.container}>
        {isEmpty(photo) || photoId !== photo.id ? (<Loading text="photo" />) : (
          <View style={styles.container}>
            <Details title={`photo id ${photo.id}`} text={photo.title} />
            <Image style={styles.image} source={{uri: photo.url.replace('http', 'https')}} />
          </View>
        )}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    justifyContent: 'flex-start'
  },
  photo: {
    alignSelf: 'stretch',
    marginTop: 8,
    marginBottom: 12,
    backgroundColor: globalStyle.lightGray,
    ...globalStyle.shadow
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  }  
});
