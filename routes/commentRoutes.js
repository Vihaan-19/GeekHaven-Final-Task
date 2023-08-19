const express = require('express');
const router = express.Router();
const commentController = require("../controllers/commentController");
const auth=require("../middlewares/auth");

router.get('/:id', commentController.get_all_comments);

router.post('/:id',auth, commentController.add_comment);

module.exports = router;