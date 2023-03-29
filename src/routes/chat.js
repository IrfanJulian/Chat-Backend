const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth')
const chatController = require('../controllers/chat')
// const upload = require('../middlewares/upload')


router.get('/:id', protect, chatController.selectChatById);

module.exports = router