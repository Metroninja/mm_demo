import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { selectAlbum } from '../../actions/album';
import { Loading } from '../common/index';
import globalStyle from '../../styles';


@connect(
  state => ({
    albums: state.album.albums,
  }),
  dispatch => bindActionCreators({ selectAlbum }, dispatch)
)
export default class Home extends Component {

  static propTypes = {
    albums: PropTypes.array,
    navigation: PropTypes.object,
    selectAlbum: PropTypes.func,
  };

  static navigationOptions = {
    title: 'Media Monks Demo'
  }

  constructor(props) {
    super(props);

    this.state = {
    }
  }

  renderHeader(albumsLoaded) {
    return albumsLoaded ? ( 
      <Text style={[styles.title, styles.header]}>User Albums</Text>
      ) : (
        <Loading text="Albums" />
    )
  }
    
  viewAlbum(id) {
    this.props.selectAlbum(id);
    this.props.navigation.navigate('Album');
  }

  renderAlbum(album) {
    const notLast = album.index < this.props.albums.length - 1;
    return (
      <TouchableOpacity 
        onPress={() => this.viewAlbum(album.item.id)} 
        style={[styles.album, notLast && styles.seperator]}>
        <Text style={styles.title}>{`User ${album.item.userId} Album ${album.item.id}`}</Text>
        <Text style={styles.text}>{album.item.title}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { albums } = this.props;
    return (
      <KeyboardAwareScrollView style={styles.container}>
        {this.renderHeader(!!albums.length)}
        {!!albums.length && (
          <FlatList
          data={albums}
          renderItem={album => this.renderAlbum(album)}
          keyExtractor={(album, index) => `album-id-${album.id}`}
        />
        )}
      </KeyboardAwareScrollView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: globalStyle.title,
  text: globalStyle.text,
  header: {
    marginTop: 12,
    textAlign: 'center'
  },
  album: {
    padding: 12,
  },
  seperator: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: globalStyle.lightGray
  }
});
