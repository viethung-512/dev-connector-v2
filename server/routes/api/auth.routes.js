const express = require('express');
const router = express.Router();

const {
  checkLoginRequiredField,
  checkRegisterRequiredField,
  validate,
} = require('../../utils/validators/auth.validator');
const { auth } = require('../../middleware/auth.middleware');
const {
  login,
  register,
  getAuthUser,
} = require('../../controllers/auth.controller');

/**
 * @route   POST api/auth/login
 * @desc    Login
 * @access  Public
 */
router.post('/login', checkLoginRequiredField, validate, login);

/**
 * @route   POST api/auth/register
 * @desc    Register
 * @access  Public
 */
router.post('/register', checkRegisterRequiredField, validate, register);

/**
 * @route   GET api/auth
 * @desc    Get logged in user
 * @access  Private
 */
router.get('/', auth, getAuthUser);

module.exports = router;
