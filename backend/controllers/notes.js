const notesRouter = require("express").Router()
const Note = require("../models/note")

notesRouter.get("/", async (req, res) => {
    // res.json(notes)
    const notes = await Note.find({})
    res.json(notes)
})

notesRouter.get("/:id", async (req, res, next) => {
    const note = await Note.findById(req.params.id)
    if (note) {
        res.json(note)
    } else {
        res.status(404).end()
    }
})

notesRouter.post("/", async (req, res, next) => {
    const body = req.body

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })

    try {
        const item = await note.save()
        res.status(201).json(item)
    } catch (error) {
        next(error)
    }
})

// Route handler for removing a note
notesRouter.delete("/:id", (req, res, next) => {
    const { id } = req.params
    Note.findByIdAndRemove(id)
        .then((result) => {
            res.status(204).end()
        })
        .catch((error) => next(error))
})

notesRouter.put("/:id", (req, res, next) => {
    const { content, important } = req.body

    const note = {
        content,
        important,
    }

    Note.findByIdAndUpdate(req.params.id, note, {
        new: true,
        runValidators: true,
        context: "query",
    })
        .then((updatedNote) => {
            res.json(updatedNote)
        })
        .catch((error) => next(error))
})

module.exports = notesRouter
