import React, { useEffect } from 'react';
import './style.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Typography, PageHeader } from 'antd';
import {
  clearArticle,
  getArticleById,
  commentOnArticle,
  deleteComment,
  likeArticle,
  dislikeArticle,
  getRelatedArticles,
} from '../article.actions';

import MainContent from './MainContent';
import { actionTypes } from '../../../app/utils/config';
import AuthorSidebar from '../AuthorSidebar';
import LoadingGrid from '../../../app/layout/common/loading/LoadingGrid';
import { breadcrumbRenderItem } from '../../../app/utils/helper';

const { Title } = Typography;

function ArticleDetailedPage(props) {
  const params = useParams();
  const dispatch = useDispatch();
  const { user: authUser, authenticated } = useSelector(state => state.auth);
  let currentArticle = useSelector(state => state.blog.current);
  const { related: relatedArticle } = useSelector(state => state.blog);

  const { articleId } = params;

  const author = currentArticle ? currentArticle.user : {};
  currentArticle = currentArticle ? currentArticle : {};

  useEffect(() => {
    if (articleId) {
      dispatch(getArticleById(articleId));
      dispatch(getRelatedArticles(articleId));
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

  const blogAction = actionTypes.blog;
  const authAction = actionTypes.auth;
  const routes = [
    {
      path: authenticated ? 'dashboard' : 'developers',
      breadcrumbName: authenticated ? 'Dashboard' : 'Developers',
    },
    {
      path: 'blog',
      breadcrumbName: 'Blog',
    },
    {
      path: currentArticle.title,
      breadcrumbName: currentArticle.title,
    },
  ];

  const likeCount =
    currentArticle && currentArticle.likes ? currentArticle.likes.length : 0;
  const dislikeCount =
    currentArticle && currentArticle.dislikes
      ? currentArticle.dislikes.length
      : 0;

  return (
    <LoadingGrid
      loadingTypes={[blogAction.GET_ARTICLE, authAction.GET_AUTH_USER]}
    >
      <div className='article-detail'>
        <PageHeader
          style={{ paddingLeft: 0, paddingRight: 0 }}
          title={
            <Title className='primary article-detail__title'>
              {currentArticle.title}
            </Title>
          }
          breadcrumb={{ itemRender: breadcrumbRenderItem, routes }}
        />
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={18} lg={18} xl={18}>
            <MainContent
              article={currentArticle}
              submitComment={handleSubmit}
              authUser={authUser}
              authenticated={authenticated}
              deleteComment={handleDeleteComment}
              likeArticle={handleLikeArticle}
              dislikeArticle={handleDislikeArticle}
              likeCount={likeCount}
              dislikeCount={dislikeCount}
              commentLoadingTypes={[blogAction.COMMENT_ON_ARTICLE]}
              likeLoadingTypes={[blogAction.LIKE_ARTICLE]}
              dislikeLoadingTypes={[blogAction.DISLIKE_ARTICLE]}
              deleteCommentLoadingTypes={[blogAction.DELETE_COMMENT]}
              relatedArticle={relatedArticle}
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
    </LoadingGrid>
  );
}

export default ArticleDetailedPage;
