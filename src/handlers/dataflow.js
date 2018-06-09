import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import globalStyle from '../../styles';

@connect(
  state => ({
  }),
  dispatch => bindActionCreators({ }, dispatch)
)
export default class Dataflow extends Component {

  static propTypes = {
  };

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    //kick off fetch/async storage check
  }

  render() {
    return null;
  }
}
