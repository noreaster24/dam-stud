const router =require('express').Router();

const userRoutes = require('./user-routes');
const postRoutes = require('./profile-routes');
const commentRoutes = require('./comment-routes');


router.use('/users', userRoutes);
router.use('/profile', postRoutes);
router.use('/comment', commentRoutes);

module.exports = router;

