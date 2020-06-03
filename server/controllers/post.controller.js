const User = require('../models/User');
const Post = require('../models/Post');

const getAllPost = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    return res.json({ posts });
  } catch (err) {
    console.error(err.name);
    return next({ status: 500 });
  }
};

const getPostById = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);

    if (!post) {
      return next({ status: 404, message: 'Post not found' });
    }

    return res.json({ post });
  } catch (err) {
    if (err.name == 'CastError') {
      return next({ status: 404, message: 'Post not found' });
    }
    console.error(err.name);
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

    const post = await newPost.save();

    return res.json({ post });
  } catch (err) {
    console.error(err.name);
    return next({ status: 500 });
  }
};

const deletePost = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);

    if (!post) {
      return next({ status: 400, message: 'Post not found' });
    }

    if (post.user.toString() !== req.user.id) {
      return next({ status: 403, message: 'User not authorized' });
    }

    await post.remove();

    return res.json({
      general: { mgs: 'Post removed' },
    });
  } catch (err) {
    if (err.name == 'CastError') {
      return next({ status: 400, message: 'Post not found' });
    }
    console.error(err.name);
    return next({ status: 500 });
  }
};

const likePost = async (req, res, next) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);

    if (post.likes.find(like => like.user.toString() === req.user.id)) {
      return next({ status: 400, message: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    return res.json({ post });
  } catch (err) {
    if (err.name == 'CastError') {
      return next({ status: 400, message: 'Post not found' });
    }
    console.error(err.name);
    return next({ status: 500 });
  }
};

const unlikePost = async (req, res, next) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);

    if (!post.likes.find(like => like.user.toString() === req.user.id)) {
      return next({ status: 400, message: "Post haven't been liked yet" });
    }

    const newLikes = post.likes.filter(
      like => like.user.toString() !== req.user.id
    );
    post.likes = newLikes;

    await post.save();

    return res.json({ post });
  } catch (err) {
    if (err.name == 'CastError') {
      return next({ status: 400, message: 'Post not found' });
    }
    console.error(err.name);
    return next({ status: 500 });
  }
};

const commentOnPost = async (req, res, next) => {
  const userId = req.user.id;
  const { postId } = req.params;

  try {
    const user = await User.findById(userId).select('-password');
    const post = await Post.findById(postId);

    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: userId,
    };

    post.comments.unshift(newComment);

    await post.save();

    return res.json({ post });
  } catch (err) {
    console.error(err.name);
    return next({ status: 500 });
  }
};

const deleteComment = async (req, res, next) => {
  const { postId, commentId } = req.params;
  try {
    const post = await Post.findById(postId);

    if (!post) {
      return next({ status: 400, message: 'Post not found' });
    }

    const comment = post.comments.find(cmt => cmt.id.toString() === commentId);
    if (!comment) {
      return next({ status: 400, message: "Comment does' exist" });
    }

    if (comment.user.toString() !== req.user.id) {
      return next({ status: 403, message: 'User not authorized' });
    }

    const comments = post.comments.filter(
      cmt => cmt.id.toString() !== commentId
    );
    post.comments = comments;

    await post.save();

    return res.json({ post });
  } catch (err) {
    if (err.name == 'CastError') {
      return next({ status: 400, message: 'Post not found' });
    }
    console.error(err.name);
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
