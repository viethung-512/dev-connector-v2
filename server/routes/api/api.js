const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const profileRoutes = require('./profile.routes');
const postRoutes = require('./post.routes');

const {setObjectType} = require('../../middleware/core.middleware')

router.use('/auth', authRoutes);
router.use('/profile', setObjectType, profileRoutes);
router.use('/post', postRoutes);

module.exports = router;
