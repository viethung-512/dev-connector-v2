import React, { useState, Fragment } from 'react';
import { Divider, Comment, Avatar, Space } from 'antd';
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
import Image from '../../../app/layout/common/Image';
import LoadingButton from '../../../app/layout/common/loading/LoadingButton';
import RelatedArticles from '../Articles/RelatedArticles/RelatedArticles';

function MainContent({
  article,
  submitComment,
  authUser,
  authenticated,
  deleteComment,
  likeCount,
  dislikeCount,
  likeArticle,
  dislikeArticle,
  commentLoadingTypes,
  likeLoadingTypes,
  dislikeLoadingTypes,
  deleteCommentLoadingTypes,
  relatedArticle,
}) {
  const [commentText, setCommentText] = useState('');

  const handleChange = e => setCommentText(e.target.value);
  const handleSubmit = e => {
    e.preventDefault();
    submitComment(commentText);
    setCommentText('');
  };

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
              <LoadingButton
                className='btn btn--success'
                type='primary'
                icon={<LikeFilled />}
                onClick={() => likeArticle(article._id)}
                loadingTypes={likeLoadingTypes}
              >
                Like this article ({likeCount})
              </LoadingButton>
              <LoadingButton
                loadingTypes={dislikeLoadingTypes}
                type='primary'
                danger
                icon={<DislikeFilled />}
                onClick={() => dislikeArticle(article._id)}
              >
                Dislike this article ({dislikeCount})
              </LoadingButton>
            </Space>
          </div>
          <Divider />
          <div className='article-detail__main-comment'>
            {article && article.comments && (
              <Comments
                comments={article.comments}
                authUserId={authUser._id}
                deleteComment={deleteComment}
                deleteCommentLoadingTypes={deleteCommentLoadingTypes}
              />
            )}
            <Comment
              avatar={<Avatar src={authUser.avatar} alt={authUser.name} />}
              content={
                <CommentEditor
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                  value={commentText}
                  loadingTypes={commentLoadingTypes}
                />
              }
            />
          </div>
          <Divider />
        </Fragment>
      )}

      {relatedArticle.length > 0 && (
        <Fragment>
          <Divider />
          <div className='article-detail__main-related-post'>
            <RelatedArticles articles={relatedArticle} deviceType='desktop' />
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default MainContent;
