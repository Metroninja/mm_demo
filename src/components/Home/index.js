import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, FlatList, StyleSheet,
  Text, TouchableOpacity, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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

  renderHeader(albumsLoaded) {
    
    return albumsLoaded ? ( 
      <Text style={[styles.title, styles.header]}>User Albums</Text>
      ) : (
      <View style={[styles.row, styles.loading]}>
        <Text>Loading Albums</Text>
        <ActivityIndicator />
      </View>
    )
  }

  renderAlbum(album) {
    return (
      <TouchableOpacity style={[styles.album, album.index < this.props.albums.length - 1 && styles.seperator]}>
        <Text style={styles.title}>{`User ${album.item.userId}`}</Text>
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
  row: {
    ...globalStyle.row,
    justifyContent: 'center'
  },
  title: globalStyle.title,
  text: globalStyle.text,
  header: {
    marginTop: 12,
    textAlign: 'center'
  },
  loading: {
    marginTop: 12
  },
  album: {
    padding: 12,
  },
  seperator: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: globalStyle.lightGray
  }
});
