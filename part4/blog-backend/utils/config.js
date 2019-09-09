// Fullstack Open 2019 - Part 4
// Alfonso Gutierrez

// handles the environment variables
require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test') {
    MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = { MONGODB_URI, PORT }