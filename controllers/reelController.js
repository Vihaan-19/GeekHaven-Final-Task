const Reel = require('../models/reelModel');
const cloudinary = require('cloudinary').v2;

const create_reel =
    async (req, res) => {
        const newReel = new Reel(req.body);
        newReel.userId = req.userId;
        //Adding reels using cloudinary
        const file = req.files.video;
        let video_url = "";

        await cloudinary.uploader.upload(file.tempFilePath, { resource_type: 'video' }, (err, result) => {
            video_url = result.url;
        })

        newReel.video = video_url;

        try {
            const savedReel = await newReel.save();
            res.status(200).json(savedReel);
        }
        catch (err) {
            res.status(502).json(err);
        }
    }

const get_all_reels =
    async (req, res) => {
        try {
            //Show all reels apply pagination
            console.log("Display All Reels");
        }
        catch (err) {
            res.status(501).send(err);
        }
    }

const get_reel =
    async (req, res) => {
        try {
            const reel = await Reel.findById(req.params.id);
            res.status(200).json(reel);
        }
        catch (err) {
            res.status(501).json(err);
        }
    }

const likeDislike_reel =
    async (req, res) => {
        try {
            const reel = await Reel.findById(req.params.id);
            if (!reel.likes.includes(req.userId)) {
                await reel.updateOne({ $push: { likes: req.userId } });
                res.status(200).json("This reel has been liked");
            }
            else {
                await reel.updateOne({ $pull: { likes: req.userId } });
                res.status(200).json("The post has been disliked");
            }
        }
        catch (err) {
            res.status(502).json(err);
        }
    }


module.exports = { create_reel, get_all_reels, get_reel, likeDislike_reel };