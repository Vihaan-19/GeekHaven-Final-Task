const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const cloudinary = require('cloudinary').v2;

//get a user
const get_user =
    async (req, res) => {
        try {
            const user = await User.findById(req.userId);
            //Show everything except password and updated at
            const { password, updatedAt, ...other } = user._doc;
            res.status(200).json(other);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }


//delete user
const delete_user =
    async (req, res) => {
        try {
            if (req.userId === req.params.id) {
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("Account has been deleted");
            }
            else
                res.status(403).json("You can delete only your account!");
        }
        catch (err) {
            res.status(500).json(err);
        }
    }


//follow a user
const follow_user =
    async (req, res) => {
        //When user to follow is not same as current user 
        if (req.userId !== req.params.id) {
            try {
                const userToFollowUnfollow = await User.findById(req.params.id);
                const currentUser = await User.findById(req.userId);
                console.log(currentUser);

                //Check already following (if user is not present )
                //Update followers and following lists
                if (!userToFollowUnfollow.followers.includes(req.userId)) {
                    //Add user to following list
                    await userToFollowUnfollow.updateOne({ $push: { followers: req.userId } });
                    await currentUser.updateOne({ $push: { following: req.params.id } });
                    res.status(200).json("user has been followed");
                }

                //Update followers and following list
                else {
                    //Remove user from the following list
                    await userToFollowUnfollow.updateOne({ $pull: { followers: req.userId } });
                    await currentUser.updateOne({ $pull: { following: req.params.id } });
                    res.status(200).json("user has been unfollowed");
                }
            }
            catch (err) {
                res.status(500).json(err);
            }
        }

        //When same user
        else
            res.status(405).json("You cant follow/unfollow yourself");

    }


//update user
const update_user =
    async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (user._id == req.userId) {

                //Updating the password
                //The request should contain old and new password
                if (req.body.newPassword && req.body.currentPassword) {
                    //verify the current password
                    const checkValid = await bcrypt.compare(req.body.currentPassword, user.password);
                    if (checkValid) {
                        //generate new password
                        const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
                        await user.updateOne({ $set: { password: hashedPassword } });
                    }
                    else
                        res.status(401).send("Wrong Password");

                }

                else if (req.body.newPassword || req.body.currentPassword)
                    res.send("Please enter new password and current password");


                await user.updateOne({ $set: req.body });

                if (img_url) {
                    //Adding images using cloudinary
                    const file = req.files.image;
                    let img_url = "";

                    await cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
                        img_url = result.url;
                    })

                    await user.updateOne({ $set: { "image": img_url } });
                }

                res.status(200).json(user);
            }
            else
                res.status(403).json("You can only update your profile");
        }

        catch (err) {
            res.status(500).json(err);
        }
    }


module.exports = { get_user, delete_user, follow_user, update_user };