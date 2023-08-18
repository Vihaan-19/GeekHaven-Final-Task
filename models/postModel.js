const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            max: 500,
        },

        image: {
            type: String,
            required: true
        },

        likes: {
            type: Array,
            default: []
        },

        category: {
            type: String,
           // default: "general"
        },

        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment"
        }]
    },
    { timestamps: true }
);

postSchema.index({ category: 1 });

module.exports = mongoose.model("Post", postSchema);