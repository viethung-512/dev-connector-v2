const firebase = require('../utils/firebase');
const { generateDefaultAvatar } = require('../utils/helper');

const User = require('../models/User');

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const data = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    const token = await data.user.getIdToken();
    const user = await User.findOne({ uid: data.user.uid });

    return res.json({
      token,
      user: {
        _id: user.id,
        uid: user.uid,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    console.log(err, 'login');
    return next({
      status: 400,
      message: 'Wrong credentials,  please try again',
    });
  }
};

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return next({ status: 400, message: 'User already exists' });
    }

    const data = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const token = await data.user.getIdToken();

    const newUser = new User({
      uid: data.user.uid,
      name: name,
      email: data.user.email,
      avatar: generateDefaultAvatar(email),
    });

    await newUser.save();

    return res.json({
      token,
      user: newUser,
    });
  } catch (err) {
    console.log(err, 'register');
    return next({ status: 500 });
  }
};

const getAuthUser = async (req, res, next) => {
  const userId = req.user.uid;

  try {
    const user = await User.findOne({ uid: userId });

    if (!user || !user.enabled) {
      return next({ status: 404, message: 'User not found' });
    }

    return res.json({ user });
  } catch (err) {
    console.log(err, 'get auth user');
  }
};

module.exports = {
  login,
  register,
  getAuthUser,
};
