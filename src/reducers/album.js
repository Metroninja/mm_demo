import * as Actions from '../actions/album';
import { AsyncStorage } from 'react-native';

const initialState = {
  fetching: false,
  albums: [],
  album: {},
  albumId: '',
  photos: [],
  photo: {},
  photoId: '',
  error: '',
}

export const album = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SELECT_ALBUM:
      return {
        ...state,
        albumId: action.albumId,
      }
      break;
    case Actions.SELECT_PHOTO:
      return {
        ...state,
        photoId: action.photoId,
      }
      break;
    case Actions.SET_ALBUMS:
      return {
        ...state,
        albums: action.albums,
      }
      break;
    case Actions.SET_ALBUM:
      return {
        ...state,
        album: action.album,
        photos: action.photos,
      }
      break;
    case Actions.SET_PHOTO:
      return {
        ...state,
        photo: action.photo,
      }
      break;
    case Actions.GET_ALBUM:      
    case Actions.GET_ALBUMS:
      return {
        ...state,
        error: '',
        fetching: true,
      };
      break;
    case Actions.GET_PHOTO:
      return {
        ...state,
        fetching: true,
      }
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
    case Actions.GET_ALBUM_SUCCESS:
      const { album, photos } = action;
      AsyncStorage.setItem(`@MediaMonks_Demo:album_${state.albumId}`, JSON.stringify({album, photos}));
      return {
        ...state,
        album,
        photos
      }
      break;
    case Actions.GET_PHOTO_SUCCESS:
        AsyncStorage.setItem(`@MediaMonks_Demo:photo_${state.photoId}`, JSON.stringify(action.result));
        return {
          ...state,
          photo: action.result
        }
        break;
    case Actions.GET_ALBUM_FAILURE:
    case Actions.GET_ALBUMS_FAILURE:
    case Actions.GET_PHOTO_FAILURE:
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
