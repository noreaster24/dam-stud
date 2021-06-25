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
    },
    {
        // user_id: 3,
        petname: 'North',
        breed: "German Shepard",
        sex: "Female",
        age: 1,
        pet_bio: "She is a borderline terrorist"
    },
    {
        // user_id: 4,
        petname: 'Dakota',
        breed: "GermanShepard/Boxer mix",
        sex: "Female",
        age: 7,
        pet_bio: "She is the best dog anyone could."
    }
]
const seedProfiles = () => Profile.bulkCreate(profileData);

module.exports = seedProfiles;