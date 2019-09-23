// Fullstack Open 2019
// Alfonso Gutierrez

const logger = require('./logger')

//  - used for catching requests to non-existant routes
const unknownEndpoint = (request, response) => {
    response.status(404).send( { error: 'unknown endpoint' } )
}

// Express ERORR handling
const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        // section added for Mongoose validation
        return response.status(400).json( {error: error.message } )
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).send( {error: 'invalid token'} )
    }

    next(error)
}

// isolates the token fron the authorization header
const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')

    if ( authorization && authorization.toLowerCase().startsWith('bearer ') ) {
        request.token = authorization.substring(7) // grabs everything after bearer_
    }

    next()
}

module.exports = { unknownEndpoint, errorHandler, tokenExtractor }