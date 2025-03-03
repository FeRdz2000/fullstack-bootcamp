import { useState, useEffect } from 'react'
import { Note } from './Note.jsx'
import { create as createNote, getAll as getAllNotes } from './services/notes/notes.js'

function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)

    getAllNotes().then(notes => {
      setNotes(notes)
      setLoading(false)
    })
  }, [])

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const noteToAddToState = {
      title: newNote,
      body: newNote,
      userId: 1
    }

    setError('')

    createNote(noteToAddToState).then(newNote => {
      setNotes(prevNotes => prevNotes.concat(newNote))
      setNewNote('')
    }).catch(error => {
      setError('Error')
      console.log(error)
    })
  }

  return (
    <div>
      <h1>Notes</h1>
      {
        loading ? 'Cargando...' : ''
      }
      <ol>
        {notes.map(note => (
          <Note key={note.id} {...note} />
        ))}
      </ol>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={handleChange} value={newNote} />
          <button>Crear nota</button>
        </form>
        {loading ? <span style={{ color: 'red' }}>{error}</span> : ''}
      </div>
    </div>
  )
}

export default App
