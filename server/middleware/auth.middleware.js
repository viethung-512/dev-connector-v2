const jwt = require('jsonwebtoken');
const config = require('config');
const { responseMessage } = require('../utils/constants');

const auth = async (req, res, next) => {
  let token;
  const jwtSecret = config.get('jwtSecret');

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split('Bearer ')[1];
  } else {
    return next({ status: 401 });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    const { user } = decoded;

    req.user = user;
    return next();
  } catch (err) {
    console.log(err.name);
    if (err.name === 'TokenExpiredError') {
      return next({ status: 401, message: responseMessage.TOKEN_EXPIRED });
    }

    if (err.name === 'JsonWebTokenError') {
      return next({ status: 401, message: responseMessage.TOKEN_INVALID });
    }
    return next({ status: 500 });
  }
};

module.exports = { auth };
