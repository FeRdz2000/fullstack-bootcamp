const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/notes_app')
    .then(() => console.log('Database connected'))
    .catch((error) => console.log(error))

process.on('uncaughtException', (error) => {
    console.log(error)
    mongoose.disconnect()
})
