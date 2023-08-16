interface notes {
    content: string
    important: boolean
    id: number
}

type NoteProps = {
    note: notes,
    toggleImportance: () => void,
    removeNote: () => void
}

const Note = ({ note, toggleImportance, removeNote }: NoteProps) => {
  const label = note.important ? 'make not important' : 'make important'
    return (
        <>
            <li>{note.content}</li>
            <button onClick={toggleImportance}>{label}</button>
            <button onClick={removeNote}>Delete</button>
        </>
    )
}

export default Note
