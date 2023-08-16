const logger = require("./logger")

const reqLogger = (req, res, next) => {
    logger.info("Method:", req.method)
    logger.info("Path:  ", req.path)
    logger.info("Body:  ", req.body)
    logger.info("---")
    // Call the next middleware
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" })
}

const errorHandler = (error, req, res, next) => {
    logger.error(error.message)

    if (error.name === "CastError") {
        return res.status(400).send({ error: "malformmated id" })
    } else if (error.name === "ValidationError") {
        return res.status(400).send({ error: error.message })
    }

    next(error)
}

module.exports = {
    reqLogger,
    unknownEndpoint,
    errorHandler,
}
