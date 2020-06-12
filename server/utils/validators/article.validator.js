const { check } = require('express-validator');
const { isEmpty } = require('../helper');
const { validateMessage } = require('../constants');

const checkArticleRequiredFields = async (req, res, next) => {
  const { title, shortDescription, content, imageUrl } = req.object;
  const error = {};

  if (!title || isEmpty(title))
    error.title = { msg: validateMessage.REQUIRED_EXIST };
  if (!shortDescription || isEmpty(shortDescription))
    error.shortDescription = { msg: validateMessage.REQUIRED_EXIST };
  if (!content || isEmpty(content))
    error.content = { msg: validateMessage.REQUIRED_EXIST };
  if (!imageUrl || isEmpty(imageUrl))
    error.mainPhoto = { msg: validateMessage.REQUIRED_EXIST };

  if (Object.keys(error).length > 0) {
    return res.status(400).json({ error });
  }

  return next();
};

const checkCommentRequiredFields = [
  check('text').not().isEmpty().withMessage(validateMessage.REQUIRED_EXIST),
];

module.exports = { checkArticleRequiredFields, checkCommentRequiredFields };
