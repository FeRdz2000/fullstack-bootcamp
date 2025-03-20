module.exports = (error, request, response, next) => {
    console.error(error)

    if (error.name === 'CastError') {
        response.status(400).json({
            error: 'El id utilizado no es el correcto.'
        })
    } else if (error.name === 'JsonWebTokenError') {
        response.status(401).json({
            error: 'El token es invalido.'
        })
    } else if (error.name === 'TokenExpirerError') {
        response.status(401).json({
            error: 'El token ha expirado.'
        })
    } else {
        response.status(500).end()
    }
}
