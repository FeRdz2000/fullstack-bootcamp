const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('notes', {
        content: 1,
        date: 1,
        important: 1,
        _id: 0
    })
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    try {
        const { username, name, password } = request.body

        // coste de computación que tendrá el hashear el password
        const saltRounds = 10

        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({
            username,
            name,
            passwordHash
        })

        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } catch (error) {
        // console.log(error)
        response.status(400).json({
            error: error._message,
            message: error.errors.username.message
        })
    }
})

module.exports = usersRouter
