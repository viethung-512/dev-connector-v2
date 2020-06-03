const validateMessage = {
  REQUIRED_EXIST: 'Must not be empty',
  REQUIRED_EMAIL: 'Email is not valid',
  REQUIRED_MATCH_PASSWORD: 'Password does not match',
  REQUIRED_MIN_PASSWORD_LENGTH: 'Password must at least 6 character',
};

const responseMessage = {
  STATUS_400: 'Bad request',
  STATUS_401: 'Unauthorized',
  STATUS_403: 'Forbidden, Unauthorized',
  STATUS_404: 'Not found',
  STATUS_500: 'Server error',
  TOKEN_EXPIRED: 'Token has been expired, unauthorized',
  TOKEN_INVALID: 'Token invalid, please try again',
};

module.exports = { validateMessage, responseMessage };
