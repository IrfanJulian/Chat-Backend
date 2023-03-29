const chatModel = require('../models/chat');
const { response } = require('../helpers/common')

const selectChatById = async(req, res) => {
    const reciever = req.params.id
    const sender = req.decoded.id
    try {
        const {rows} = await chatModel.selectId(reciever, sender)
        response(res, rows, 'success', 200, 'get data chat by id success');
    } catch (error) {
        console.log(error);
        response(res, error, 'failed', 403, 'get data chat by id failed')
    }
}

module.exports = {
    selectChatById
}