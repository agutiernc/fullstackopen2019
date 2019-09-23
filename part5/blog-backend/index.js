// Fullstack Open 2019
// Alfonso Gutierrez

// imports the actual app and then starts the app

const app = require('./app') // the actual Express app
const http = require('http')
const config = require('./utils/config')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})