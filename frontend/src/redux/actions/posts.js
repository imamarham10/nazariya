import * as api from '../../api';
import { CREATE, DELETE, FETCH_ALL,UPDATE,LIKE, FETCH_BY_SEARCH, START_LOADING, END_LOADING } from '../actionTypes';

//Action Creators

export const getPosts = (page) => async (dispatch) => {
    try {
      dispatch({type: START_LOADING});
      const { data } = await api.fetchPosts(page);

      dispatch({ type: FETCH_ALL, payload: data });
      dispatch({type: END_LOADING});
    } catch (error) {
      console.log(error.message);
    }
  };

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try{    
      dispatch({type: START_LOADING});
      const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
      dispatch({ type: FETCH_BY_SEARCH, payload: data });
      dispatch({type: END_LOADING});
     // console.log(data);
    } catch(error){
      console.log(error);
    }
}  
export const createPost = (post) => async(dispatch) => {
    try{
        const { data } = await api.createPosts(post);
        dispatch({type: CREATE, payload: data});
    }catch(error){
        console.log(error.message);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await api.likePost(id, user?.token);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
}