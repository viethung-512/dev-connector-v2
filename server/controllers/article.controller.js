const Article = require('../models/Article');
const User = require('../models/User');

const getAllArticle = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const response = await Article.paginate(
      { enabled: true },
      {
        page,
        limit,
        populate: [
          {
            path: 'user',
            select: ['name', 'avatar'],
          },
          {
            path: 'comments.user',
            select: ['name', 'avatar'],
          },
        ],
      }
    );

    return res.json(response);
  } catch (err) {
    console.log(err, 'get all article');
    return next({ status: 500 });
  }
};

const getAuthArticle = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const authUserId = req.user.id;

  try {
    const response = await Article.paginate(
      { user: authUserId, enabled: true },
      {
        page,
        limit,
        populate: [
          {
            path: 'user',
            select: ['name', 'avatar'],
          },
          {
            path: 'comments.user',
            select: ['name', 'avatar'],
          },
        ],
      }
    );

    return res.json(response);
  } catch (err) {
    console.log(err, 'get auth article');
    return next({ status: 500 });
  }
};

const getUserArticles = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const { id } = req.params;

  try {
    const response = await Article.paginate(
      { user: id, enabled: true },
      {
        page,
        limit,
        populate: [
          {
            path: 'user',
            select: ['name', 'avatar'],
          },
          {
            path: 'comments.user',
            select: ['name', 'avatar'],
          },
        ],
      }
    );

    return res.json(response);
  } catch (err) {
    console.log(err, 'get article by user');
    if (err.name == 'CastError') {
      return next({ status: 400, message: 'User not found' });
    }
    return next({ status: 500 });
  }
};

const getArticleById = async (req, res, next) => {
  const { id } = req.params;

  try {
    let article = await Article.findById(id);
    if (!article || !article.enabled) {
      return next({ status: 404, message: 'Article not found' });
    }

    await Article.findByIdAndUpdate(id, { views: article.views + 1 });

    article = await Article.findById(id)
      .populate('user', ['name', 'avatar'])
      .populate('comments.user', ['name', 'avatar']);

    return res.json({ article });
  } catch (err) {
    console.log(err, 'get article by id');
    if (err.name == 'CastError') {
      return next({ status: 400, message: 'Article not found' });
    }
    return next({ status: 500 });
  }
};

const createArticle = async (req, res, next) => {
  const { title, shortDescription, content, imageUrl } = req.object;
  const authUserId = req.user.id;

  try {
    const newArticle = new Article({
      title,
      mainPhoto: imageUrl,
      shortDescription,
      content,
      user: authUserId,
    });

    let article = await newArticle.save();
    article = await (
      await Article.findById(article.id).populate('user', ['name', 'avatar'])
    ).populate('comments.user', ['name', 'avatar']);

    return res.json({ article });
  } catch (err) {
    console.log(err, 'create article');
    return next({ status: 500 });
  }
};

const updateArticle = async (req, res, next) => {
  const authUserId = req.user.id;
  const { id } = req.params;

  const { title, shortDescription, content, imageUrl } = req.object;
  const updateArticle = {};

  if (title) updateArticle.title = title;
  if (shortDescription) updateArticle.shortDescription = shortDescription;
  if (content) updateArticle.content = content;
  if (imageUrl) updateArticle.mainPhoto = imageUrl;

  try {
    const user = await User.findById(authUserId);
    if (!user || !user.enabled) {
      return next({ status: 400, message: 'User not found' });
    }

    let article = await Article.findById(id);

    if (!article || !article.enabled) {
      return next({ status: 400, message: 'Article not found' });
    }

    if (article.user.toString() !== user.id) {
      return next({ status: 403, message: 'You can not update this article' });
    }

    await Article.findByIdAndUpdate(article.id, { ...updateArticle });
    article = await Article.findById(article.id)
      .populate('user', ['name', 'avatar'])
      .populate('comments.user', ['name', 'avatar']);

    return res.json({ article });
  } catch (err) {
    console.log(err, 'update article');
    if (err.name == 'CastError') {
      return next({ status: 400, message: 'Article not found' });
    }
    return next({ status: 500 });
  }
};

const deleteArticle = async (req, res, next) => {
  const authUserId = req.user.id;
  const { id } = req.params;

  try {
    const user = await User.findById(authUserId);
    if (!user || !user.enabled) {
      return next({ status: 400, message: 'User not found' });
    }

    const article = await Article.findById(id);

    if (!article || !article.enabled) {
      return next({ status: 400, message: 'Article not found' });
    }

    if (article.user.toString() !== user.id) {
      return next({ status: 403, message: 'You can not delete this article' });
    }

    await Article.findByIdAndUpdate(article.id, { enabled: false });

    return res.json({ general: { msg: 'Article deleted' } });
  } catch (err) {
    console.log(err, 'delete article');
    if (err.name == 'CastError') {
      return next({ status: 400, message: 'Article not found' });
    }
    return next({ status: 500 });
  }
};

const likeArticle = async (req, res, next) => {
  const authUserId = req.user.id;
  const { id } = req.params;

  try {
    let article = await Article.findById(id);

    if (!article || !article.enabled) {
      return next({ status: 400, message: 'Article not found' });
    }

    const isLiked = article.likes.find(
      like => like.user.toString() === authUserId
    );

    if (isLiked) {
      return next({ status: 400, message: 'You already liked this article' });
    }

    article.likes.unshift({ user: authUserId });
    article.dislikes = article.dislikes.filter(
      dislike => dislike.user.toString() !== authUserId
    );

    await article.save();

    article = await Article.findById(article.id)
      .populate('user', ['name', 'avatar'])
      .populate('comments.user', ['name', 'avatar']);

    return res.json({ article });
  } catch (err) {
    console.log(err, 'like article');
    if (err.name == 'CastError') {
      return next({ status: 400, message: 'Article not found' });
    }
    return next({ status: 500 });
  }
};

const dislikeArticle = async (req, res, next) => {
  const authUserId = req.user.id;
  const { id } = req.params;

  try {
    let article = await Article.findById(id);

    if (!article || !article.enabled) {
      return next({ status: 400, message: 'Article not found' });
    }

    const isDisliked = article.dislikes.find(
      dislike => dislike.user.toString() === authUserId
    );

    if (isDisliked) {
      return next({
        status: 400,
        message: 'You already disliked this article',
      });
    }

    article.dislikes.unshift({ user: authUserId });
    article.likes = article.likes.filter(
      like => like.user.toString() !== authUserId
    );

    await article.save();

    article = await Article.findById(article.id)
      .populate('user', ['name', 'avatar'])
      .populate('comments.user', ['name', 'avatar']);

    return res.json({ article });
  } catch (err) {
    console.log(err, 'dislike article');
    if (err.name == 'CastError') {
      return next({ status: 400, message: 'Article not found' });
    }
    return next({ status: 500 });
  }
};

const commentOnArticle = async (req, res, next) => {
  const authUserId = req.user.id;
  const { id } = req.params;
  const { text } = req.body;

  try {
    let article = await Article.findById(id);

    if (!article || !article.enabled) {
      return next({ status: 400, message: 'Article not found' });
    }

    article.comments.unshift({ user: authUserId, text });

    await article.save();

    article = await Article.findById(article.id)
      .populate('user', ['name', 'avatar'])
      .populate('comments.user', ['name', 'avatar']);

    return res.json({ article });
  } catch (err) {
    console.log(err, 'comment on article');
    if (err.name == 'CastError') {
      return next({ status: 400, message: 'Article not found' });
    }
    return next({ status: 500 });
  }
};

const deleteComment = async (req, res, next) => {
  const { articleId, commentId } = req.params;
  const authUserId = req.user.id;

  try {
    const article = await Article.findById(articleId);

    if (!article || !article.enabled) {
      return next({ status: 400, message: 'Article not found' });
    }

    if (!article.comments.find(cmt => cmt._id.toString() === commentId)) {
      return next({ status: 400, message: 'Comment not found' });
    }

    if (!article.comments.find(cmt => cmt.user.toString() === authUserId)) {
      return next({ status: 403, message: 'You can not delete this comment' });
    }

    article.comments = article.comments.filter(
      cmt => cmt._id.toString() !== commentId
    );

    await article.save();

    return res.json({ general: { msg: 'Comment deleted' } });
  } catch (err) {
    console.log(err, 'comment on article');
    if (err.name == 'CastError') {
      return next({ status: 400, message: 'Article or Comment not found' });
    }
    return next({ status: 500 });
  }
};

module.exports = {
  getAllArticle,
  getAuthArticle,
  getUserArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  likeArticle,
  dislikeArticle,
  commentOnArticle,
  deleteComment,
};
