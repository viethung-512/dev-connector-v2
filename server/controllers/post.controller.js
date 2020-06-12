const User = require('../models/User');
const Post = require('../models/Post');

const getAllPost = async (req, res, next) => {
  try {
    let posts = await Post.find()
      .sort({ date: -1 })
      .populate('user', ['name', 'avatar'])
      .populate('comments.user', ['name', 'avatar']);
    posts = posts.filter(post => post.enabled);

    return res.json({ posts });
  } catch (err) {
    console.error(err, 'get all post');
    return next({ status: 500 });
  }
};

const getPostById = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId)
      .populate('user', ['name', 'avatar'])
      .populate('comments.user', ['name', 'avatar']);

    if (!post || !post.enabled) {
      return next({ status: 404, message: 'Post not found' });
    }

    return res.json({ post });
  } catch (err) {
    if (err.name == 'CastError') {
      return next({ status: 404, message: 'Post not found' });
    }
    console.error(err, 'get post by id');
    return next({ status: 500 });
  }
};

const createPost = async (req, res, next) => {
  const authUserId = req.user.id;
  try {
    const user = await User.findById(authUserId).select('-password');
    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: authUserId,
    });

    let post = await newPost.save();
    post = await Post.findById(post.id)
      .populate('user', ['name', 'avatar'])
      .populate('comments.user', ['name', 'avatar']);

    return res.json({ post });
  } catch (err) {
    console.error(err, 'create post');
    return next({ status: 500 });
  }
};

const deletePost = async (req, res, next) => {
  const authUserId = req.user.id;
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);

    if (!post || !post.enabled) {
      return next({ status: 400, message: 'Post not found' });
    }

    if (post.user.toString() !== authUserId) {
      return next({ status: 403, message: 'User not authorized' });
    }

    await Post.findByIdAndUpdate(postId, { enabled: false });

    return res.json({
      general: { mgs: 'Post removed' },
    });
  } catch (err) {
    if (err.name == 'CastError') {
      return next({ status: 400, message: 'Post not found' });
    }
    console.error(err, 'delete post');
    return next({ status: 500 });
  }
};

const likePost = async (req, res, next) => {
  const authUserId = req.user.id;
  const { postId } = req.params;

  try {
    let post = await Post.findById(postId);

    if (post.likes.find(like => like.user.toString() === authUserId)) {
      return next({ status: 400, message: 'Post already liked' });
    }

    post.likes.unshift({ user: authUserId });

    await post.save();

    post = await Post.findById(post.id)
      .populate('user', ['name', 'avatar'])
      .populate('comments.user', ['name', 'avatar']);

    return res.json({ post });
  } catch (err) {
    if (err.name == 'CastError') {
      return next({ status: 400, message: 'Post not found' });
    }
    console.error(err, 'like post');
    return next({ status: 500 });
  }
};

const unlikePost = async (req, res, next) => {
  const authUserId = req.user.id;
  const { postId } = req.params;

  try {
    let post = await Post.findById(postId);

    if (!post.likes.find(like => like.user.toString() === authUserId)) {
      return next({ status: 400, message: "Post haven't been liked yet" });
    }

    const newLikes = post.likes.filter(
      like => like.user.toString() !== authUserId
    );
    post.likes = newLikes;

    await post.save();

    post = await Post.findById(post.id)
      .populate('user', ['name', 'avatar'])
      .populate('comments.user', ['name', 'avatar']);

    return res.json({ post });
  } catch (err) {
    if (err.name == 'CastError') {
      return next({ status: 400, message: 'Post not found' });
    }
    console.error(err, 'unlike post');
    return next({ status: 500 });
  }
};

const commentOnPost = async (req, res, next) => {
  const authUserId = req.user.id;
  const { postId } = req.params;

  try {
    const user = await User.findById(authUserId);
    let post = await Post.findById(postId);

    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: authUserId,
    };

    post.comments.unshift(newComment);

    await post.save();

    post = await Post.findById(post.id)
      .populate('user', ['name', 'avatar'])
      .populate('comments.user', ['name', 'avatar']);

    return res.json({ post });
  } catch (err) {
    console.error(err, 'comment on post');
    return next({ status: 500 });
  }
};

const deleteComment = async (req, res, next) => {
  const authUserId = req.user.id;
  const { postId, commentId } = req.params;
  try {
    let post = await Post.findById(postId);

    if (!post || !post.enabled) {
      return next({ status: 400, message: 'Post not found' });
    }

    const comment = post.comments.find(cmt => cmt.id.toString() === commentId);
    if (!comment) {
      return next({ status: 400, message: "Comment does' exist" });
    }

    if (comment.user.toString() !== authUserId) {
      return next({ status: 403, message: 'User not authorized' });
    }

    const comments = post.comments.filter(
      cmt => cmt.id.toString() !== commentId
    );
    post.comments = comments;

    await post.save();

    post = await Post.findById(post.id)
      .populate('user', ['name', 'avatar'])
      .populate('comments.user', ['name', 'avatar']);

    return res.json({ post });
  } catch (err) {
    if (err.name == 'CastError') {
      return next({ status: 400, message: 'Post not found' });
    }
    console.error(err, 'delete comment');
    return next({ status: 500 });
  }
};

module.exports = {
  getAllPost,
  getPostById,
  createPost,
  deletePost,
  likePost,
  unlikePost,
  commentOnPost,
  deleteComment,
};
