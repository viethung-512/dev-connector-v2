const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config');
const { check, validationResult } = require('express-validator');

const { auth } = require('../../middleware/auth.middleware');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

/**
 * @route   GET api/profile/me
 * @desc    Get current users profile
 * @access  Private
 */
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

/**
 * @route   POST api/profile/me
 * @desc    Create or update user profile
 * @access  Private
 */
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required').not().isEmpty(),
      check('skills', 'Skills is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubUsername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    // Build profile object
    const profileFields = {
      user: req.user.id,
    };
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubUsername) profileFields.githubUsername = githubUsername;
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

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          {
            $set: profileFields,
          },
          { new: true }
        );

        profile = await Profile.findById(profile.id).populate('user', [
          'name',
          'avatar',
        ]);

        return res.json(profile);
      }

      profile = new Profile(profileFields);
      await profile.save();

      console.log(profile);

      return res.json(profile);
    } catch (err) {
      console.log(err);
      return res.status(500).send('Server error');
    }
  }
);

/**
 * @route   GET api/profile
 * @desc    Get all profile
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    return res.json(profiles);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

/**
 * @route   GET api/profile/user/:userId
 * @desc    Get profile by id
 * @access  Public
 */
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const profile = await Profile.findOne({ user: userId }).populate('user', [
      'name',
      'avatar',
    ]);
    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.name == 'CastError') {
      return res.status(404).json({ msg: 'Profile not found' });
    }
    return res.status(500).send('Server error');
  }
});

/**
 * @route   DELETE api/profile
 * @desc    Delete profile, user & posts
 * @access  Private
 */
router.delete('/', auth, async (req, res) => {
  try {
    await Post.deleteMany({ user: req.user.id });
    await Profile.findOneAndRemove({ user: req.user.id }); // remove profile
    await User.findOneAndRemove({ _id: req.user.id }); // remove user

    return res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

/**
 * @route   PUT api/profile/experience
 * @desc    Add profile experience
 * @access  Private
 */
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);

      await profile.save();

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

/**
 * @route   DELETE api/profile/experience/:expId
 * @desc    Delete experience from profile
 * @access  Private
 */
router.delete('/experience/:expId', auth, async (req, res) => {
  const { expId } = req.params;

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const newExperience = profile.experience.filter(ex => ex._id != expId);

    profile.experience = newExperience;

    await profile.save();

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

/**
 * @route   PUT api/profile/education
 * @desc    Add profile education
 * @access  Private
 */
router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is required').not().isEmpty(),
      check('degree', 'Degree is required').not().isEmpty(),
      check('fieldOfStudy', 'Field of study is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);

      await profile.save();

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

/**
 * @route   DELETE api/profile/education/:eduId
 * @desc    Delete education from profile
 * @access  Private
 */
router.delete('/education/:eduId', auth, async (req, res) => {
  const { eduId } = req.params;

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const newEducation = profile.education.filter(ed => ed._id != eduId);

    profile.education = newEducation;

    await profile.save();

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

/**
 * @route   GET api/profile/github/:username
 * @desc    Get user repository from Github
 * @access  Public
 */
router.get('/github/:username', async (req, res) => {
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
        return res.status(404).json({ msg: 'No Github profile found' });
      }

      return res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
