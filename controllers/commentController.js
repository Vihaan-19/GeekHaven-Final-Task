const Comment = require("../models/commentModel");
const Post = require("../models/postModel");
const User = require("../models/userModel");

const add_comment =
    async (req, res) => {
        try {
            const commentToSave = new Comment(req.body);
            commentToSave.postId = req.params.id;
            const savedcomment = await commentToSave.save();

            await Post.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { comments: savedcomment._id } }
            );

            res.status(200).send({
                status: "success",
                message: "Comment has been created",
            });
        }
        catch (e) {
            res.status(502).send({
                status: "failure",
                message: e.message,
            });
        }
    }

module.exports = { add_comment };


