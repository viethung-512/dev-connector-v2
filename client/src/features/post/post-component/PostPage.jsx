import React, { useEffect } from 'react';
import './style.css';
import { useSelector, useDispatch } from 'react-redux';
import Header from './Header';
import Posts from './Posts';
import {
  getPosts,
  createPost,
  likePost,
  unlikePost,
  deletePost,
} from '../post.actions';
import AddItem from '../AddItem';
import { actionTypes } from '../../../app/utils/config';

function PostPage(props) {
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.post);
  const { user: authUser } = useSelector(state => state.auth);
  const { loading, type } = useSelector(state => state.async);

  useEffect(() => {
    dispatch(getPosts());

    // eslint-disable-next-line
  }, []);

  const { post: postAction } = actionTypes;

  const loadingPosts = type === postAction.GET_POSTS ? loading : false;
  const postPageLoading = loadingPosts;

  const handleCreatePost = post => {
    dispatch(createPost(post));
  };

  const handleLikePost = postId => dispatch(likePost(postId));
  const handleUnlikePost = postId => dispatch(unlikePost(postId));
  const handleDeletePost = postId => dispatch(deletePost(postId));

  return (
    <div className='post'>
      <Header />
      <AddItem
        placeholder='Create a post'
        title='Say Something...'
        onSubmit={handleCreatePost}
        createLoadingTypes={[postAction.CREATE_POST]}
      />
      <Posts
        posts={posts}
        postPageLoading={postPageLoading}
        authUser={authUser}
        likePost={handleLikePost}
        unlikePost={handleUnlikePost}
        deletePost={handleDeletePost}
        likeLoadingTypes={[postAction.LIKE_POST]}
        unlikeLoadingTypes={[postAction.UNLIKE_POST]}
        deleteLoadingTypes={[postAction.DELETE_POST]}
      />
    </div>
  );
}

export default PostPage;
