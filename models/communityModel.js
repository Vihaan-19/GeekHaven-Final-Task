const Post = require('./postModel');
const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        description: {
            type: String
        },

        members: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],

        //Added Admins
        admins: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],

        //community posts
        posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }]
    }
);


module.exports = mongoose.model("Community", communitySchema);