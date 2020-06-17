import React from 'react';
import { List } from 'antd';
import ArticleItem from './ArticleItem/ArticleItem';
import { actionTypes, pagination } from '../../../app/utils/config';

function ArticleList({
  articles,
  loading,
  loadingType,
  likeArticle,
  dislikeArticle,
  authUserId,
  total,
  handleChangePage,
  currentPage,
  deleteArticle,
}) {
  const blogActions = actionTypes.blog;

  return (
    <List
      bordered={false}
      pagination={{
        total: total,
        onChange: handleChangePage,
        current: currentPage,
        pageSize: pagination.limit,
        hideOnSinglePage: true,
        defaultCurrent: 1,
      }}
      dataSource={articles}
      renderItem={article => (
        <List.Item style={{ paddingTop: 0 }}>
          <ArticleItem
            article={article}
            loading={loadingType === blogActions.GET_ARTICLES ? loading : false}
            likeArticle={() => likeArticle(article._id)}
            dislikeArticle={() => dislikeArticle(article._id)}
            deleteArticle={() => deleteArticle(article._id)}
            likeLoadingTypes={[blogActions.LIKE_ARTICLE]}
            dislikeLoadingTypes={[blogActions.DISLIKE_ARTICLE]}
            deleteLoadingTypes={[blogActions.DELETE_ARTICLE]}
            likeCount={article.likes.length}
            dislikeCount={article.dislikes.length}
            commentCount={article.comments.length}
            isLiked={article.likes.find(like => like.user === authUserId)}
            isDisliked={article.dislikes.find(
              dislike => dislike.user === authUserId
            )}
            isAuth={authUserId === article.user._id}
          />
        </List.Item>
      )}
    />
  );
}

export default ArticleList;
