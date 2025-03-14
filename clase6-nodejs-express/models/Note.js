const mongoose = require('mongoose')

// esquema
const noteSchema = mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

// modelo
const Note = mongoose.model('Note', noteSchema)

module.exports = Note
