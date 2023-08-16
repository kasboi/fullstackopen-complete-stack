import { useState, useEffect, FormEvent, ChangeEvent } from "react"
import { getAll, create, update, deleteData } from "./services"
import axios from "axios"
import Note from "./components/Note"

interface notes {
    content: string
    important: boolean
    id: number
}

const App = () => {
    const [notes, setNotes] = useState<notes[]>([])
    const [newNote, setNewNote] = useState("")
    const [showAll, setShowAll] = useState(false)

    useEffect(() => {
        console.log("effect")
        getAll().then((notes) => {
            setNotes(notes)
        })
    }, [])

    console.log("render", notes.length, "notes")

    const addNote = async (event: FormEvent) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            important: Math.random() > 0.5,
            id: notes.length + 1,
        }

        const note = await create(noteObject)
        setNotes(notes.concat(note))
        setNewNote("")
    }

    const handleNoteChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewNote(event.target.value)
    }

    const notesToShow = showAll ? notes : notes.filter((note) => note.important)

    const toggleImportance = (id: number) => {
        const note = notes.find((n) => n.id === id)
        if (note) {
            const changedNote = { ...note, important: !note.important }

            update(id, changedNote)
                .then((newNote) => {
                    setNotes(
                        notes.map((note) => (note.id !== id ? note : newNote))
                    )
                })
                .catch(() => {
                    alert(
                        `Failed - Note with id ${id} has already been deleted`
                    )
                    setNotes(notes.filter((item) => item.id !== id))
                })
        }
    }

    const removeNote = (id: number) => {
        const note = notes.find((item) => item.id === id)
        if (note && confirm("Do you really wanna delete this note?")) {
            deleteData(id).then(() => {
                setNotes(notes.filter((item) => item.id !== id))
            }).catch(() => {
                alert(
                    `Failed - Note with id ${id} has already been deleted`
                )
                setNotes(notes.filter((item) => item.id !== id))
            })
        }
    }

    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? "important" : "all"}
                </button>
            </div>
            <ul>
                <ul>
                    {notesToShow.map((note) => (
                        <Note
                            key={note.id}
                            note={note}
                            toggleImportance={() => toggleImportance(note.id)}
                            removeNote={() => removeNote(note.id)}
                        />
                    ))}
                </ul>
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type="submit" className="glass">
                    save
                </button>
            </form>
        </div>
    )
}

export default App
