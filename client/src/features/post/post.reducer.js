import {
  SET_CURRENT_POST,
  SET_POSTS,
  CLEAR_POST,
  CREATE_POST,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  COMMENT_ON_POST,
  DELETE_COMMENT,
} from './post.constants';

const postReducerInitialState = {
  current: null,
  posts: [],
};
const postReducer = (state = postReducerInitialState, { type, payload }) => {
  switch (type) {
    case CREATE_POST:
      return {
        ...state,
        posts: [payload.post, ...state.posts],
      };
    case LIKE_POST:
    case UNLIKE_POST:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.post._id ? payload.post : post
        ),
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload.postId),
      };

    case SET_CURRENT_POST:
    case COMMENT_ON_POST:
    case DELETE_COMMENT:
      return {
        ...state,
        current: payload.post,
      };
    case SET_POSTS:
      return {
        ...state,
        posts: payload.posts,
      };

    case CLEAR_POST:
      return postReducerInitialState;
    default:
      return state;
  }
};

export default postReducer;
