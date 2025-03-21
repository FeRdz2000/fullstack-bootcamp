const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
    const authorization = request.get('authorization')
    let token = ''

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7)
    }

    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
        return response.status(401).json({
            error: 'El token no existe o es invalido.'
        })
    }

    const { id: userId } = decodedToken

    request.userId = userId

    next()
}
