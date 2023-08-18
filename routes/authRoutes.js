//All the Authorization Routes are here
const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

//Sign Up and Login System
router.get('/signup', authController.signup_get);

// <--Added Image feature using cloudinary-->
router.post('/signup', authController.signup_post);

router.get('/login', authController.login_get);

router.post('/login', authController.login_post);

module.exports = router;


