import React from 'react';
import { List } from 'antd';
import Item from '../Item';

function Comments({
  comments,
  authUser,
  deleteComment,
  likeLoadingTypes,
  unlikeLoadingTypes,
  deleteLoadingTypes,
}) {
  return (
    <div className='postpage__posts'>
      <List
        dataSource={comments}
        bordered={false}
        renderItem={comment => (
          <List.Item>
            <Item
              item={comment}
              type='comment'
              authUser={authUser}
              deleteComment={deleteComment}
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

export default Comments;
