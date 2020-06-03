const bcrypt = require('bcryptjs');
const { generateToken, generateDefaultAvatar } = require('../utils/helper');

const User = require('../models/User');

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return next({
        status: 400,
        message: 'Wrong credentials, please try again',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next({
        status: 400,
        message: 'Wrong credentials, please try again',
      });
    }

    const payload = {
      user: { id: user.id },
    };

    const token = generateToken(payload);

    return res.json({
      token,
      user: {
        _id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    console.log(err.message);
    return next({ status: 500 });
  }
};

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return next({ status: 400, message: 'User already exists' });
    }

    const avatar = generateDefaultAvatar(email);

    user = new User({
      name,
      email,
      avatar,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };
    const token = generateToken(payload);
    return res.status(201).json({
      token,
      user: {
        _id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    console.error(err.message);
    return next({ status: 500 });
  }
};

const getAuthUser = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return next({ status: 403, message: 'User not found' });
    }

    return res.json({ user });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { login, register, getAuthUser };
