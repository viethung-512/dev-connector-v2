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
  likeLoadingTypes,
  unlikeLoadingTypes,
  deleteLoadingTypes,
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
              likeLoadingTypes={likeLoadingTypes}
              unlikeLoadingTypes={unlikeLoadingTypes}
              deleteLoadingTypes={deleteLoadingTypes}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default Posts;
