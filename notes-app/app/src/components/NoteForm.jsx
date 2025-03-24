import { useRef, useState } from 'react'
import { Toggle } from './Toggle'

export const NoteForm = ({ addNote, handleLogout }) => {
    const [newNote, setNewNote] = useState('')
    const toggleRef = useRef()

    const handleSubmit = (event) => {
        event.preventDefault()

        const noteObject = {
            content: newNote,
            important: Math.random() > 0.5
        }

        addNote(noteObject)
        setNewNote('')

        toggleRef.current.toggleVisibility()
    }

    return (
        <Toggle ref={toggleRef} buttonLabel={'New note'}>
            <h1>Crear una nueva nota</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={(event) => setNewNote(event.target.value)}
                    value={newNote}
                    placeholder='Contenido de la nota' />
                <button>Crear nota</button>
            </form>
            <button onClick={handleLogout}>Logout</button>
        </Toggle>
    )
}