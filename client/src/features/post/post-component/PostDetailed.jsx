import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AddItem from '../AddItem';
import Item from '../Item';
import { getPost, commentOnPost, deleteComment } from '../post.actions';
import { Divider, PageHeader } from 'antd';
import Comments from '../comment/Comments';
import { actionTypes } from '../../../app/utils/config';
import LoadingGrid from '../../../app/layout/common/loading/LoadingGrid';
import { breadcrumbRenderItem } from '../../../app/utils/helper';

function PostDetailed(props) {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const post = useSelector(state => state.post.current);
  const { user: authUser } = useSelector(state => state.auth);
  const { loading, type, elmId } = useSelector(state => state.async);

  const postAction = actionTypes.post;

  useEffect(() => {
    if (postId) {
      dispatch(getPost(postId));
    }

    return () => {};

    // eslint-disable-next-line
  }, [postId]);

  const handleComment = comment => dispatch(commentOnPost(comment, postId));
  const handleDeleteComment = commentId =>
    dispatch(deleteComment(commentId, postId));

  const routes = [
    {
      path: 'dashboard',
      breadcrumbName: 'Dashboard',
    },
    {
      path: 'posts',
      breadcrumbName: 'Posts',
    },
    {
      breadcrumbName: 'Post Detail',
    },
  ];

  return (
    <div className='post'>
      <LoadingGrid loadingTypes={[postAction.GET_POST]}>
        <PageHeader
          style={{ paddingLeft: 0, paddingRight: 0 }}
          breadcrumb={{ itemRender: breadcrumbRenderItem, routes }}
        />
        {post && authUser && (
          <Item
            item={post}
            onlyShowDescription={true}
            type='post'
            authUser={authUser}
          />
        )}
        <Divider />
        <AddItem
          placeholder='Comment on this post'
          title='Leave A Comment'
          onSubmit={handleComment}
          createLoadingTypes={[postAction.COMMENT_ON_POST]}
        />
        {post && (
          <Comments
            comments={post.comments}
            authUser={authUser}
            deleteComment={handleDeleteComment}
            loading={loading}
            loadingType={type}
            loadingElm={elmId}
            likeLoadingTypes={[postAction.LIKE_POST]}
            unlikeLoadingTypes={[postAction.UNLIKE_POST]}
            deleteLoadingTypes={[postAction.DELETE_COMMENT]}
          />
        )}
      </LoadingGrid>
    </div>
  );
}

export default PostDetailed;
