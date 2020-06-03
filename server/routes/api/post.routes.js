const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { auth } = require('../../middleware/auth.middleware');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

/**
 * @route   POST api/posts
 * @desc    Create a post
 * @access  Private
 */
router.post(
  '/',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const userId = req.user.id;

      const user = await User.findById(userId).select('-password');
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: userId,
      });

      const post = await newPost.save();

      return res.json(post);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server error');
    }
  }
);

/**
 * @route   GET api/posts
 * @desc    Get all posts
 * @access  Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    return res.json(posts);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

/**
 * @route   GET api/posts/:id
 * @desc    Get post by id
 * @access  Private
 */
router.get('/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    return res.json(post);
  } catch (err) {
    if (err.name == 'CastError') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

/**
 * @route   DELETE api/posts/:id
 * @desc    Delete a post by id
 * @access  Private
 */
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    return res.json({ mgs: 'Post removed' });
  } catch (err) {
    if (err.name == 'CastError') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

/**
 * @route   PUT api/posts/like/:id
 * @desc    Like a post
 * @access  Private
 */
router.put('/like/:id', auth, async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    // check if the post has already liked
    if (post.likes.find(like => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    return res.json(post);
  } catch (err) {
    if (err.name == 'CastError') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

/**
 * @route   PUT api/posts/unlike/:id
 * @desc    Like a post
 * @access  Private
 */
router.put('/unlike/:id', auth, async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    // check if the post haven't liked
    if (!post.likes.find(like => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: "Post haven't been liked yet" });
    }

    const newLikes = post.likes.filter(
      like => like.user.toString() !== req.user.id
    );
    post.likes = newLikes;

    await post.save();

    return res.json(post);
  } catch (err) {
    if (err.name == 'CastError') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

/**
 * @route   POST api/posts/comment/:id
 * @desc    Comment on a post
 * @access  Private
 */
router.post(
  '/comment/:id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const userId = req.user.id;
      const postId = req.params.id;

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

      return res.json(post);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server error');
    }
  }
);

/**
 * @route   DELETE api/posts/comment/:postId/:commentId
 * @desc    Delete a comment on post
 * @access  Private
 */
router.delete('/comment/:postId/:commentId', auth, async (req, res) => {
  const { postId, commentId } = req.params;
  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    const comment = post.comments.find(cmt => cmt.id.toString() === commentId);
    if (!comment) {
      return res.status(404).json({ msg: "Comment does' exist" });
    }

    // check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    const comments = post.comments.filter(
      cmt => cmt.id.toString() !== commentId
    );
    post.comments = comments;

    await post.save();

    return res.json(post);
  } catch (err) {
    if (err.name == 'CastError') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

module.exports = router;
