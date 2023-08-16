//It's important that dotenv gets imported before the note model is imported. This ensures that the environment variables from the .env file are available globally before the code from the other modules is imported.
require("dotenv").config()

const PORT = process.env.PORT
const MONGODB_URI =
    process.env.NODE_ENV === "test"
        ? process.env.TEST_DB_URL
        : process.env.DB_URL

module.exports = {
    MONGODB_URI,
    PORT,
}
