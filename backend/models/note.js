const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    content: {
      type: String,
      minlength: 5,
      required: true,
    },
    important: {
      type: Boolean,
      default: false,
    },
})
// I kid you not, this does not work using double-quotes i.e "toJson"
noteSchema.set('toJSON', {
    transform: (doc, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

module.exports = mongoose.model('Note', noteSchema)