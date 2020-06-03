const express = require('express');
const router = express.Router();

const { auth } = require('../../middleware/auth.middleware');
const {
  checkEducationRequiredFields,
} = require('../../utils/validators/profile.validator');
const validate = require('../../utils/validators/index');
const {
  addEducation,
  deleteEducation,
} = require('../../controllers/education.controller');

router.put('/', auth, checkEducationRequiredFields, validate, addEducation);
router.delete('/:eduId', auth, deleteEducation);

module.exports = router;
