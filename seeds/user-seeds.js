const { User } = require('../models');

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
    }
]
const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;