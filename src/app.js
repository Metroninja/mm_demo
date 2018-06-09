import React, { Component } from 'react';
import { YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import Routes from './routes';
const store = configureStore();

class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    /*** 
    * ignoring isMounted yellow box warnings, see - https://github.com/facebook/react-native/issues/18868
    ***/
   YellowBox.ignoreWarnings(['Warning: isMounted', 'Warning: isMounted(...) is deprecated']);
  }

  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

export default App;
