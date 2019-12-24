// Mongoose Comments definitions
const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
  message: {
    type: String,
    minlength: 3,
    maxlength: 120,
    required: true
  },
  blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v

    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const Comments = mongoose.model('Comments', commentSchema)

module.exports = Comments