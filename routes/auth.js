const router = require('express').Router()
const User = require('../model/User')
const { UserLoginValid, UserRegisterValid } = require('../validation')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const config = require('config')
const tokenKey = config.get('tokenKey')

router.post('/register', async (req, res) => {

    // validating user input
    const { error } = UserRegisterValid(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // checkling if user exist
    const userExist = await User.findOne({ email: req.body.email })
    if (userExist) return res.status(400).send('email already exist')

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
    })

    try {
        const saveUser = await user.save()
        res.send(saveUser)
    } catch (err) {
        res.status(400).send(err)
    }
})


router.post('/login', async (req, res) => {

    // validating user input
    const { error } = UserLoginValid(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // checkling if user exist
    const currentUser = await User.findOne({ email: req.body.email })
    if (!currentUser) return res.status(400).send('email doas not exist')

    // hashing password
    const compare = await bcrypt.compare(req.body.password, currentUser.password);
    if (!compare) return res.status(400).send('password is wrong')

    // generate token
    const token = jwt.sign({ _id: currentUser.id }, tokenKey)
    res.header('auth-token', token).send(token)
})


module.exports = router