module.exports = (error, request, response, next) => {
    console.error(error)

    if (error.name === 'CastError') {
        response.status(400).json({
            error: 'El id utilizado no es el correcto.'
        })
    }
}
