import React from 'react';
import { List } from 'antd';
import Item from '../Item';

function Comments({
  comments,
  authUser,
  deleteComment,
  loading,
  loadingType,
  loadingElm,
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
              deleteLoading={
                loadingType === 'deleteComment' && loadingElm === comment._id
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

export default Comments;
