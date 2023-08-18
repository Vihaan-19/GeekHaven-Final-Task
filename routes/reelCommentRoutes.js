const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const reelCommentController = require("../controllers/reelCommentController");


router.post('/:id', auth, reelCommentController.add_comment_reel);

module.exports = router;