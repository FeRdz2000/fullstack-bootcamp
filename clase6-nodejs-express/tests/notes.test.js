const mongoose = require('mongoose')
const supertest = require('supertest')
const { app, server } = require('../index')
const Note = require('../models/Note')

const api = supertest(app)

const initialNotes = [
    {
        content: 'Esta es la primera nota.',
        important: true,
        date: new Date().toISOString()
    },
    {
        content: 'Esta es la segunda nota.',
        important: false,
        date: new Date().toISOString()
    }
]

// antes de ejecutar los tests
beforeEach(async () => {
    await Note.deleteMany({}) // eliminar todas las notas

    const note1 = new Note(initialNotes[0])
    await note1.save()

    const note2 = new Note(initialNotes[1])
    await note2.save()
})

test('notes are returned as json', async () => {
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
})

test('there are two notes', async () => {
    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength(initialNotes.length)
})

test('the first note is about primera nota', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(note => note.content)

    // expect(response.body[0].content).toBe('Esta es la primera nota.')

    expect(contents).toContain('Esta es la segunda nota.')
})

test('a valid note can be added', async () => {
    const newNote = {
        content: 'Nueva nota de test.',
        important: true
    }

    await api
        .post('/api/notes')
        .send(newNote)
        .expect(201)
        .expect('Content-Type', 'application/json; charset=utf-8')

    const response = await api.get('/api/notes')
    const contents = response.body.map(note => note.content)

    expect(contents).toContain(newNote.content)
})

test('note without content is not added', async () => {
    const newNote = {
        important: true
    }

    await api
        .post('/api/notes')
        .send(newNote)
        .expect(400)
        .expect('Content-Type', 'application/json; charset=utf-8')

    const response = await api.get('/api/notes')

    expect(response.body).toHaveLength(initialNotes.length)
})

afterAll(() => {
    mongoose.connection.close()
    server.close()
})
