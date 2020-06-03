const { check } = require('express-validator');
const { validateMessage } = require('../constants');

const checkLoginRequiredField = [
  check('email')
    .not()
    .isEmpty()
    .withMessage(validateMessage.REQUIRED_EXIST)
    .isEmail()
    .withMessage(validateMessage.REQUIRED_EMAIL),
  check('password').not().isEmpty().withMessage(validateMessage.REQUIRED_EXIST),
];

const checkRegisterRequiredField = [
  check('name').not().isEmpty().withMessage(validateMessage.REQUIRED_EXIST),
  check('email')
    .not()
    .isEmpty()
    .withMessage(validateMessage.REQUIRED_EXIST)
    .isEmail()
    .withMessage(validateMessage.REQUIRED_EMAIL),
  check('password')
    .isLength({ min: 6 })
    .withMessage(validateMessage.REQUIRED_MIN_PASSWORD_LENGTH),
  check('confirmPassword').custom((value, { req }) => {
    if (!value) {
      throw new Error(validateMessage.REQUIRED_EXIST);
    }

    if (value !== req.body.password) {
      throw new Error(validateMessage.REQUIRED_MATCH_PASSWORD);
    }

    return true;
  }),
];

module.exports = {
  checkLoginRequiredField,
  checkRegisterRequiredField,
};
