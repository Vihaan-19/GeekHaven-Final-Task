const ReelComment = require("../models/reelCommentModel");
const Reel = require("../models/reelModel");

const add_comment_reel =
    async (req, res) => {
        console.log("Hi");
        try {
            const commentToSave = new ReelComment(req.body);
            //Setting keys with values of comment
            commentToSave.userId=req.userId;
            commentToSave.reelId = req.params.id;

            //Save Comment
            const savedcomment = await commentToSave.save();

            //Add comment in reels
            await Reel.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { comments: savedcomment._id } }
            );

            res.status(200).send({
                status: "success",
                message: "Comment has been created",
            });
        }
        catch (e) {
            res.status(500).send({
                status: "failure",
                message: e.message,
            });
        }
    }

module.exports = { add_comment_reel };