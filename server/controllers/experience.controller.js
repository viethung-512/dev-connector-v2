const Profile = require('../models/Profile');

const addExperience = async (req, res, next) => {
  const { title, company, location, from, to, current, description } = req.body;

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

    return res.json({ profile });
  } catch (err) {
    console.error(err.name);
    return next({ status: 500 });
  }
};

const updateExperience = (req, res, next) => {};

const deleteExperience = async (req, res, next) => {
  const { expId } = req.params;

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const newExperience = profile.experience.filter(ex => ex._id != expId);

    profile.experience = newExperience;

    await profile.save();

    return res.json({ profile });
  } catch (err) {
    console.error(err.message);
    return next({ status: 500 });
  }
};

module.exports = { addExperience, deleteExperience, updateExperience };
