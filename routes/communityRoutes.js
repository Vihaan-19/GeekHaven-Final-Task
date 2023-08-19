const express = require('express')
const router = express.Router();
const communityController = require('../controllers/communityController');
const auth = require('../middlewares/auth');

//Get all communities
router.get('/', communityController.get_all_communities);

//Get all posts of a community
// Id of community
router.get('/:id', communityController.get_all_posts_community);

//Create Community
router.post('/', auth, communityController.create_community);

//Join Community
// Id of community to join
router.post('/:id', auth, communityController.join_community);

//Create a Post of a community
//Id of community
router.post('/post/:id', auth, communityController.create_post);

//Add postId of the post to query
router.delete('/post/:id', auth, communityController.delete_post);

//Add admin
// add userId to req.body
//Add the id of user to query
router.post('/:id/admin', auth, communityController.add_admin);

module.exports = router;