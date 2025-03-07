const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/node_app')
    .then(() => console.log('Database connected'))
    .catch((error) => console.log(error))

process.on('uncaughtException', () => {
    mongoose.connection.disconnect()
})
