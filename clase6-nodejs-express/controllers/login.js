const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const User = require('../models/User')

loginRouter.post('/', async (request, response, next) => {
    const { username, password } = request.body

    try {
        const user = await User.findOne({ username })

        const passwordCorrect = user === null
            ? false
            : await bcrypt.compare(password, user.passwordHash)

        if (!(user && passwordCorrect)) {
            response.status(401).json({
                error: 'Usuario o contrasña incorrectos.'
            })
        }

        const userForToken = {
            id: user._id,
            username: user.username
        }

        const token = jwt.sign(userForToken, process.env.SECRET)

        response.send({
            name: user.name,
            username: user.username,
            token
        })
    } catch (error) {
        next(error)
    }
})

module.exports = loginRouter
