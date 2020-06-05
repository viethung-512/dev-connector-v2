const express = require('express');
const router = express.Router();

const educationRoutes = require('./education.routes');
const experienceRoutes = require('./experience.routes');

const { collectObjectField } = require('../../middleware/core.middleware');
const { auth } = require('../../middleware/auth.middleware');
const {
  checkProfileRequiredFields,
} = require('../../utils/validators/profile.validator');
const validate = require('../../utils/validators/index');
const {
  getAllProfile,
  getAuthProfile,
  getProfileByUser,
  getGithubRepositories,
  createUpdateProfile,
  deleteProfile,
  uploadProfileImage,
} = require('../../controllers/profile.controller');

router.use('/education', educationRoutes);
router.use('/experience', experienceRoutes);

router.get('/me', auth, getAuthProfile);
router.post(
  '/',
  auth,
  checkProfileRequiredFields,
  validate,
  createUpdateProfile
);
router.get('/', getAllProfile);
router.get('/user/:userId', getProfileByUser);
router.put('/', auth, deleteProfile);
router.post('/me/upload', auth, collectObjectField, uploadProfileImage);

router.get('/github/:username', getGithubRepositories);

module.exports = router;
