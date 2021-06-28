const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//this is just for the comment section for below each post. 
///   Still NOT 100% done or know if its right!


router.get('/', (req, res) => {
    Comment.findAll()
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.post('/pet/comment/:id', (req, res) => {
    if (req.session) {
        //in order to access id, you need to req.params.id
        // id = specfic pet your commenting on
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.session.user_id,
            user_id: req.session.user_id,
        })
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

router.post('/', (req, res) => {
    // if (req.session) {
        //in order to access id, you need to req.params.id
        // id = specfic pet your commenting on
        console.log("POST route",req.body)
        Comment.create(req.body)
            .then(dbCommentData =>{
                console.log("POST",dbCommentData)
                res.json(dbCommentData)})
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    // }
});

///////// To Delete/Destroy a comment ////////////

router.delete('/pet/comment/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No comment found with this id!' });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
