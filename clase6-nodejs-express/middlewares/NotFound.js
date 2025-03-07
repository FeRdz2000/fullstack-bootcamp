module.exports = (request, response, next) => {
    response.status(404).json({
        error: 'Página no encontrada.'
    })
}
