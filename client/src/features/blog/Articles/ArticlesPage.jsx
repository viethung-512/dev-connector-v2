import React, { useEffect } from 'react';
import './style.css';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import { Row, Col, Typography, Spin } from 'antd';
import ArticleList from './ArticleList';
import {
  clearArticle,
  likeArticle,
  dislikeArticle,
  getArticles,
  deleteArticle,
  getMostViewArticle,
} from '../article.actions';
import { openModal } from '../../modal/modal.actions';
import { pageTypes, actionTypes } from '../../../app/utils/config';
import AuthorSidebar from '../AuthorSidebar';
import { getProfile, getAuthProfile } from '../../profile/profile.actions';
import Sidebar from './Sidebar';
import { LoadingIcon } from '../../../app/layout/common/Icons';

const { Title } = Typography;

const ArticlesPage = ({ pageType }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const mostViewArticles = useSelector(state => state.blog.mostView);
  const currentProfile = useSelector(state => state.profile.current);
  const authUserId = useSelector(state => state.auth.user._id);
  const { articles } = useSelector(state => state.blog);
  const { loading, type, elmId } = useSelector(state => state.async);
  const { userId } = useParams();

  useEffect(() => {
    dispatch(getMostViewArticle());
  }, []);

  useEffect(() => {
    const { page, limit } = queryString.parse(location.search);

    if (userId) {
      dispatch(getArticles(pageType, userId, page, limit));
    } else {
      dispatch(getArticles(pageType, null, page, limit));
    }

    return () => {
      if (articles.docs) {
        dispatch(clearArticle());
      }
    };

    // eslint-disable-next-line
  }, [userId]);

  useEffect(() => {
    if (pageType === pageTypes.article.AUTH) {
      dispatch(getAuthProfile());
    } else if (pageType === pageTypes.article.USER && userId) {
      dispatch(getProfile(userId));
    }

    // eslint-disable-next-line
  }, [pageType, userId]);

  const handleLikeArticle = id => {
    if (!authUserId) {
      dispatch(openModal('UnAuth'));
    } else {
      dispatch(likeArticle(id));
    }
  };

  const handleDislikeArticle = id => {
    if (!authUserId) {
      dispatch(openModal('UnAuth'));
    } else {
      dispatch(dislikeArticle(id));
    }
  };

  const handleDeleteArticle = id => {
    dispatch(deleteArticle(pageType, id));
  };

  const handleChangePage = (page, pageSize) => {
    dispatch(getArticles(pageType, null, page, pageSize));
  };

  const getArticlesLoading = actionTypes.blog.GET_ARTICLES ? loading : false;

  const getMostViewLoading =
    type === actionTypes.blog.GET_MOST_VIEW ? loading : false;

  const articlesPageLoading = getArticlesLoading || getMostViewLoading;

  return (
    <div className='articles-page'>
      <Title className='primary articles-page__title'>Blog</Title>
      <Spin spinning={articlesPageLoading} indicator={LoadingIcon}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={18} lg={18} xl={18}>
            <ArticleList
              articles={articles.docs}
              loading={loading}
              likeArticle={handleLikeArticle}
              dislikeArticle={handleDislikeArticle}
              loadingType={type}
              loadingElm={elmId}
              authUserId={authUserId}
              total={articles.totalDocs}
              handleChangePage={handleChangePage}
              currentPage={articles.page}
              deleteArticle={handleDeleteArticle}
            />
          </Col>
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            {pageType === pageTypes.article.AUTH ||
            pageType === pageTypes.article.USER ? (
              <AuthorSidebar
                author={currentProfile ? currentProfile.user : {}}
                isAuth={pageType === pageTypes.article.AUTH}
              />
            ) : (
              <Sidebar mostViewArticles={mostViewArticles} />
            )}
          </Col>
        </Row>
      </Spin>
    </div>
  );
};

export default ArticlesPage;
