import { useState, useEffect } from 'react'
import { Note } from './components/Note.jsx'
import { LoginForm } from './components/LoginForm.jsx'
import { NoteForm } from './components/NoteForm.jsx'
import { create as createNote, getAll as getAllNotes, setToken } from './services/notes.js'
import { login } from './services/login.js'

const App = () => {
  const [notes, setNotes] = useState([])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  useEffect(() => {
    setLoading(true)

    getAllNotes().then(notes => {
      setNotes(notes)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteApUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  // Crear nota
  const addNote = (noteObject) => {
    createNote(noteObject)
      .then(newNote => {
        setNotes(prevNotes => prevNotes.concat(newNote))
      }).catch(error => {
        console.log(error)

        setError(error.response.data.error)
        // setError(`status: ${error.response.status} statusText: ${error.response.statusText}`)

        setTimeout(() => {
          setError('')
        }, 5000)
      })
  }

  // Login
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await login({ username, password })
      console.log(user)

      window.localStorage.setItem('loggedNoteApUser', JSON.stringify(user))

      setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error)

      setError(error.response.data.error)

      setTimeout(() => {
        setError('')
      }, 5000)
    }
  }

  // Logout
  const handleLogout = () => {
    setUser(null)
    setToken('')
    window.localStorage.removeItem('loggedNoteApUser')
  }

  return (
    <div>
      <h1>Notes</h1>
      {
        user
          ? <NoteForm
            addNote={addNote}
            handleLogout={handleLogout}
          />
          : <LoginForm
            username={username}
            password={password}
            handleUsernameChange={(event) => setUsername(event.target.value)}
            handlePasswordChange={(event) => setPassword(event.target.value)}
            handleSubmit={handleLogin}
          />
      }
      {loading ? 'Cargando...' : ''}
      <ol>
        {notes.map(note => (
          <Note key={note.id} {...note} />
        ))}
      </ol>
      <div>
        {error ? <span style={{ color: 'red' }}>{error}</span> : ''}
      </div>
    </div>
  )
}

export default App
