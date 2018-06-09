import * as Actions from '../actions/albums';

const initialState = {
  fetching: false,
  albums: [],
  error: '',
}

export const ALBUMS = (state = initialState, action) => {
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
