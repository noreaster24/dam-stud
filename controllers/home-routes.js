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

// router.get('/post/:id', (req, res) => {
//     Post.findOne({
//         where: {
//             id: req.params.id
//         },
//         attributes: [
//             'id',
//             'post_url',
//             'title',
//             'created_at',
//             [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
//         ],
//         include: [
//             {
//                 model: Comment,
//                 attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//                 include: {
//                     model: User,
//                     attributes: ['petname']
//                 }
//             },
//             {
//                 model: User,
//                 attributes: ['petname']
//             }
//         ]
//     })
//         .then(dbPostData => {
//             if (!dbPostData) {
//                 res.status(404).json({ message: 'No post found with this id' });
//                 return;
//             }

//             // serialize the data
//             const post = dbPostData.get({ plain: true });

//             // pass data to template
//             res.render('single-post', {
//                 post,
//                 loggedIn: req.session.loggedIn
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

module.exports = router;