const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment, Profile } = require('../../models');
const withAuth = require('../../utils/auth');
const { route } = require('../home-routes');


//get all of them//
router.get('/', (req, res) => {
    Profile.findAll({})
        .then(petProfileData => res.json(petProfileData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    Profile.create({
        petname: req.body.petname,
        breed: req.body.breed,
        sex: req.body.sex,
        age: req.body.age,
        pet_bio: req.body.pet_bio,
    })
        .then(petProfileData => {
            res.json(petProfileData);
        })

        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

router.put('/:id', (req, res) => {
    // pass in req.body instead to only update what's passed through
    Profile.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(petProfileData => {
            if (!petProfileData) {
                res.status(404).json({ message: 'No pet found with this id' });
                return;
            }
            res.json(petProfileData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    Profile.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(petProfileData => {
            if (!petProfileData) {
                res.status(404).json({ message: 'No Pet found with this id' });
                return;
            }
            res.json(petProfileData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;