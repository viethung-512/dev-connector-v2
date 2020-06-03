const express = require('express');
const router = express.Router();

const { auth } = require('../../middleware/auth.middleware');
const {
  checkPostRequiredFields,
  checkCommentRequiredFields,
} = require('../../utils/validators/post.validator');
const validate = require('../../utils/validators/index');
const {
  createPost,
  getAllPost,
  getPostById,
  deletePost,
  likePost,
  unlikePost,
  commentOnPost,
  deleteComment,
} = require('../../controllers/post.controller');

router.post('/', auth, checkPostRequiredFields, validate, createPost);
router.get('/', auth, getAllPost);
router.get('/:postId', auth, getPostById);
router.delete('/:postId', auth, deletePost);
router.put('/like/:postId', auth, likePost);
router.put('/unlike/:postId', auth, unlikePost);
router.post(
  '/comment/:postId',
  auth,
  checkCommentRequiredFields,
  validate,
  commentOnPost
);
router.delete('/comment/:postId/:commentId', auth, deleteComment);

module.exports = router;
