export const GET_ALBUMS = "GET_ALBUMS";
export const GET_ALBUMS_SUCCESS = "GET_ALBUMS_SUCCESS";
export const GET_ALBUMS_FAILURE = "GET_ALBUMS_FAILURE";

export const GET_ALBUM = "GET_ALBUM";
export const GET_ALBUM_SUCCESS = "GET_ALBUM_SUCCESS";
export const GET_ALBUM_FAILURE = "GET_ALBUM_FAILURE";

export const GET_PHOTO = "GET_PHOTO";
export const GET_PHOTO_SUCCESS = "GET_PHOTO_SUCCESS";
export const GET_PHOTO_FAILURE = "GET_PHOTO_FAILURE";

export const SET_ALBUMS = "SET_ALBUMS";
export const SET_ALBUM = "SET_ALBUM";
export const SET_PHOTO = "SET_PHOTO";

export const SELECT_ALBUM = "SELECT_ALBUM";
export const SELECT_PHOTO = "SELECT_PHOTO";

// Get all Albums
export const getAlbums = () => {
  return async (dispatch) =>  {
    dispatch({ type: GET_ALBUMS });
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/albums');
      const result = await response.json();
      dispatch({type: GET_ALBUMS_SUCCESS, result});
    } catch (exception) {
      dispatch({type: GET_ALBUMS_FAILURE, exception})
    }
  }
};

// get album details and photos associated with it in parallel
export const getAlbum = (id) => {
  // this one gets a bit more complex since we need to fetch album details and photos separately
  return async (dispatch) =>  {
    dispatch({ type: GET_ALBUM });
    Promise.all([fetchAlbum(id), fetchPhotos(id)]).then(results => {
      dispatch({type: GET_ALBUM_SUCCESS, album: results[0], photos: results[1]});
    })
    .catch((ex) => dispatch({type: GET_ALBUM_FAILURE, error: ex}));
  }
};

// get picture details
export const getPicture = (id) => {
  return async (dispatch) =>  {
    dispatch({ type: GET_PHOTO });
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`);
      const result = await response.json();
      dispatch({type: GET_PHOTO_SUCCESS, result});
    } catch (exception) {
      dispatch({type: GET_PHOTO_FAILURE, exception})
    }
  }
};

// set methods if we have already fetched the data previously
export const setAlbums = (albums) => {
  return (dispatch) => dispatch({type: SET_ALBUMS, albums});
}
export const setAlbum = ({album, photos}) => {
  return (dispatch) => dispatch({type: SET_ALBUM, album, photos});
}
export const setPhoto = (photo) => {
  return (dispatch) => dispatch({type: SET_PHOTO, photo});
}

// helper methods to store our 'active' album or photo
export const selectAlbum = (albumId) => {
  return (dispatch) => dispatch({type: SELECT_ALBUM, albumId});
}
export const selectPicture = (photoId) => {
  return (dispatch) => dispatch({type: SELECT_PHOTO, photoId});
}

//helper fetch methods for Promise.all
const fetchAlbum = async (id) => {
  console.log('fetch album method', id)
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`);
    const result = await response.json();
    return result;
  } catch (exception) {
    Promise.reject(exception);
  }
}
const fetchPhotos = async (id) => {    
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`);
    const result = await response.json();
    return result;
  } catch (exception) {
    Promise.reject(exception);
  }
}
