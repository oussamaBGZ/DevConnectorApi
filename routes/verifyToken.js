const jwt = require('jsonwebtoken')
const config = require('config')
const tokenKey = config.get('tokenKey')

module.exports = (req, res, next) => {

    const token = req.header('auth-token')
    if (!token) return res.status(401).send('access denied')

    try {
        const verified = jwt.verify(token, tokenKey)
        req.user = verified
        next()
    } catch (err) {
        res.status(400).send('invalid token')
    }

}