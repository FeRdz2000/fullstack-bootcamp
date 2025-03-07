require('dotenv').config()
require('./mongodb')

const express = require('express')
const cors = require('cors')
const logger = require('./loggerMiddleware')
const Note = require('./models/Note')
const NotFound = require('./middlewares/NotFound')
const handleErrors = require('./middlewares/handleErrors')

const app = express()

app.use(cors())
app.use(express.json()) // middleware body-parser
app.use(logger)
app.use('/static', express.static('images'))

app.get('/', (request, response) => {
    response.send('<h1>Node App</h1>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response, next) => {
    const { id } = request.params

    Note.findById(id).then(note => {
        if (note) return response.json(note)
        response.status(400).json({
            error: 'No se ha encontrado una nota con este id.'
        })
    }).catch(error => {
        next(error)
    })
})

app.post('/api/notes/', (request, response) => {
    const note = request.body

    if (!note || !note.content) {
        return response.status(400).json({
            error: 'No se ha enviado el contenido de la nota.'
        })
    }

    // crear instancia del modelo Note
    const newNote = new Note({
        content: note.content,
        date: new Date().toISOString(),
        important: note.important || false
    })

    newNote.save().then(savedNote => {
        response.status(201).json(savedNote)
    })
})

app.put('/api/notes/:id', (request, response, next) => {
    const { id } = request.params
    const note = request.body

    const newNoteInfo = {
        content: note.content,
        important: note.important
    }

    // { new: true } para devolver el nuevo valor actualizado

    Note.findByIdAndUpdate(id, newNoteInfo, { new: true }).then(note => {
        response.status(200).json(note)
    }).catch(error => {
        next(error)
    })
})

app.delete('/api/notes/:id', (request, response, next) => {
    const { id } = request.params

    Note.findByIdAndDelete(id).then(note => {
        // console.log(note) devolver objecto eliminado
        response.status(200).end()
    }).catch(error => {
        next(error)
    })
})

app.use(handleErrors)
app.use(NotFound)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
