const jwt = require('jsonwebtoken')

const { User } = require('../models/index')

const authentication = async (req, res, next) => {
    try {
        const{ access_token } = req.headers
        if(!access_token) {
            throw { name: "UNAUTHORIZED" }
        }
        const payload = jwt.verify(access_token, process.env.SECRET)
        const user = await User.findByPk(payload.id)
        if(!user) {
            throw { name: "INVALID_CREDENTIAL" }
        }
        req.user = {
            id: user.id,
            role: user.role,
            email: user.email
        }
        // console.log(req.user)
        next()
    }
    catch(err) {
        next(err)
    }
}

module.exports = authentication