// Fullstack Open 2019 - Part 3
// Alfonso Gutierrez

require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Person = require('./models/person') // uses mongoose to get data from MongoDB
const morgan = require('morgan')
const cors = require('cors')

// **** Middleware ****
app.use(express.static('build'))
app.use( bodyParser.json() )

// app.use( morgan('tiny') )// morgan middleware
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

// morgan middleware - used tiny format
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use( cors() )


// Route 1 - ROOT
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

// Route 2 - gets the persons json file
app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons.map( person => person.toJSON() ) )
    })
})

// Route 3 - info page
app.get('/info', (req, res) => {
    let nowDate = new Date()

    Person.find({}).then( persons => {
        const numPerson = persons.map( person => person ).length

        res.send(`<p>Phonebook has info for ${numPerson} people</p> <p>${nowDate}</p>`)
    })
})

// route 4 - gets an object id
app.get('/api/persons/:id', (req, res, next) => {

    Person.findById( req.params.id )
        .then( person => {
            person ? res.json( person.toJSON() ) : res.status(404).end()
        })
        .catch( error => next(error) )
})

// route 5 - delete an ID
app.delete('/api/persons/:id', (req, res, next) => {

    Person.findByIdAndRemove( req.params.id )
          .then( result => res.status(204).end() )
          .catch( error => next(error) )
})

// route 6 - POST
app.post('/api/persons', (req, res, next) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({ error: 'name or number is missing' })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
          .then( savedPerson => savedPerson.toJSON() )
          .then( savedAndFormattedPerson => res.json( savedAndFormattedPerson ) )
          .catch( error => next(error))
})

// route 7 - PUT - Fetches and updates a person
app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate( req.params.id, person, { new: true } )
        .then( updatedPerson => res.json( updatedPerson.toJSON() ) )
        .catch( error => next(error) )
})

// middleware
// - used for catching requests made to non-existent routes
const unknownEndpoint = (req, res) => {
    res.status(404).send( { error: 'unknown endpoint' } )
}

app.use(unknownEndpoint)

// express ERROR handling
const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if(error.name === 'CastError' && error.kind === 'ObjectId'){
        return response.status(400).send( { error: 'malformatted id' } )
    } else if(error.name === 'ValidationError'){
        return response.status(400).json( { error: error.message } )
    }

    next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})