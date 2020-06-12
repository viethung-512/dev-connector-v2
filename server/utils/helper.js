const config = require('config');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');

const firebaseConfig = require('../../config/firebaseConfig');

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

const generateImageFileName = imageFileName => {
  const imageExtension = imageFileName.split('.')[
    imageFileName.split('.').length - 1
  ];
  const randomString = Math.round(Math.random() * 1000000000000).toString();

  return `${randomString}.${imageExtension}`;
};

const getDownloadUrl = (path, imageFilename) => {
  const folder = path.replace('/', '%2F');
  const downloadUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${folder}%2F${imageFilename}?alt=media`;

  return downloadUrl;
};

const prepareProfileData = body => {
  const { skills, youtube, facebook, twitter, instagram, linkedin } = body;

  // Build profile object
  const profileFields = { ...body };

  if (skills) {
    profileFields.skills = skills.split(',').map(skill => skill.trim());
  }

  // Build social object
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;

  return profileFields;
};

const isEmpty = string => string.trim(' ') === '';

module.exports = {
  generateToken,
  generateDefaultAvatar,
  prepareProfileData,
  getDownloadUrl,
  generateImageFileName,
  isEmpty,
};
