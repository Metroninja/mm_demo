import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getAlbums, setAlbums } from '../actions/album';

@connect(
  state => ({
  }),
  dispatch => bindActionCreators({ getAlbums, setAlbums }, dispatch)
)
export default class Dataflow extends Component {

  static propTypes = {
    getAlbums: PropTypes.func
  };

  constructor(props) {
    super(props);

  }

  async componentDidMount() {
    //check if we already have albums fetched
    const albumsString = await AsyncStorage.getItem('@MediaMonks_Demo:albums');
    //kick off fetch/async storage check
    if(albumsString) {
      try {
        const albums = JSON.parse(albumsString);
        this.props.setAlbums(albums)
      } catch(ex) {
        //malformed JSON
        console.log('json is likely malformed from endpoint, investigate', ex);
        // go ahead and fetch the data from live.
        this.props.getAlbums();
      }
    } else {
      this.props.getAlbums();
    }
  }

  render() {
    return null;
  }
}
