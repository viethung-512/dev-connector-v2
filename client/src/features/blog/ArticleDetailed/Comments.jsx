import React, { Fragment } from 'react';
import { List, Comment, Typography } from 'antd';
import { formatDate } from '../../../app/utils/helper';
import { DeleteOutlined } from '@ant-design/icons';
import LoadingButton from '../../../app/layout/common/loading/LoadingButton';

const { Text } = Typography;

function Comments({
  comments,
  authUserId,
  deleteComment,
  deleteCommentLoadingTypes,
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
                        <LoadingButton
                          loadingTypes={deleteCommentLoadingTypes}
                          loadingElm={cmt._id}
                          icon={<DeleteOutlined />}
                          type='link'
                          danger
                          onClick={() => deleteComment(cmt._id)}
                        >
                          Delete comment
                        </LoadingButton>,
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
