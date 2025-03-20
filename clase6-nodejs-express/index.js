require('dotenv').config()
require('./mongodb')

const express = require('express')
const cors = require('cors')
const logger = require('./loggerMiddleware')
const NotFound = require('./middlewares/NotFound')
const handleErrors = require('./middlewares/handleErrors')
const usersRouter = require('./controllers/users')
const notesRouter = require('./controllers/notes')
const loginRouter = require('./controllers/login')

const app = express()

app.use(cors())
app.use(express.json()) // middleware body-parser
app.use(logger)
app.use('/static', express.static('images'))

app.get('/', (request, response) => {
    response.send('<h1>Node App</h1>')
})

app.use('/api/users', usersRouter)
app.use('/api/notes', notesRouter)
app.use('/api/login', loginRouter)

app.use(NotFound)
app.use(handleErrors)

const PORT = process.env.PORT

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
