const express = require('express');
const router = express.Router();

const {
  checkLoginRequiredField,
  checkRegisterRequiredField,
} = require('../../utils/validators/auth.validator');
const validate = require('../../utils/validators/index');
const { auth } = require('../../middleware/auth.middleware');
const {
  login,
  register,
  getAuthUser,
} = require('../../controllers/auth.controller');

router.post('/login', checkLoginRequiredField, validate, login);
router.post('/register', checkRegisterRequiredField, validate, register);
router.get('/', auth, getAuthUser);

module.exports = router;
