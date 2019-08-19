// Fullstack Open 2019 - Part 3
// Alfonso Gutierrez

const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Give password as argument...')
    process.exit(1)
}

if (process.argv.length === 4) {
    console.log('Please enter name...')
    process.exit(1)
}

if (process.argv.length > 5) {
    console.log('Please enclose name in quotes...')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fsouser:${password}@cluster0-ejj0f.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

// Fetch all data entries
if (process.argv.length < 4) {
    Person.find({}).then(result => {
        console.log('Phonebook:')

        result.forEach( person => {
            console.log(`${person.name}: ${person.number}`)
        })

        mongoose.connection.close()
    })
}

// Create person object
const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
})

// save as long as name & number are not empty
if (process.argv[3] && process.argv[4]) {
    person.save().then(response => {
        console.log(`added ${process.argv[3]}, number: ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
    })
}

