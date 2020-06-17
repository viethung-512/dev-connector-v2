const express = require('express');
const router = express.Router();

const { auth } = require('../../middleware/auth.middleware');
const { collectObjectField } = require('../../middleware/core.middleware');
const {
  checkArticleRequiredFields,
  checkCommentRequiredFields,
} = require('../../utils/validators/article.validator');
const validate = require('../../utils/validators/index');
const {
  getAllArticle,
  getAuthArticle,
  getMostViewArticle,
  getRelatedArticles,
  getUserArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  likeArticle,
  dislikeArticle,
  commentOnArticle,
  deleteComment,
} = require('../../controllers/article.controller');

router.get('/', getAllArticle);
router.get('/me', auth, getAuthArticle);
router.get('/user/:id', getUserArticles);
router.get('/most-view', getMostViewArticle);
router.get('/related/:articleId', getRelatedArticles);
router.get('/:id', getArticleById);
router.post(
  '/',
  auth,
  collectObjectField,
  checkArticleRequiredFields,
  createArticle
);
router.post('/:id', auth, collectObjectField, updateArticle);
router.put('/:id', auth, deleteArticle);
router.put('/like/:id', auth, likeArticle);
router.put('/dislike/:id', auth, dislikeArticle);
router.post(
  '/comment/:id',
  auth,
  checkCommentRequiredFields,
  validate,
  commentOnArticle
);
router.delete('/comment/:articleId/:commentId', auth, deleteComment);

module.exports = router;
