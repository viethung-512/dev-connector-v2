import axios from 'axios';
import { toastr } from 'react-redux-toastr';

import {
  asyncActionStart,
  asyncActionError,
  asyncActionFinish,
} from '../async/async.actions';
import { actionTypes, pagination, pageTypes } from '../../app/utils/config';
import {
  SET_ARTICLES,
  SET_ARTICLE,
  CLEAR_ARTICLE,
  LIKE_ARTICLE,
  COMMENT_ON_ARTICLE,
  DELETE_ARTICLE_COMMENT,
  DELETE_ARTICLE,
  SET_MOST_VIEW_ARTICLES,
  SET_RELATED_ARTICLES,
} from './article.constants';

const { blog: blogActions } = actionTypes;

export const createArticle = (article, history) => async dispatch => {
  const formData = new FormData();
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };

  formData.append('title', article.title);
  formData.append('shortDescription', article.shortDescription);
  formData.append('content', article.content);
  if (article.image.file) {
    formData.append('image', article.image.file.originFileObj);
  }
  dispatch(asyncActionStart(blogActions.CREATE_UPDATE_ARTICLE));

  try {
    const res = await axios.post('/api/article', formData, config);
    const { article } = res.data;

    dispatch({ type: SET_ARTICLE, payload: { article } });
    dispatch(asyncActionFinish());
    toastr.success('Success', 'Your article has been added');
    history.push(`/blog/${article._id}`);
  } catch (err) {
    console.log(err.response.data, 'create article frontend');
    dispatch(asyncActionError());
    toastr.error('Oops', 'Some thing went wrong, please try again');
  }
};

export const updateArticle = (updatedArticle, history) => async dispatch => {
  const formData = new FormData();
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };

  if (updatedArticle.title) formData.append('title', updatedArticle.title);
  if (updatedArticle.shortDescription)
    formData.append('shortDescription', updatedArticle.shortDescription);
  if (updatedArticle.content)
    formData.append('content', updatedArticle.content);

  if (updatedArticle.image.file) {
    formData.append('image', updatedArticle.image.file.originFileObj);
  }

  dispatch(asyncActionStart(blogActions.CREATE_UPDATE_ARTICLE));

  try {
    const res = await axios.post(
      `/api/article/${updatedArticle._id}`,
      formData,
      config
    );
    const { article } = res.data;

    dispatch({ type: SET_ARTICLE, payload: { article } });
    dispatch(asyncActionFinish());
    toastr.success('Success', 'Your article has been updated');
    history.push(`/blog/${article._id}`);
  } catch (err) {
    console.log(err.response.data, 'update article frontend');
    dispatch(asyncActionError());
    toastr.error('Oops', 'Some thing went wrong, please try again');
  }
};

export const getMostViewArticle = () => async dispatch => {
  dispatch(asyncActionStart(blogActions.GET_MOST_VIEW));

  try {
    const res = await axios.get('/api/article/most-view');
    const { articles } = res.data;

    dispatch({ type: SET_MOST_VIEW_ARTICLES, payload: { articles } });
    dispatch(asyncActionFinish());
  } catch (err) {
    console.log(err, 'get most view article frontend');
    dispatch(asyncActionError());
  }
};

export const getArticles = (
  pageType = pageTypes.article.ALL,
  userId = null,
  page = 1,
  limit = pagination.limit
) => async dispatch => {
  let apiPath;
  switch (pageType) {
    case pageTypes.article.AUTH:
      apiPath = `/api/article/me/?page=${page}&limit=${limit}`;
      break;
    case pageTypes.article.USER:
      apiPath = `/api/article/user/${userId}/?page=${page}&limit=${limit}`;
      break;
    default:
      apiPath = `/api/article/?page=${page}&limit=${limit}`;
      break;
  }

  dispatch(asyncActionStart(blogActions.GET_ARTICLES));

  try {
    const res = await axios.get(apiPath);

    dispatch({ type: SET_ARTICLES, payload: res.data });
    dispatch(asyncActionFinish());
  } catch (err) {
    console.log(err, 'get articles');
    dispatch(asyncActionError());
  }
};

export const getRelatedArticles = articleId => async dispatch => {
  dispatch(asyncActionStart(blogActions.GET_ARTICLES));

  try {
    const response = await axios.get(`/api/article/related/${articleId}`);
    const { articles } = response.data;

    dispatch({ type: SET_RELATED_ARTICLES, payload: { articles } });
    dispatch(asyncActionFinish());
  } catch (err) {
    console.log(err);
    dispatch(asyncActionError());
    toastr.error('Oops', 'Some thing went wrong, please try again');
  }
};

export const getArticleById = id => async dispatch => {
  dispatch(asyncActionStart(blogActions.GET_ARTICLE, id));

  try {
    const res = await axios.get(`/api/article/${id}`);

    dispatch({ type: SET_ARTICLE, payload: res.data });
    dispatch(asyncActionFinish(blogActions.GET_ARTICLE));
  } catch (err) {
    console.log(err, 'get article by id frontend');
    dispatch(asyncActionError());
  }
};

export const likeArticle = id => async dispatch => {
  dispatch(asyncActionStart(blogActions.LIKE_ARTICLE, id));

  try {
    const res = await axios.put(`/api/article/like/${id}`);
    const { article } = res.data;

    dispatch({ type: LIKE_ARTICLE, payload: { article } });
    dispatch(asyncActionFinish());
  } catch (err) {
    const errorMessage = err.response.data.error.general.msg;
    dispatch(asyncActionError());
    toastr.error('Fail', errorMessage);
  }
};

export const dislikeArticle = id => async dispatch => {
  dispatch(asyncActionStart(blogActions.DISLIKE_ARTICLE, id));

  try {
    const res = await axios.put(`/api/article/dislike/${id}`);
    const { article } = res.data;

    dispatch({ type: LIKE_ARTICLE, payload: { article } });
    dispatch(asyncActionFinish());
  } catch (err) {
    const errorMessage = err.response.data.error.general.msg;
    dispatch(asyncActionError());
    toastr.error('Fail', errorMessage);
  }
};

export const deleteArticle = (pageType, articleId) => async dispatch => {
  toastr.confirm('Are you sure? This can not be undone', {
    onOk: async () => {
      dispatch(asyncActionStart(blogActions.DELETE_ARTICLE, articleId));

      try {
        await axios.put(`/api/article/${articleId}`);

        dispatch({ type: DELETE_ARTICLE, payload: { articleId } });
        dispatch(getArticles(pageType));
        dispatch(asyncActionFinish());
        toastr.success('Success', 'Article deleted');
      } catch (err) {
        console.log(err, 'delete comment frontend');
        dispatch(asyncActionError());
        toastr('Oops', 'Some thing went wrong, please try again');
      }
    },
  });
};

export const commentOnArticle = (id, comment) => async dispatch => {
  dispatch(asyncActionStart(blogActions.COMMENT_ON_ARTICLE));

  try {
    const res = await axios.post(`/api/article/comment/${id}`, {
      text: comment.text,
    });
    const { article } = res.data;

    dispatch({ type: COMMENT_ON_ARTICLE, payload: { article } });
    dispatch(asyncActionFinish());
  } catch (err) {
    console.log(err.response.data, 'comment on article frontend');
    dispatch(asyncActionError());
    toastr('Oops', 'Some thing went wrong, please try again');
  }
};

export const deleteComment = (commentId, articleId) => async dispatch => {
  dispatch(asyncActionStart(blogActions.DELETE_ARTICLE_COMMENT, commentId));

  try {
    await axios.delete(`/api/article/comment/${articleId}/${commentId}`);

    dispatch({ type: DELETE_ARTICLE_COMMENT, payload: { commentId } });
    dispatch(asyncActionFinish());
    toastr.success('Success', 'Comment deleted');
  } catch (err) {
    console.log(err, 'delete comment frontend');
    dispatch(asyncActionError());
    toastr('Oops', 'Some thing went wrong, please try again');
  }
};

export const clearArticle = () => ({ type: CLEAR_ARTICLE });
