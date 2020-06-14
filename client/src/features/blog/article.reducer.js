import {
  SET_ARTICLES,
  SET_ARTICLE,
  CLEAR_ARTICLE,
  LIKE_ARTICLE,
  DISLIKE_ARTICLE,
  COMMENT_ON_ARTICLE,
  DELETE_COMMENT,
  SET_MOST_VIEW_ARTICLES,
} from './article.constants';

const articleReducerInitialState = {
  current: null,
  articles: {
    docs: [],
    totalDocs: 0,
    limit: 10,
    totalPages: 0,
    page: 0,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null,
  },
  mostView: [],
};
const articleReducer = (
  state = articleReducerInitialState,
  { type, payload }
) => {
  switch (type) {
    case SET_ARTICLES:
      return {
        ...state,
        articles: {
          ...state.articles,
          ...payload,
        },
      };
    case SET_ARTICLE:
      return {
        ...state,
        current: payload.article,
      };
    case SET_MOST_VIEW_ARTICLES:
      return {
        ...state,
        mostView: payload.articles,
      };
    case LIKE_ARTICLE:
    case DISLIKE_ARTICLE:
    case COMMENT_ON_ARTICLE:
      return {
        ...state,
        articles: {
          ...state.articles,
          docs: state.articles.docs.map(article =>
            article._id === payload.article._id ? payload.article : article
          ),
        },
        current: payload.article,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        current: {
          ...state.current,
          comments: state.current.comments.filter(
            cmt => cmt._id !== payload.commentId
          ),
        },
      };
    case CLEAR_ARTICLE:
      return articleReducerInitialState;
    default:
      return state;
  }
};

export default articleReducer;
