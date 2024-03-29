// Fullstack Open 2019 - Part 4
// Alfonso Gutierrez

// User Routes
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, url: 1, author: 1 })

    response.json( users.map( u => u.toJSON() ) )
})

usersRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body

        const saltRounds = 10

        if (body.password === undefined || body.password.length < 3 ) {
            return response.status(400).json( { error: 'minimum length of required password is 3 characters long' } )
        }

        const passwordHash = await bcrypt.hash( body.password, saltRounds )

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash
        })

        const savedUser = await user.save()

        response.json( savedUser )

    } catch (exception) {
        next(exception)
    }
})

module.exports = usersRouter