import React from 'react';
import { List } from 'antd';
import { LoadingIcon } from '../../../app/layout/common/Icons';
import Item from '../Item';
import { actionTypes } from '../../../app/utils/config';

function Posts({
  posts,
  postPageLoading,
  authUser,
  likePost,
  unlikePost,
  deletePost,
  loading,
  loadingType,
  loadingElm,
}) {
  const { post: postAction } = actionTypes;

  return (
    <div className='postpage__posts'>
      <List
        loading={{ indicator: LoadingIcon, spinning: postPageLoading }}
        dataSource={posts}
        bordered={false}
        renderItem={post => (
          <List.Item>
            <Item
              item={post}
              type='post'
              authUser={authUser}
              likePost={likePost}
              unlikePost={unlikePost}
              deletePost={deletePost}
              likeLoading={
                loadingType === postAction.LIKE_POST && loadingElm === post._id
                  ? loading
                  : false
              }
              unlikeLoading={
                loadingType === postAction.UNLIKE_POST &&
                loadingElm === post._id
                  ? loading
                  : false
              }
              deleteLoading={
                loadingType === postAction.DELETE_POST &&
                loadingElm === post._id
                  ? loading
                  : false
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default Posts;
