const express = require('express');
const router = express.Router();

const { auth } = require('../../middleware/auth.middleware');
const {
  checkExperienceRequiredFields,
} = require('../../utils/validators/profile.validator');
const validate = require('../../utils/validators/index');
const {
  addExperience,
  deleteExperience,
} = require('../../controllers/experience.controller');

router.put('/', auth, checkExperienceRequiredFields, validate, addExperience);
router.delete('/:expId', auth, deleteExperience);

module.exports = router;
