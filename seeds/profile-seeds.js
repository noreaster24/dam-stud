const { Profile } =require('../models');

const profileData = [
    {
        // user_id: 1,
        petname: 'Rusty',
        breed: "Doberman",
        sex: "male",
        age: 7,
        pet_bio: "Rusty is a friendly guy that loves to play fetch"
    },
    {
        // user_id: 2,
        petname: 'Ralph',
        breed: "St. Bernard",
        sex: "male",
        age: 4,
        pet_bio: "This dude is lazy"
    }
]
const seedProfiles = () => Profile.bulkCreate(profileData);

module.exports = seedProfiles;