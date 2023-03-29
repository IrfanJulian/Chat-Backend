const jwt = require('jsonwebtoken')
const { response } = require('../helpers/common')
// eslint-disable-next-line no-undef
let key = process.env.JWT

const protect = (req,res,next) => {
    try {
        let token
        if(req.headers.authorization){
            let auth = req.headers.authorization
            token = auth.split(' ')[1]
            let payload = jwt.verify(token, key)
            req.decoded = payload
            next()
        } else {
            return response(res, null, 'failed', 404, 'Server Need Token')
        }
    } catch (error) {
        console.log(error)
        if(error && error.name == 'JsonWebTokenError'){
            return response(res, null, 'failed', 404, 'Invalid Token')
        } else if (error && error.name == 'TokenExpriredError'){
            return response(res, null, 'failed', 404, 'Token Expired')
        } else {
            return response(res, null, 'failed', 404, 'Invalid Token')
        }
    }
}

module.exports = {
    protect
}