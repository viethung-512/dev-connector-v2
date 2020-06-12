const firebaseAdmin = require('../utils/firebaseAdmin');
const { responseMessage } = require('../utils/constants');

const User = require('../models/User');

const auth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split('Bearer ')[1];
  } else {
    return next({ status: 401 });
  }
  try {
    const decoded = await firebaseAdmin.auth().verifyIdToken(token);

    const user = await User.findOne({ uid: decoded.uid });

    const { id, uid, name, email, avatar } = user;

    req.user = { id, uid, name, email, avatar };
    return next();
  } catch (err) {
    console.log(err.name, 'err name');
    if (err.name === 'TokenExpiredError') {
      return next({ status: 401, message: responseMessage.TOKEN_EXPIRED });
    }

    if (err.name === 'JsonWebTokenError') {
      return next({ status: 401, message: responseMessage.TOKEN_INVALID });
    }
    return next({ status: 500, message: 'Error while verifying token' });
  }
};

module.exports = { auth };
