const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models'); // Should this be Profile instead of Post???

// Opens main page and shows all profiles in the database
router.get('/', (req, res) => {
    console.log(req.session);

    Post.findAll({
        // Need to create Post routes here to pull every pet profile
    })
        .then(dbProfileData => {
            const profiles = dbProfileData.map(profile => this.post.get({ plain: true }));
            // pass a single post object into the homepage template
            res.render('homepage', { profiles });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;