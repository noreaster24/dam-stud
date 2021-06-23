const { Comment } =require('../models');

const commentData = [
    {
        user_id: 1,
        post_id: 1,
        comment_text: "Luke you're awesome!"
    },
    {
        user_id: 2,
        post_id: 2,
        comment_text: "Just kidding, still doesn't work!"
    }
]
const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
