const { User } = require('../models');

const userData = [
    {
        username: "Luke_Jones",
        email: "shilohjonezz@gmail.com",
        password: "TrustNo1"
    },
]
const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;