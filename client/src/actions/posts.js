import * as api from '../api'
import ACTIONS from '../constants/actionTypes'


export const getPost = (id) => async (dispatch) => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });
  
      const { data } = await api.fetchPost(id);
  
      dispatch({ type: ACTIONS.FETCH_POST, payload: { post: data } });
    } catch (error) {
      console.log(error);
    }
  };
  
  export const getPosts = (page) => async (dispatch) => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });
      const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);
  
      dispatch({ type: ACTIONS.FETCH_ALL, payload: { data, currentPage, numberOfPages } });
      dispatch({ type: ACTIONS.END_LOADING });
    } catch (error) {
      console.log(error);
    }
  };

  export const createPost = (post, history) => async (dispatch) => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });
      const { data } = await api.createPost(post);
  
      dispatch({ type: ACTIONS.CREATE, payload: data });
  
      history.push(`/posts/${data._id}`);
    } catch (error) {
      console.log(error);
    }
  };
export const updatePost = (id, post) => async (dispatch) => {
    try {
        const {data} = await api.updatePost(id, post)
        dispatch({type: ACTIONS.UPDATE, payload: data})
    } catch (err) {
        console.log(err.message);
    }
}
export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id)
        dispatch({type: ACTIONS.DELETE, payload: id})
    } catch (err) {
        console.log(err.message);
    }
}
export const likePost = (id) => async (dispatch) => {
    try {
        const {data} = await api.likePost(id)
        dispatch({type: ACTIONS.LIKE, payload: data})
    } catch (err) {
        console.log(err.message);
    }
}
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });
      const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
  
      dispatch({ type: ACTIONS.FETCH_BY_SEARCH, payload: { data } });
      dispatch({ type: ACTIONS.END_LOADING });
    } catch (error) {
      console.log(error);
    }
  };
  export const commentPost = (value, id) => async (dispatch) => {
    try {
      const { data } = await api.comment(value, id);
  
      dispatch({ type: ACTIONS.COMMENT, payload: data });
  
      return data.comments;
    } catch (error) {
      console.log(error);
    }
  };