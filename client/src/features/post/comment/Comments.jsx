import React from 'react';
import { List } from 'antd';
import Item from '../Item';
import { actionTypes } from '../../../app/utils/config';

function Comments({
  comments,
  authUser,
  deleteComment,
  loading,
  loadingType,
  loadingElm,
}) {
  const { post: postAction } = actionTypes;

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
                loadingType === postAction.DELETE_COMMENT &&
                loadingElm === comment._id
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
