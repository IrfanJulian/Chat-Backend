const express = require('express');
const router = express.Router()
const userRouter = require('./user')
const chatRouter = require('./chat')

router
    .use('/user', userRouter)
    .use('/chat', chatRouter)

module.exports = router