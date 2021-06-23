const { Post } = require('../models');

const postData = [
    {
        // Probably needs another property when clicking/posting on other profiles.
        post_content: "Testing 1-2",
        user_id: 1
    },
]
const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;