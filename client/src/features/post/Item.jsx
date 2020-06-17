import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Card, Typography, Space, Button } from 'antd';
import {
  DeleteOutlined,
  HeartOutlined,
  HeartFilled,
  MessageOutlined,
} from '@ant-design/icons';
import { formatDate } from '../../app/utils/helper';
import { defaultName } from '../../app/utils/config';

import Avatar from '../../app/layout/common/Avatar';
import LoadingButton from '../../app/layout/common/loading/LoadingButton';

const { Text, Paragraph } = Typography;

function Item({
  item,
  type,
  authUser,
  onlyShowDescription = false,
  likePost,
  unlikePost,
  deletePost,
  deleteComment,
  deleteLoadingTypes,
  likeLoadingTypes,
  unlikeLoadingTypes,
}) {
  const isOwn = item.user._id === authUser._id;
  const isLiked =
    type === 'post' && item.likes.find(like => like.user === authUser._id);

  const handleLikePost = () => likePost(item._id);
  const handleUnlikePost = () => unlikePost(item._id);
  const handleDeletePost = () => deletePost(item._id);
  const handleDeleteComment = () => deleteComment(item._id);

  return (
    <Card
      bodyStyle={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
      style={{ width: '100%' }}
    >
      <Card.Meta
        className='post-item'
        avatar={
          <div className='post-item__avatar'>
            <Avatar
              src={item.user.avatar}
              size={100}
              className='avatar__image'
            />
            <Link to={isOwn ? '/profile/me' : `/profile/${item.user._id}`}>
              <Text level={4} className='post-item__title'>
                {item.user.name || defaultName.USER}
              </Text>
            </Link>
          </div>
        }
        description={
          <div className='post-item-container'>
            <div className='post-item__description'>
              <Paragraph
                style={{ fontSize: 16 }}
                ellipsis={
                  onlyShowDescription
                    ? null
                    : {
                        rows: 4,
                      }
                }
              >
                {item.text}
              </Paragraph>
              {!onlyShowDescription && (
                <Text type='secondary'>Posted on {formatDate(item.date)}</Text>
              )}
            </div>
            {!onlyShowDescription && (
              <div className='post-item__actions'>
                <Space>
                  {type === 'post' && (
                    <Fragment>
                      <LoadingButton
                        loadingElm={item._id}
                        loadingTypes={
                          isLiked ? unlikeLoadingTypes : likeLoadingTypes
                        }
                        size='large'
                        type='link'
                        icon={isLiked ? <HeartFilled /> : <HeartOutlined />}
                        onClick={
                          type === 'post'
                            ? isLiked
                              ? handleUnlikePost
                              : handleLikePost
                            : null
                        }
                      >
                        {' '}
                        {item.likes.length === 0 ? '' : item.likes.length}
                      </LoadingButton>
                      <Link to={`/posts/${item._id}`}>
                        <Button
                          type='link'
                          size='large'
                          icon={<MessageOutlined />}
                        >
                          {' '}
                          {item.comments.length}
                        </Button>
                      </Link>
                    </Fragment>
                  )}

                  {isOwn && (
                    <LoadingButton
                      loadingTypes={deleteLoadingTypes}
                      loadingElm={item._id}
                      size='large'
                      danger
                      type='link'
                      icon={<DeleteOutlined />}
                      onClick={
                        type === 'post' ? handleDeletePost : handleDeleteComment
                      }
                    />
                  )}
                </Space>
              </div>
            )}
          </div>
        }
      />
    </Card>
  );
}

export default Item;
