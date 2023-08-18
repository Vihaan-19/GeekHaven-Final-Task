//Creating a router 
const express = require('express')
const router = express.Router();
const reelController = require('../controllers/reelController');
const auth = require('../middlewares/auth');

//create a reel
// <--Added Reel using Cloudinary-->
router.post('/', auth, reelController.create_reel);

//show all reels
router.get('/', reelController.get_all_reels);

//get a reel
router.get('/:id', reelController.get_reel);

//like / dislike a reel
router.put('/:id/like', auth, reelController.likeDislike_reel);

module.exports = router;
