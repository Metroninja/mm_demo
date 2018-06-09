import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet,
  Text, TouchableOpacity, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import globalStyle from '../../styles';

// This is in essence a completely blank file used for copy pasta for each new
//component.  If this is still at the top of any file make sure to clean it up properly

@connect(
  state => ({}),
  dispatch => bindActionCreators({ }, dispatch)
)
@withNavigation
export default class Photos extends Component {

  static propTypes = {
    photos: PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.photos.map(photo => (
          <View style={styles.photo} key={photo.id}>
            <Image style={styles.image} source={{uri: photo.thumbnailUrl.replace('http', 'https')}} />
          </View>
        ))}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    ...globalStyle.row,
    justifyContent: 'center',
    marginTop: 12,
    flexWrap: 'wrap'
    
  },
  photo: {
    margin: 4,
    backgroundColor: globalStyle.lightGray,
    ...globalStyle.shadow
  },
  image: {
    width: 75,
    height: 75,
    resizeMode: 'contain',
    
  }

});
