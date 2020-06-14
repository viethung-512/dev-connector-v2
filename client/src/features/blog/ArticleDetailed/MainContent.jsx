import React, { useState, Fragment } from 'react';
import { Divider, Comment, Avatar, Button, Space } from 'antd';
import IconText from '../../../app/layout/common/IconText';
import { formatDate } from '../../../app/utils/helper';
import {
  CalendarOutlined,
  EyeOutlined,
  DislikeFilled,
  LikeFilled,
} from '@ant-design/icons';
import { UserCirCleIcon } from '../../../app/layout/common/Icons';
import Comments from './Comments';
import CommentEditor from './CommentEditor';
import { actionTypes } from '../../../app/utils/config';
import Image from '../../../app/layout/common/Image';

function MainContent({
  article,
  submitComment,
  submitting,
  authUser,
  authenticated,
  loading,
  loadingType,
  elmId,
  deleteComment,
  likeCount,
  dislikeCount,
  likeArticle,
  dislikeArticle,
}) {
  const [commentText, setCommentText] = useState('');

  const handleChange = e => setCommentText(e.target.value);
  const handleSubmit = e => {
    e.preventDefault();
    submitComment(commentText);
    setCommentText('');
  };

  const likeLoading =
    loadingType === actionTypes.blog.LIKE_ARTICLE ? loading : false;
  const dislikeLoading =
    loadingType === actionTypes.blog.DISLIKE_ARTICLE ? loading : false;

  return (
    <div className='article-detail__main'>
      <div className='article-detail__main-photo'>
        <Image src={article.mainPhoto} className='article-detail__main-img' />
      </div>
      <Divider />
      <div
        dangerouslySetInnerHTML={{ __html: article.content }}
        className='article-detail__main-container'
      />
      <Divider />
      <div className='article-detail__main-info'>
        <IconText
          icon={UserCirCleIcon}
          text={article.user ? article.user.name : ''}
          style={{ marginRight: 12 }}
        />
        |
        <IconText
          icon={CalendarOutlined}
          text={formatDate(article.date)}
          style={{ marginRight: 12, marginLeft: 12 }}
        />
        |
        <IconText
          icon={EyeOutlined}
          text={article.views}
          style={{ marginLeft: 12 }}
        />
      </div>
      <Divider />
      {authenticated && (
        <Fragment>
          <div className='article-detail__main-like'>
            <Space>
              <Button
                className='btn btn--success'
                type='primary'
                icon={<LikeFilled />}
                onClick={() => likeArticle(article._id)}
                loading={likeLoading}
              >
                Like this article ({likeCount})
              </Button>
              <Button
                type='primary'
                danger
                icon={<DislikeFilled />}
                onClick={() => dislikeArticle(article._id)}
                loading={dislikeLoading}
              >
                Dislike this article ({dislikeCount})
              </Button>
            </Space>
          </div>
          <Divider />
          <div className='article-detail__main-comment'>
            {article && article.comments && (
              <Comments
                comments={article.comments}
                authUserId={authUser._id}
                loading={loading}
                loadingType={loadingType}
                elmId={elmId}
                deleteComment={deleteComment}
              />
            )}
            <Comment
              avatar={<Avatar src={authUser.avatar} alt={authUser.name} />}
              content={
                <CommentEditor
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                  submitting={submitting}
                  value={commentText}
                />
              }
            />
          </div>
          <Divider />
        </Fragment>
      )}

      <div className='article-detail__main-related-post'>related post</div>
    </div>
  );
}

export default MainContent;
