const router = require('express').Router();

/// this is going to be where the Main user can have the abilities
// You need to work on the Models for this to work.


// GET /api/users

router.get('/', (req, res) => {
    // Access our User model and run .findAll() method
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => { // Accesses the session information from the user authentication
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json(dbUserData)
                    .catch(err => {
                        console.log(err);
                        res.status(500).json(err);
                    });
            });
        });
});



// LOGIN routes
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user with that email address!' });
            return;
        }

        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            // declare session variables
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    });
});



// router.put('', (req, res) => {
// }).then() => {
// }



// router.delete('', (req, res) => {
// }).then() => {
// }

// Allow the user to end their session
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});


module.exports = router;