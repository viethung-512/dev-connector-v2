import React, { Fragment } from 'react';
import { List, Comment, Button, Typography } from 'antd';
import { formatDate } from '../../../app/utils/helper';
import { DeleteOutlined } from '@ant-design/icons';
import { actionTypes } from '../../../app/utils/config';

const { Text } = Typography;

function Comments({
  comments,
  authUserId,
  loading,
  loadingType,
  elmId,
  deleteComment,
}) {
  return (
    <Fragment>
      {comments.length > 0 ? (
        <List
          className='comment-list'
          header={`${comments.length} replies`}
          itemLayout='horizontal'
          dataSource={comments}
          renderItem={cmt => (
            <li>
              <Comment
                actions={
                  cmt.user._id === authUserId
                    ? [
                        <Button
                          icon={<DeleteOutlined />}
                          type='link'
                          danger
                          loading={
                            loadingType === actionTypes.blog.DELETE_COMMENT &&
                            elmId === cmt._id
                              ? loading
                              : false
                          }
                          onClick={() => deleteComment(cmt._id)}
                        >
                          Delete comment
                        </Button>,
                      ]
                    : []
                }
                author={cmt.user.name}
                avatar={cmt.user.avatar}
                content={cmt.text}
                datetime={formatDate(cmt.date)}
              />
            </li>
          )}
        />
      ) : (
        <Text>This article doesn't have any comment</Text>
      )}
    </Fragment>
  );
}

export default Comments;
