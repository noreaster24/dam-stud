const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Profile } = require('../models'); // Should this be Profile instead of Post???

// Opens main page and shows all profiles in the database
router.get('/', (req, res) => {
    console.log(req.session);

    Profile.findAll({
        // Need to create Post routes here to pull every pet profile
    })
        .then(dbProfileData => {
            const profiles = dbProfileData.map(profile => profile.get({ plain: true }));
            // pass a single post object into the homepage template
            res.render('homepage', { profiles });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    res.render('login');
});

///ask question for res.render//////////
router.get('/create-petprofile', (req, res) => {
    res.render('create-petprofile')
});

router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['petname']
                }
            },
            {
                model: User,
                attributes: ['petname']
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }

            // serialize the data
            const post = dbPostData.get({ plain: true });

            ///////////////////////// pass data to template // what id "single-post doing????" ////////////////////////////////////////////
            res.render('single-post', {
                post,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
router.get('/pet/:id', (req, res) => {
    Profile.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'petname',
            'sex',
            'breed',
            'age',
            'pet_bio',
        ]
        // include: [User]
        // include: [comments]
        //-GET comments
    }).then(data => {
        if (data) {
            const petData = data.get({
                plain: true
            })
            console.log(petData)
            res.render('pet-profile', {
                petData,
                loggedIn: req.session.loggedIn
            })
        }
        // res.json(data)
    })
});

module.exports = router;