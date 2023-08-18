//Creating a router 
const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');


// get user
router.get('/', auth, userController.get_user);

//Pass id of user to delete
router.delete('/:id/delete', auth, userController.delete_user);

// follow and unfollow user
//Pass id of user to unfollow
router.put('/:id/follow', auth, userController.follow_user);
//router.put('/:id/unfollow', auth, userController.unfollow_user);

// update user
router.put('/:id/update', auth, userController.update_user);


module.exports = router;