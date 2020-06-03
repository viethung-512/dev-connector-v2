const config = require('config');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');

const generateToken = payload => {
  const jwtSecret = config.get('jwtSecret');
  const expiresIn = '1h';

  const token = jwt.sign(payload, jwtSecret, { expiresIn });

  return token;
};

const generateDefaultAvatar = email => {
  const avatar = gravatar.url(email, {
    s: '200',
    r: 'pg',
    d: 'mm',
  });

  return avatar;
};

module.exports = { generateToken, generateDefaultAvatar };
