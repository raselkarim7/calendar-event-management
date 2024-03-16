const { CustomAPIError } = require("../errors/custom-error")

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({message: err.message})
    }
    return res.status(500).json({message: 'Bad News! Someting went very very wrong.'})
}

module.exports = errorHandlerMiddleware