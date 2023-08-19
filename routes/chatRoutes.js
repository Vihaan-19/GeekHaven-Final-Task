const express = require('express');
const router = express.Router();

const chatController = require('../controllers/chatController')
// const auth = require('../middlewares/auth');

router.get('/:id', chatController.get_dashboard);

module.exports = router;
