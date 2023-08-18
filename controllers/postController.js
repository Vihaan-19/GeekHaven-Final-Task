const Post = require("../models/postModel");
const User = require("../models/userModel");
const Comment = require("../models/commentModel");
const cloudinary = require('cloudinary').v2;

const create_post = async (req, res) => {
    try {
        if (!req.files) {
            return res.status(406).send("Please add an image");
        }

        // Adding images using cloudinary
        const file = req.files.image;
        let img_url = "";

        await cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
            if (err) {
                return res.status(500).send("Error uploading image");
            }
            img_url = result.url;
        });

        const { description, category } = req.body;

        const newPost = new Post({ description, category, userId: req.userId, image: img_url });
        await newPost.save();

        res.status(200).json(newPost); // Send response after saving the post
    }
    catch (err) {
        res.status(500).send(err);
    }
};



const update_post =
    async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            if (post.userId == req.userId) {
                await post.updateOne({ $set: req.body });

                //Adding images using cloudinary
                const file = req.files.image;
                let img_url = "";

                await cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
                    img_url = result.url;
                })

                //If user sends a image
                if (img_url)
                    await post.updateOne({ $set: { "image": img_url } });

                res.status(200).json("post has been updated");
            }
            else
                res.status(403).json("you can update only your post");
        }

        catch (err) {
            res.status(500).json(err);
        }
    }

const delete_post =
    async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            //The current user can only delete his/her post
            if (post.userId === req.userId) {

                //Deleting all comments associated with the post
                await Comment.deleteMany({ postId: post._id });
                //Deleting the post
                await post.deleteOne();

                res.status(200).json("the post has been deleted");
            }
            else
                res.status(403).json("you can delete only your post");

        }
        catch (err) {
            res.status(500).json(err);
        }
    }

const get_post =
    async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            res.status(200).json(post);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

const likeDislike_post =
    async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            if (!post.likes.includes(req.userId)) {
                await post.updateOne({ $push: { likes: req.userId } });
                res.status(200).json("The post has been liked");
            }
            else {
                await post.updateOne({ $pull: { likes: req.userId } });
                res.status(200).json("The post has been disliked");
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    }


//Adding Category Post
const get_category_post =
    async (req, res) => {
        try {
    
            const category = req.query.category; 
            const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
            const perPage = parseInt(req.query.perPage) || 10; // Default to 10 posts per page
            const skip = (page - 1) * perPage;

            const category_posts = await Post.find({ category: category })
                .skip(skip)
                .limit(perPage);

            res.json(category_posts);
        }
        catch (err) {
            res.status(501).send(err);
        }
    }


//All Posts of an User
// IMPORTANT:- Add Pagination
const get_all_posts =
    async (req, res) => {
        try {
            //Added Pagination to show all posts
            const page = parseInt(req.query.page) || 1;
            const perPage = parseInt(req.query.perPage) || 10; // Displaying 10 posts per page
            const skip = (page - 1) * perPage;


            const currentUser = await User.findById(req.userId);
            const userPosts = await Post.find({ userId: currentUser._id })
                .skip(skip)
                .limit(perPage);



            const friendPosts = await Promise.all(
                currentUser.following.map((friendId) => {
                    return Post.find({ userId: friendId })
                        .skip(skip)
                        .limit(perPage);
                })
            );
            res.json(userPosts.concat(...friendPosts))
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

module.exports = { create_post, update_post, delete_post, get_post, likeDislike_post, get_category_post, get_all_posts }