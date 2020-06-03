const { check } = require('express-validator');
const { validateMessage } = require('../constants');

const checkProfileRequiredFields = [
  check('status').not().isEmpty().withMessage(validateMessage.REQUIRED_EXIST),
  check('skills').not().isEmpty().withMessage(validateMessage.REQUIRED_EXIST),
];

const checkExperienceRequiredFields = [
  check('title').not().isEmpty().withMessage(validateMessage.REQUIRED_EXIST),
  check('company').not().isEmpty().withMessage(validateMessage.REQUIRED_EXIST),
  check('from').not().isEmpty().withMessage(validateMessage.REQUIRED_EXIST),
];

const checkEducationRequiredFields = [
  check('school').not().isEmpty().withMessage(validateMessage.REQUIRED_EXIST),
  check('degree').not().isEmpty().withMessage(validateMessage.REQUIRED_EXIST),
  check('fieldOfStudy')
    .not()
    .isEmpty()
    .withMessage(validateMessage.REQUIRED_EXIST),
  check('from').not().isEmpty().withMessage(validateMessage.REQUIRED_EXIST),
];

module.exports = {
  checkProfileRequiredFields,
  checkExperienceRequiredFields,
  checkEducationRequiredFields,
};
