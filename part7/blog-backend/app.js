const config = require('./utils/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login') 
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const morgan = require('morgan')
const logger = require('./utils/logger')

// morgan middleware
morgan.token('body', (request, response) => JSON.stringify( request.body ) )

// responsible for establing connection to DB
logger.info('Connecting to', config.MONGODB_URI)

mongoose
    .connect(config.MONGODB_URI, { useNewUrlParser: true })
    .then( () => logger.info('Connected to MongoDB') )
    .catch( (error) => logger.error('Error connecting to MongoDB', error.message) )

// **** Use Middleware ****
app.use(cors())
app.use(bodyParser.json())
app.use(morgan( ':method :url :status :res[content-length] - :response-time ms :body' ))


app.use(middleware.tokenExtractor)

// For testing purposes (ie. Cypress)
if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
