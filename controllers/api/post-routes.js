const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment, Profile } = require('../../models');
const withAuth = require('../../utils/auth');

// this one two is going to need a router.get(). router.post(). router.put()  router.delete()
module.exports = router;