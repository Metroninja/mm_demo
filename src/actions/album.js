export const GET_ALBUMS = "GET_ALBUMS";
export const GET_ALBUMS_SUCCESS = "GET_ALBUMS_SUCCESS";
export const GET_ALBUMS_FAILURE = "GET_ALBUMS_FAILURE";

export const SET_ALBUMS = "SET_ALBUMS";

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

export const setAlbums = (albums) => {
  return (dispatch) => dispatch({type: SET_ALBUMS, albums});
}
