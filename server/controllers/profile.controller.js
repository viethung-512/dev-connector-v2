const config = require('config');
const request = require('request');

const User = require('../models/User');
const Profile = require('../models/Profile');
const Post = require('../models/Post');

const { prepareProfileData } = require('../utils/helper');

const createUpdateProfile = async (req, res, next) => {
  const authUserId = req.user.id;
  const profileData = prepareProfileData(req.body);

  try {
    const user = await User.findById(authUserId);

    if (!user || !user.enabled) {
      return next({ status: 400, message: 'User not found' });
    }

    profileData.user = authUserId;
    let profile = await Profile.findOne({ user: authUserId, enabled: true });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: authUserId },
        {
          $set: profileData,
        },
        { new: true }
      );

      profile = await Profile.findById(profile.id).populate('user', [
        'name',
        'avatar',
      ]);

      return res.json({ profile });
    }

    profile = new Profile(profileData);
    await profile.save();

    profile = await Profile.findById(profile.id).populate('user', [
      'name',
      'avatar',
    ]);

    return res.json({ profile });
  } catch (err) {
    console.log(err, 'create or update profile');
    return res.status(500).send('Server error');
  }
};

const deleteProfile = async (req, res, next) => {
  const authUserId = req.user.id;

  try {
    await User.findByIdAndUpdate(authUserId, { enabled: false });
    await Profile.findOneAndUpdate({ user: authUserId }, { enabled: false });

    return res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err, 'delete profile');
    return next({ status: 500 });
  }
};

const uploadProfileImage = async (req, res, next) => {
  const { imageUrl } = req.object;
  const authUserId = req.user.id;

  try {
    await User.findByIdAndUpdate(authUserId, { avatar: imageUrl });
    let profile = await Profile.findOne({
      user: authUserId,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return next({ status: 404, message: 'Profile not found' });
    }

    const newPhotos = [{ url: imageUrl }, ...profile.photos];
    await Post.updateMany({ user: authUserId }, { avatar: imageUrl });
    profile = await Profile.findOneAndUpdate(
      { user: authUserId },
      { photos: newPhotos }
    );

    profile = await Profile.findOne({ user: authUserId });

    return res.json({ profile });
  } catch (err) {
    console.error(err, 'upload profile image');
    return next({ status: 500 });
  }
};

const changeProfileImage = async (req, res, next) => {
  const authUserId = req.user.id;
  const { avatarId } = req.params;

  try {
    const user = await User.findById(authUserId);
    let profile = await Profile.findOne({ user: authUserId });

    if (!user || !user.enabled || !profile || !profile.enabled) {
      return next({ status: 400 });
    }

    const newAvatar = profile.photos.find(
      photo => photo._id.toString() === avatarId
    );

    if (!newAvatar) {
      return next({ status: 400, message: 'Avatar url is not exists' });
    }

    await User.findByIdAndUpdate(authUserId, { avatar: newAvatar.url });

    profile = await Profile.findOne({ user: authUserId }).populate('user', [
      'name',
      'avatar',
    ]);

    return res.json({ profile });
  } catch (err) {
    if (err.name == 'CastError') {
      return next({ status: 400, message: 'Avatar url is not exists' });
    }
    console.log(err, 'change profile image');
    return next({ status: 500 });
  }
};

const deletePhoto = async (req, res, next) => {
  const authUserId = req.user.id;
  const { photoId } = req.params;

  try {
    let profile = await Profile.findOne({ user: authUserId });

    if (!profile || !profile.enabled) {
      return next({
        status: 400,
        message: 'There is no profile for this user',
      });
    }

    await Profile.findOneAndUpdate(
      { user: authUserId },
      {
        photos: profile.photos.map(photo =>
          photo._id === photoId ? { ...photo, enabled: false } : photo
        ),
      }
    );

    profile = await Profile.findById(profile.id);

    return res.json({ profile });
  } catch (err) {
    console.log(err, 'delete photo');
    return next({ status: 500 });
  }
};

const getAllProfile = async (req, res, next) => {
  try {
    let profiles = await Profile.find().populate('user', ['name', 'avatar']);
    profiles = profiles.filter(profile => profile.enabled);

    return res.json({ profiles });
  } catch (err) {
    console.error(err, 'get all profile');
    return next({ status: 500 });
  }
};

const getAuthProfile = async (req, res, next) => {
  const authUserId = req.user.id;

  try {
    const user = await User.findById(authUserId);

    if (!user || !user.enabled) {
      return next({ status: 400, message: 'User not found' });
    }

    const profile = await Profile.findOne({
      user: authUserId,
    }).populate('user', ['name', 'avatar']);

    if (!profile || !profile.enabled) {
      return next({
        status: 400,
        message: 'There is no profile for this user ',
      });
    }

    return res.json({ profile });
  } catch (err) {
    console.error(err, 'get auth profile');
    return next({ status: 500 });
  }
};

const getProfileByUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const profile = await Profile.findOne({ user: userId }).populate('user', [
      'name',
      'avatar',
    ]);
    if (!profile || !profile.enabled) {
      return next({ status: 404, message: 'Profile not found' });
    }

    return res.json({ profile });
  } catch (err) {
    console.error(err, 'get profile by user id');
    if (err.name == 'CastError') {
      return next({ status: 404, message: 'Profile not found' });
    }

    return next({ status: 500 });
  }
};

const getGithubRepositories = async (req, res, next) => {
  const { username } = req.params;
  try {
    const options = {
      uri: `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${config.get(
        'githubClientId'
      )}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };

    request(options, (error, response, body) => {
      if (error) {
        console.error(error);
      }

      if (response.statusCode !== 200) {
        return next({ status: 404, message: 'No Github profile found' });
      }

      return res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err, 'get github repositories');
    return next({ status: 500 });
  }
};

module.exports = {
  createUpdateProfile,
  deleteProfile,
  uploadProfileImage,
  changeProfileImage,
  deletePhoto,
  getAllProfile,
  getAuthProfile,
  getProfileByUser,
  getGithubRepositories,
};
