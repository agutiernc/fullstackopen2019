// Fullstack Open 2019
// Alfonso Gutierrez

// prevents logging when app is in test mode
//  ( console logging )
const info = (...params) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(...params)
    }
}

//   - still prints errors to console in test mode
const error = (...params) => console.log(...params)

module.exports = { info, error }