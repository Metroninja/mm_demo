import * as Actions from '../actions/album';
import { AsyncStorage } from 'react-native';

const initialState = {
  fetching: false,
  albums: [],
  error: '',
}

export const album = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_ALBUMS:
      return {
        ...state,
        albums: action.albums,
      }
      break;
    case Actions.GET_ALBUMS:
      return {
        ...state,
        error: '',
        fetching: true,
      };
      break;
    case Actions.GET_ALBUMS_SUCCESS:
      // no need to await and hold up the reducer since we don't need the stored version
      // until app reloads
      AsyncStorage.setItem('@MediaMonks_Demo:albums', JSON.stringify(action.result));
      return {
        ...state,
        fetching: false,
        albums: action.result
      }
      break;
    case Actions.GET_ALBUMS_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.exception
      }
      break;
    default:
      return state;
  }
};
