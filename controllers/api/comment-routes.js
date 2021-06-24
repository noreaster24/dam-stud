const router = require('express').Router();

//this is just for the comment section for below each post. 
///   Still NOT 100% done or know if its right!

// l
router.get('/', (req, res) => {
    Comment.findAll()
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



//////////// to Post a comment //////////////
// - Need user to add comment pet/comment/pet
router.post('/pet/comment/:id', (req, res) => {
    //in order to access id, you need to req.params.id
    // id = specfic pet your commenting on
    Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.session.user_id,
    })
    .then(=> res.json())
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});





///////// To Delete/Destroy a comment ////////////

router.delete('/:id', (req, res) => {
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
