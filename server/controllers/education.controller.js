const Profile = require('../models/Profile');
const { auth } = require('../middleware/auth.middleware');

const addEducation = async (req, res, next) => {
  const authUserId = req.user.id;
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
    const profile = await Profile.findOne({ user: authUserId });

    profile.education.unshift(newEdu);

    await profile.save();

    return res.json({ profile });
  } catch (err) {
    console.error(err, 'add education');
    return next({ status: 500 });
  }
};

const updateEducation = (req, res, next) => {};

const deleteEducation = async (req, res, next) => {
  const authUserId = req.user.id;
  const { eduId } = req.params;

  try {
    const profile = await Profile.findOne({ user: authUserId });
    const newEducation = profile.education.filter(ed => ed._id != eduId);

    profile.education = newEducation;

    await profile.save();

    return res.json({ profile });
  } catch (err) {
    console.error(err, 'delete education');
    return next({ status: 500 });
  }
};

module.exports = { addEducation, deleteEducation, updateEducation };
