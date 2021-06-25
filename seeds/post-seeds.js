const { Post } = require('../models');

const postData = [
    {
        // Probably needs another property when clicking/posting on other profiles.
        post_content: "Testing 1-2",
        user_id: 1,
        title: "Test"
    },
    {
        post_content: "Testing 2-2",
        user_id: 2,
        title: "Test2"
    },
    {
        post_content: "Testing 3-2",
        user_id: 3,
        title: "Test3"
    },
    {
        post_content: "Testing 4-2",
        user_id: 4,
        title: "Test4"
    }
]
const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;