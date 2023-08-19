const Comment = require("../models/commentModel");
const Post = require("../models/postModel");

const get_all_comments =
    async (req, res) => {
        try {
            const postId = req.params.id;

            const post = await Post.findById(postId).populate({ path: 'comments' });
            if (post.comments.length > 0)
                return res.status(200).json(post.comments);

            else
                return res.status(200).json("There are no comments");

        } catch (error) {
            res.status(500).send(error);
        }
    }

const add_comment =
    async (req, res) => {
        try {

            const commentToSave = new Comment({ userId: req.userId, comment: req.body.comment, postId: req.params.id });
            const savedcomment = await commentToSave.save();

            //Adding the comment to post
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

module.exports = { get_all_comments, add_comment };


