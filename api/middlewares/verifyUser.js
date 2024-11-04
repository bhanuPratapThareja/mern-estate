import jwt from 'jsonwebtoken'
import { errorHandler } from "../utils/error.js"

export const verifyUserToken = (req, res, next) => {
    const token = req.cookies.access_token
    if(!token) {
        return next(errorHandler(403, 'User unauthorized!'))
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return next(errorHandler(403, 'User token invalid!'))
            console.log('jwt user: ', user)
        req.user = user
        next()
    })
}