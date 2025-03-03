import { useState } from 'react'
import { Note } from './Note.jsx'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    /* const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    } */

    const noteToAddToState = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      /* date: new Date().toDateString(), */
      /* date: new Date().toLocaleDateString('es-VE', options), */
      important: Math.random() < 0.5
    }

    /* setNotes(notes.concat(noteToAddToState)) */

    setNotes([...notes, noteToAddToState])
    setNewNote('')
  }

  const handleShowAll = () => {
    setShowAll(() => !showAll)
  }

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={handleShowAll}>{showAll ? 'Show only important' : 'Show all'}</button>
      <ol>
        {notes.filter(note => {
          if (showAll === true) return true
          return note.important === true
        }).map(note => (
          <Note key={note.id} content={note.content} date={note.date} />
        ))}
      </ol>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={handleChange} value={newNote} />
          <button>Crear nota</button>
        </form>
      </div>
    </div>
  )
}

export default App
