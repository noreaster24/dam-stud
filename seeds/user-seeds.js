const { User, Post } = require('../models');

const userData = [
    {
        username: "Luke_Jones",
        email: "shilohjonezz@gmail.com",
        password: "TrustNo1"
    },
    {
        username: "Joe_Porrazzo",
        email: "joepa2624@yahoo.com",
        password: "TrustEvery1"
    },
    {
        username: "KyleBerta",
        email: "KB@yahoo.com",
        password: "NeverTrustA$$"
    },
    {
        username: "Will",
        email: "Willbethere@yahoo.com",
        password: "TrustingTheSystem69"
    }
]
const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;