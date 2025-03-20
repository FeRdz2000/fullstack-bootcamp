const notesRouter = require('express').Router()
const Note = require('../models/Note')
const User = require('../models/User')
const userExtractor = require('../middlewares/userExtractor')

notesRouter.get('/', async (request, response) => {
    /* Note.find({}).then(notes => {
        response.json(notes)
    }) */

    const notes = await Note.find({}).populate('user')
    response.json(notes)
})

notesRouter.get('/:id', (request, response, next) => {
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

notesRouter.post('/', userExtractor, async (request, response, next) => {
    const { content, important = false } = request.body
    const { userId } = request

    const user = await User.findById(userId)

    if (!content) {
        return response.status(400).json({
            error: 'No se ha enviado el contenido de la nota.'
        })
    }

    // crear instancia del modelo Note
    const newNote = new Note({
        content,
        date: new Date().toISOString(),
        important,
        user: user._id
    })

    /* newNote.save().then(savedNote => {
        response.status(201).json(savedNote)
    }) */

    try {
        const savedNote = await newNote.save()

        user.notes = user.notes.concat(savedNote._id)
        await user.save()

        response.status(201).json(savedNote)
    } catch (error) {
        next(error)
    }
})

notesRouter.put('/:id', userExtractor, (request, response, next) => {
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

notesRouter.delete('/:id', userExtractor, (request, response, next) => {
    const { id } = request.params

    Note.findByIdAndDelete(id).then(note => {
        // console.log(note) devolver objecto eliminado
        response.status(200).end()
    }).catch(error => {
        next(error)
    })
})

module.exports = notesRouter
