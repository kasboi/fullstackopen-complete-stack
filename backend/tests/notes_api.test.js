const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const helper = require("./test_helper")
const Note = require("../models/note")

beforeEach(async () => {
    await Note.deleteMany({})
    console.log("cleared");

    const noteObjects = helper.initialNotes.map(note => new Note(note))

    const promiseArr = noteObjects.map(note => note.save())

    await Promise.all(promiseArr)
}, 100000)

test("return all notes", async () => {
    const response = await api.get("/api/notes")

    expect(response.body).toHaveLength(helper.initialNotes.length)
})

test("check for a specific note", async () => {
    const response = await api.get("/api/notes")

    const contents = response.body.map((item) => item.content)

    expect(contents).toContain("Browser can execute only JavaScript")
})

test("save note and verify that it was successful", async () => {
    const noteItem = {
        content: "Bowser is a mario character",
        important: true,
    }
    await api
        .post("/api/notes")
        .send(noteItem)
        .expect(201)
        .expect("Content-Type", /application\/json/)

    const response = await helper.notesInDb()
    const contents = response.map((item) => item.content)

    expect(contents).toContain("Bowser is a mario character")
})

test("note without content is not added", async () => {
    const newNote = {
        important: true,
    }

    await api.post("/api/notes").send(newNote).expect(400)

    const response = await helper.notesInDb()
    expect(response).toHaveLength(helper.initialNotes.length)
})

afterAll(async () => {
    await mongoose.connection.close()
})
