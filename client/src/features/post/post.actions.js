import axios from 'axios';
import {
  asyncActionError,
  asyncActionStart,
  asyncActionFinish,
} from '../async/async.actions';
import {
  SET_POSTS,
  SET_CURRENT_POST,
  CLEAR_POST,
  CREATE_POST,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  COMMENT_ON_POST,
  DELETE_COMMENT,
} from './post.constants';
import { toastr } from 'react-redux-toastr';

export const getPosts = () => async dispatch => {
  dispatch(asyncActionStart('getPosts'));
  try {
    const res = await axios.get('/post');
    const { posts } = res.data;

    dispatch({ type: SET_POSTS, payload: { posts } });
    dispatch(asyncActionFinish());
  } catch (err) {
    console.log(err.response.data);
    dispatch(asyncActionError(err.response.data));
  }
};

export const getPost = id => async dispatch => {
  dispatch(asyncActionStart('getPost'));
  try {
    const res = await axios.get(`/post/${id}`);
    const { post } = res.data;

    dispatch({ type: SET_CURRENT_POST, payload: { post } });
    dispatch(asyncActionFinish());
  } catch (err) {
    console.log(err.response.data);
    dispatch(asyncActionError(err.response.data));
  }
};

export const createPost = ({ text }) => async dispatch => {
  dispatch(asyncActionStart('createPost'));

  try {
    const res = await axios.post('/post', { text });
    const { post } = res.data;

    dispatch({ type: CREATE_POST, payload: { post } });
    dispatch(asyncActionFinish());
  } catch (err) {
    dispatch(asyncActionError(err.response.data));
  }
};

export const likePost = postId => async dispatch => {
  dispatch(asyncActionStart('likePost', postId));

  try {
    const res = await axios.put(`/post/like/${postId}`);
    const { post } = res.data;

    dispatch({ type: LIKE_POST, payload: { post } });
    dispatch(asyncActionFinish());
  } catch (err) {
    dispatch(asyncActionError(err.response.data));
    toastr.error('Error', err.response.data.msg);
  }
};

export const unlikePost = postId => async dispatch => {
  dispatch(asyncActionStart('unlikePost', postId));

  try {
    const res = await axios.put(`/post/unlike/${postId}`);
    const { post } = res.data;

    dispatch({ type: UNLIKE_POST, payload: { post } });
    dispatch(asyncActionFinish());
  } catch (err) {
    dispatch(asyncActionError(err.response.data));
    toastr.error('Error', err.response.data.msg);
  }
};

export const deletePost = postId => async dispatch => {
  toastr.confirm('Are your sure? This can NOT be undone', {
    onOk: async () => {
      dispatch(asyncActionStart('deletePost', postId));

      try {
        await axios.delete(`/post/${postId}`);

        dispatch({ type: DELETE_POST, payload: { postId } });
        dispatch(asyncActionFinish());
        toastr.success('Success', 'Post has been deleted');
      } catch (err) {
        dispatch(asyncActionError(err));
        toastr.error('Oops', 'Some thing went wrong, please try again');
      }
    },
  });
};

export const commentOnPost = (comment, postId) => async dispatch => {
  dispatch(asyncActionStart('commentOnPost'));

  try {
    const res = await axios.post(`/post/comment/${postId}`, comment);
    const { post } = res.data;

    dispatch({ type: COMMENT_ON_POST, payload: { post } });
    dispatch(asyncActionFinish());
  } catch (err) {
    dispatch(asyncActionError(err.response.data));
    toastr.error('Oops', 'Some thing when wrong, please try again');
  }
};

export const deleteComment = (commentId, postId) => async dispatch => {
  dispatch(asyncActionStart('deleteComment', commentId));

  try {
    const res = await axios.delete(`/post/comment/${postId}/${commentId}`);
    const { post } = res.data;

    dispatch({ type: DELETE_COMMENT, payload: { post } });
    dispatch(asyncActionFinish());
  } catch (err) {
    dispatch(asyncActionError(err.response.data));
    toastr.error('Oops', 'Some thing when wrong, please try again');
  }
};

export const clearPost = () => ({ type: CLEAR_POST });
