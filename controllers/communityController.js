const Community = require('../models/communityModel');
const Post = require('../models/postModel');
const cloudinary = require('cloudinary').v2;

const get_all_communities =
    async (req, res) => {
        try {
            //Added Pagination to show all communities
            const page = parseInt(req.query.page) || 1;
            const perPage = parseInt(req.query.perPage) || 10; // Displaying 10 posts per page
            const skip = (page - 1) * perPage;


            const allCommunities = await Community.find()
                .skip(skip)
                .limit(perPage);

            res.json(allCommunities);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

const get_all_posts_community =
    async (req, res) => {
        try {
            //Added Pagination to show all posts of the community
            const page = parseInt(req.query.page) || 1;
            const perPage = parseInt(req.query.perPage) || 10; // Displaying 10 posts per page
            const skip = (page - 1) * perPage;

            const community = await Community.findById(req.params.id).populate({
                path: 'posts', options: {
                    limit: perPage,
                    skip
                }
            });
            if (community.posts.length > 0)
                return res.status(200).json(community.posts);

            else
                return res.status(200).json("There are no posts here");
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

const create_community =
    async (req, res) => {
        try {

            const { name, description } = req.body;
            const creatorUserId = req.userId;

            const newCommunity = new Community({
                name,
                description,
                //Added user to members
                members: [creatorUserId],
                //Creator of a community is by default an admin
                admins: [creatorUserId]
            });

            const savedCommunity = await newCommunity.save();
            res.status(201).json(savedCommunity);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }

const join_community =
    async (req, res) => {
        try {
            //getting the community id and userId 
            // Can also use query instead of params
            const communityId = req.params.id;
            const userId = req.userId;

            const community = await Community.findById(communityId);

            if (community) {
                //Add the user to members array
                //check if user is already a member
                if (!community.members.includes(userId)) {
                    community.members.push(userId);
                    const updatedCommunity = await community.save();
                    return res.json(updatedCommunity);
                }

                else
                    return res.status(400).json("You are already a member of this community")
            }

            else
                res.status(404).json("Community not found");
        }
        catch (error) {
            res.status(500).json(error);
        }
    }

const create_post =
    async (req, res) => {
        try {
            //if image is not sent
            if (!req.files) {
                return res.status(406).send("Please add an image");
            }

            // Adding images using cloudinary
            const file = req.files.image;
            let img_url = "";

            await cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
                if (err)
                    return res.status(500).send("Error uploading image");
                img_url = result.url;
            });

            const communityId = req.params.id;
            const { description, category } = req.body;
            const community = await Community.findById(communityId);

            //If community does not exist
            if (!community) {
                return res.status(404).json("Community not found");
            }

            //If not a user not a member
            if (!community.members.includes(req.userId)) {
                return res.status(403).json("You are not a member of this community");
            }

            const newPost = new Post({ description, category, userId: req.userId, image: img_url, communityId });

            const savedPost = await newPost.save();

            community.posts.push(savedPost._id);
            await community.save();
            res.status(201).json(savedPost);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }


const delete_post =
    async (req, res) => {
        try {
            const communityId = req.params.id;
            //Add the post id to a query
            const postId = req.query.postId;

            const community = await Community.findById(communityId);

            //if community does not exist
            if (!community)
                return res.status(404).json("Community not found");


            //If user is not an admin
            if (!community.admins.includes(req.userId))
                return res.status(403).json('Only admins can delete posts');


            const postToDelete = await Post.findByIdAndDelete(postId);

            if (postToDelete)
                return res.status(200).json('Post has been deleted');

            else
                return res.status(400).json("Post does not exist");
        }
        catch (error) {
            res.status(500).json(error);
        }
    }

const add_admin =
    async (req, res) => {
        try {
            const communityId = req.params.id;
            const adminUserId = req.userId;
            const newAdminUserId = req.body.userId;

            const community = await Community.findById(communityId);

            if (!community)
                return res.status(404).json('Community not found');

            //Verify admin
            if (!community.admins.includes(adminUserId))
                return res.status(403).json('Only admins can assign new admins');

            if (newAdminUserId) {
                //Check if user is already an admin
                if (community.admins.includes(newAdminUserId)) {
                    return res.status(400).json(community);
                }
                else {
                    community.admins.push(newAdminUserId);
                    await community.save();
                    return res.status(200).json('User has been assigned as admin');
                }
            }

            else
                res.status(400).json('User to add amin not found');
        }
        catch (error) {
            res.status(500).json(error);
        }
    }


module.exports = { get_all_communities, get_all_posts_community, create_community, join_community, create_post, delete_post, add_admin };