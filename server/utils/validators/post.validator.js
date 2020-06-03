const { check } = require('express-validator');
const { validateMessage } = require('../constants');

const checkPostRequiredFields = [
  check('text').not().isEmpty().withMessage(validateMessage.REQUIRED_EXIST),
];

const checkCommentRequiredFields = [
  check('text').not().isEmpty().withMessage(validateMessage.REQUIRED_EXIST),
];

module.exports = { checkPostRequiredFields, checkCommentRequiredFields };
