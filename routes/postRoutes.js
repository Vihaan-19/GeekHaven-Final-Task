//Creating a router 
const express = require('express')
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../middlewares/auth');

//create a post
// <--Added image feature using cloudinary-->
router.post('/', auth, postController.create_post);

//update a post, /:id of post
// <--Added image feature using cloudinary-->
router.put('/:id', auth, postController.update_post);

//delete a post, /:id of post
//add image url to the req.query
router.delete('/:id', auth, postController.delete_post);

//get a post, /:id of post
router.get('/:id', postController.get_post);

//like / dislike a post, /:id of post
router.put('/:id/like', auth, postController.likeDislike_post);

//get post by category
router.get('/', postController.get_category_post);

//get timeline posts, /:id of post
router.get('/timeline/all', auth, postController.get_all_posts);

module.exports = router;
