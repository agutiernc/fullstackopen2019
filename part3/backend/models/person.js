// Fullstack Open 2019 - Part 3
// Alfonso Gutierrez

// Mongoose definitions
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// fixes an error regarding DeprecationWarning
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const url = process.env.MONGODB_URI

console.log('Connecting to', url)

mongoose.connect(url, { useNewUrlParser: true })
    .then( result => console.log('Connected to MongoDB') )
    .catch( (error) => console.log('Error connecting to MongoDB', error.message) )

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        unique: true,
        required: true,
        uniqueCaseInsensitive: true
    },
    number: {
        type: String,
        minlength: 8,
        required: true,
        unique: true
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

personSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Person', personSchema)