import React, { useEffect } from 'react';
import './style.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Spin, Typography } from 'antd';
import {
  clearArticle,
  getArticleById,
  commentOnArticle,
  deleteComment,
  likeArticle,
  dislikeArticle,
} from '../article.actions';

import MainContent from './MainContent';
import { actionTypes } from '../../../app/utils/config';
import { LoadingIcon } from '../../../app/layout/common/Icons';
import AuthorSidebar from '../AuthorSidebar';

const { Title } = Typography;

function ArticleDetailedPage(props) {
  const params = useParams();
  const dispatch = useDispatch();
  const { user: authUser, authenticated } = useSelector(state => state.auth);
  let currentArticle = useSelector(state => state.blog.current);
  const { loading, type, elmId } = useSelector(state => state.async);

  const { articleId } = params;

  const author = currentArticle ? currentArticle.user : {};
  currentArticle = currentArticle ? currentArticle : {};

  useEffect(() => {
    if (articleId) {
      dispatch(getArticleById(articleId));
    }

    return () => {
      dispatch(clearArticle());
    };

    // eslint-disable-next-line
  }, [articleId]);

  const handleSubmit = commentText => {
    dispatch(commentOnArticle(currentArticle._id, { text: commentText }));
  };

  const handleDeleteComment = id => {
    dispatch(deleteComment(id, articleId));
  };

  const handleLikeArticle = id => dispatch(likeArticle(id));
  const handleDislikeArticle = id => dispatch(dislikeArticle(id));

  const articleDetailLoading =
    (type === actionTypes.blog.GET_ARTICLE && elmId === articleId) ||
    type === actionTypes.auth.GET_AUTH_USER
      ? loading
      : false;

  const commentLoading =
    type === actionTypes.blog.COMMENT_ON_ARTICLE ? loading : false;

  const likeCount =
    currentArticle && currentArticle.likes ? currentArticle.likes.length : 0;
  const dislikeCount =
    currentArticle && currentArticle.dislikes
      ? currentArticle.dislikes.length
      : 0;

  return (
    <Spin spinning={articleDetailLoading} indicator={LoadingIcon}>
      <div className='article-detail'>
        <Title className='primary article-detail__title'>
          {currentArticle.title}
        </Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={18} lg={18} xl={18}>
            <MainContent
              article={currentArticle}
              submitComment={handleSubmit}
              submitting={commentLoading}
              authUser={authUser}
              authenticated={authenticated}
              loading={loading}
              loadingType={type}
              elmId={elmId}
              deleteComment={handleDeleteComment}
              likeArticle={handleLikeArticle}
              dislikeArticle={handleDislikeArticle}
              likeCount={likeCount}
              dislikeCount={dislikeCount}
            />
          </Col>
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <AuthorSidebar
              author={author}
              isAuth={authUser && authUser._id === author._id}
            />
          </Col>
        </Row>
      </div>
    </Spin>
  );
}

export default ArticleDetailedPage;
