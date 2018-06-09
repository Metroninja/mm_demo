import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getAlbums, getAlbum, getPhoto, setAlbums, setAlbum, setPhoto } from '../actions/album';

@connect(
  state => ({
    albumId: state.album.albumId,
    photoId: state.album.photoId,
  }),
  dispatch => bindActionCreators({ getAlbums, getAlbum, getPhoto, setAlbums, setAlbum, setPhoto }, dispatch)
)
export default class Dataflow extends Component {

  static propTypes = {
    albumId: PropTypes.string,
    getAlbums: PropTypes.func,
    getAlbum: PropTypes.func,
    getPhoto: PropTypes.func,
    photoId: PropTypes.string,
    setAlbums: PropTypes.func,
    setAlbum: PropTypes.func,
    setPhoto: PropTypes.func,
  };

  constructor(props) {
    super(props);

  }

  async componentDidMount() {
    //check if we already have albums fetched
    try {
      const albumsString = await AsyncStorage.getItem('@MediaMonks_Demo:albums');
    //kick off fetch/async storage check
      if(albumsString) {
        const albums = JSON.parse(albumsString);
        this.props.setAlbums(albums)
      } else {
        throw new Exception('empty albums, fetch albums')
      }
    } catch(ex) {
      this.props.getAlbums();
    }
  }
  
  async componentDidUpdate(prevProps, prevState) {
    const { albumId, photoId } = this.props;
    if(!!albumId && albumId !== prevProps.albumId) {
      //album was selected, lets see if we should fetch or set.
      try {
        const albumString = await AsyncStorage.getItem(`@MediaMonks_Demo:album_${albumId}`);
        if(albumString) {
          const album = JSON.parse(albumString);
          this.props.setAlbum(album)
        } else {
          throw new Exception('empty album, fetch album')
        }
      } catch(ex) {
        this.props.getAlbum(albumId);
      }
    }
    if(!!photoId) {
      try { 
        const photoString = await AsyncStorage.getItem(`@MediaMonks_Demo:photo_${photoId}`);
        if(photoString) {
          const photo = JSON.parse(photoString);
          this.props.setPhoto(photo);
        } else {
          throw new Exception('empty photo, fetch album')
        }
      } catch(ex) {
        this.props.getPhoto(photoId);
      }
    }
  }

  render() {
    return null;
  }
}
