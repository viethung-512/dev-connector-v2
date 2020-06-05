import React from 'react';
import { List } from 'antd';
import { LoadingIcon } from '../../../app/layout/common/Icons';
import Item from '../Item';

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
                loadingType === 'likePost' && loadingElm === post._id
                  ? loading
                  : false
              }
              unlikeLoading={
                loadingType === 'unlikePost' && loadingElm === post._id
                  ? loading
                  : false
              }
              deleteLoading={
                loadingType === 'deletePost' && loadingElm === post._id
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
